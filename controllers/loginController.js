import bcrypt from "bcrypt"
import generarJWT from "../helpers/generarJWT.js"
import generarID from "../helpers/generarID.js"
import emailOlvidePassword from "../helpers/emailOlvidePassword.js"
import ADAM_usuarios from "../models/ADAM_usuarios.js"
import ADAM_perfiles from "../models/ADAM_perfiles.js"

const confirmar = async (req,res) => {
    try {
        const { token } = req.params

        const usuarioConfirmar = await ADAM_usuarios.findOne({ 
        where: {
            'token' : token
            }
        })
    
        if(!usuarioConfirmar){
            const error = new Error('Token no valido')
            return res.status(400).json({msg : error.message})
        }
    
        await ADAM_usuarios.update({
            token : null,
            confirmado : true
        },{
            where: { token : token }
        })   
        
        res.status(200).json({msg : "Cuenta Confirmada"})   

    } catch (error) {
        console.log(error)   
    }  
}


const login = async (req,res) => {
    try {

        const { email, password } = req.body

        const usuarioLogin = await ADAM_usuarios.findOne({
            attributes: ['id', 'nom_usuario', 'password', 'email', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add'],
            where : {
                "email" : email
            }
        })        
    
    
        if(!usuarioLogin){
            const error = new Error('Usuario no Existe')
            return res.status(400).json({msg : error.message})
        }
    
        if(!usuarioLogin.confirmado){
            const error = new Error('Cuenta no ha sido confirmada')
            return res.status(400).json({msg : error.message})
        }
    
        const coincidePassword  =  await bcrypt.compare(password, usuarioLogin.password)     
        if(!coincidePassword){
            const error = new Error('Contraseña Invalida')
            return res.status(400).json({msg : error.message})
        }

        const infoPerfil = await ADAM_perfiles.findOne({
            attributes: ['nom_perfil'],
            where : {
                "id" : usuarioLogin.id_perfil
            }
        })

        
        res.json({
            id : usuarioLogin.id,
            nom_usuario : usuarioLogin.nom_usuario,
            email : usuarioLogin.email,
            token: generarJWT(usuarioLogin.id),          
            id_rol : usuarioLogin.id_rol,
            est_activo : usuarioLogin.est_activo,
            id_perfil : usuarioLogin.id_perfil,
            nom_perfil : infoPerfil.nom_perfil
        })   
               

    } catch (error) {
        console.log(error)
    }   
}


const olvidePassword = async (req,res) => {
    const { email } = req.body

    const usuarioExiste = await ADAM_usuarios.findOne({
        attributes: ['id', 'nom_usuario', 'password', 'email', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add'],
        where : {
            "email" : email
        }
    })

    if(!usuarioExiste){
        const error = new Error('Usuario no Existe')
        return res.status(400).json({msg : error.message})
    }


    try {

       await ADAM_usuarios.update({
            token : generarID()
        },{
            where:{ email : email }
        })
        
        const usuarioActualizado = await ADAM_usuarios.findOne({
            attributes: ['id', 'nom_usuario', 'password', 'email', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add'],
            where : {
                "email" : email
            }
        })

        emailOlvidePassword({
            email,
            nombre : usuarioActualizado.nom_usuario,
            token : usuarioActualizado.token
        })
         

        res.status(200).json({msg: "Hemos enviado un email con instrucciones para recuperar tu contraseña"})

    } catch (error) {
        console.log(error)
    }
}


const comprobarToken = async (req,res) => {    
    const {token} = req.params
    try {
        const usuarioExiste = await ADAM_usuarios.findOne({
            attributes: ['id', 'nom_usuario', 'password', 'email', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add'],
            where:{
                token : token
            }
        })

        if(!usuarioExiste){
            const error = new Error("Token no Valido")
            return res.status(400).json({msg : error.message})
        }

        res.json({msg: "Token Valido"})    

    } catch (error) {
        console.log(error)
    }        
}


const perfil = (req,res) => {
    const {usuario} = req
    res.json(usuario)   
}


const nuevoPassword = async (req, res) =>{

    const {token} = req.params // URL
    const {password} = req.body //Lo que viene desde un formulario

    const usuarioExiste = await ADAM_usuarios.findOne({
        attributes: ['id', 'nom_usuario', 'password', 'email', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add'],
        where:{
            token : token
        }
    })

    if (!usuarioExiste){
        const error = new Error("Token no Valido")
        return res.status(400).json({ msg : error.message})
    }

    try {       
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)      
       
        await ADAM_usuarios.update({
            token : null,
            password : hash,
            confirmado : true
        },{
            where:{ id : usuarioExiste.id }
        })

        res.json({msg : "Password Modificado!"})


    } catch (error) {
        console.log(error)
    }
}


const actualizarPassword = async (req,res) => {
   const {id, password} = req.usuario
   const {passwordActual, passwordNuevo2} = req.body

    //comprobar que usuario exista
    const usuario = await ADAM_usuarios.findByPk(id, {attributes: ['id', 'nom_usuario', 'password', 'email', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add']})

    try {
        if(!usuario){
            const error = new Error('Hubo un error')
            return res.status(400).json({msg : error.message})        
        }     
        console.log(password, passwordActual)
            
         if(await bcrypt.compare(passwordActual, password)){

            const salt = await bcrypt.genSalt(10)
            const passHash = await bcrypt.hash(passwordNuevo2, salt)
            

            await ADAM_usuarios.update({
                password : passHash          
            },{
                where:{ id : usuario.id }
            })
 
            res.json({msg : "Password Modificado!"})

        }else{
            const error = new Error('Password actual es incorrecto')
            return res.status(400).json({msg : error.message}) 
        } 
      } catch (error) {
         console.log(error)
 }    
}


export {
    login, perfil, confirmar, olvidePassword, comprobarToken, nuevoPassword, actualizarPassword
}
