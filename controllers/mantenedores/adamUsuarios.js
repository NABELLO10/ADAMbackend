import generarID from "../../helpers/generarID.js"
import emailRegistro from "../../helpers/emailRegistro.js"

import ADAM_usuarios from "../../models/ADAM_usuarios.js"
import ADAM_perfiles from "../../models/ADAM_perfiles.js"
import ADAM_usuarios_transportistas from "../../models/ADAM_usuarios_transportistas.js"

import Empresas from "../../models/Empresas.js" 



const registrar = async (req,res) => {          
    const {nombre,  email, id_perfil, est_activo, user_add, password, transportistasSeleccionados} = req.body

    try {
        const existeUsuario = await ADAM_usuarios.findOne({
            attributes: ['id', 'nom_usuario', 'password', 'email', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add'],
            raw : true,
            where:{
                'email' : email,               
            }
        })       
  
        if(existeUsuario){
            const error = new Error('Usuario ya existe en la plataforma')
            return res.status(400).json({msg : error.message})
        }
         
        const nuevoUsuario = await ADAM_usuarios.create({
            nom_usuario : nombre,
            password: password ? password : generarID(),
            email : email,        
            id_perfil: id_perfil,
            token: generarID(),
            est_activo : est_activo,
            user_add : user_add
        })      

        emailRegistro({
            nombre,
            email,
            token : nuevoUsuario.token,
        }) 

        transportistasSeleccionados.map( async (t) => {
            await ADAM_usuarios_transportistas.create({
                id_usuario : nuevoUsuario.id,
                id_transportista : t.value
            })      
        })
           
       
      //  res.json(nuevoUsuario)
       res.status(200).json({msg: "Usuario Registrado, se ha enviado un correo con instrucciones para el ingreso al sistema"})

    } catch (error) {
        console.log(error)            
    }      
}

const actualizarUsuario = async (req, res) =>{

    const {id} = req.params
    const {nombre, email, id_perfil, est_activo, transportistasSeleccionados} = req.body
   
  
        
        const usuarioExiste =  await ADAM_usuarios.findByPk(id, {attributes: ['id', 'nom_usuario', 'password', 'email', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add']})

        if(!usuarioExiste){
            const error = new Error("ID de usuario inexistente")
            return res.status(400).json({msg: error.message})
        }


        if(usuarioExiste.email != email){
            const existeUsuario1 = await ADAM_usuarios.findOne({
                attributes: ['id', 'nom_usuario', 'password', 'email', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add'],
                raw : true,
                where:{
                    'email' : email,               
                }
            })
      
            if(existeUsuario1){
                const error = new Error('Correo ya existe en la plataforma')
                return res.status(400).json({msg : error.message})
            }
        }
              

        await ADAM_usuarios.update({
            nom_usuario : nombre,          
            email,
            id_perfil,
            est_activo
        },{
            where:{ 
                id : id
            }
        })

       
        if(transportistasSeleccionados){

            await ADAM_usuarios_transportistas.destroy({
                where:{
                    id_usuario : id
                }
            })                               
                  
               // Agregar las nuevas alertas
              for (const tra of transportistasSeleccionados) {
                if (tra.value) {           
                  await ADAM_usuarios_transportistas.create({
                    id_usuario : id,
                    id_transportista : tra.value
                })  

                }
              }              
        }            


        res.status(200).json({msg: "Usuario actualizado"})
        
    
}


const eliminarUsuario = async (req, res) =>{
    const {id} = req.params

    try {
        const usuarioExiste = await ADAM_usuarios.findByPk(id, {
          attributes: [
            "id",
            "nom_usuario",
            "password",
            "email",          
            "token",
            "confirmado",
            "id_perfil",
            "est_activo",
            "user_add",
            "fec_add",
          ],
        });

        if(!usuarioExiste){
            const error = new Error("ID de usuario inexistente")
            return res.status(400).json({msg: error.message})
        }

        await ADAM_usuarios.destroy({
            where:{
                id : id
            }
        })

    res.status(200).json({msg: "Usuario Eliminado"})
    } catch (error) {
        console.log(error)
    }       
}


//LLENAR GRILLAS  --------------------------------------------------------------------------------------------------------------------//

const listar_usuarios = async (req, res) => {
    try {         
        const ADAM_usuariosRegistrados = await ADAM_usuarios.findAll({
            attributes: ['id', 'nom_usuario', 'password', 'email', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add'],    
            order: [['id', 'desc']],
            include: [{ model: ADAM_perfiles }]
        })
       // console.log((ADAM_usuariosRegistrados))

        return res.status(200).json(ADAM_usuariosRegistrados)
        
    } catch (error) {
        console.log(error)
    }
}





//EXPORTAR --------------------------------------------------------------------------------------------------------------------//
export {
    registrar,
    listar_usuarios,
    actualizarUsuario,
    eliminarUsuario,


}