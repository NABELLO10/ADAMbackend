import generarID from "../../helpers/generarID.js"
import emailRegistro from "../../helpers/emailRegistro.js"

import Usuarios from "../../models/Usuarios.js"
import Perfiles from "../../models/Perfiles.js"
import Empresas from "../../models/Empresas.js" 
import EmpresasSistema from "../../models/EmpresasSistema.js"
import Ciudades from "../../models/Ciudades.js"
import ADAM_usuarios_transportistas from "../../models/ADAM_usuarios_transportistas.js"


const registrar = async (req,res) => {          
    const {nombre, id_empresa, email, id_perfil, est_activo, user_add, password} = req.body

    try {
        const existeUsuario = await Usuarios.findOne({
            attributes: ['id', 'nom_usuario', 'password', 'email', 'id_empresa', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add'],
            raw : true,
            where:{
                'email' : email,               
            }
        })       
  
        if(existeUsuario){
            const error = new Error('Usuario ya existe en la plataforma')
            return res.status(400).json({msg : error.message})
        }
         
        const nuevoUsuario = await Usuarios.create({
            nom_usuario : nombre,
            password: password ? password : generarID(),
            email : email,
            id_empresa: id_empresa,
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
       
      //  res.json(nuevoUsuario)
       res.status(200).json({msg: "Usuario Registrado, se ha enviado un correo con instrucciones para el ingreso al sistema"})

    } catch (error) {
        console.log(error)            
    }      
}

const actualizarUsuario = async (req, res) =>{

    const {id} = req.params
    const {nombre, id_empresa, email, id_perfil, est_activo } = req.body
   
    try {
        
        const usuarioExiste =  await Usuarios.findByPk(id, {attributes: ['id', 'nom_usuario', 'password', 'email', 'id_empresa', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add']})

        if(!usuarioExiste){
            const error = new Error("ID de usuario inexistente")
            return res.status(400).json({msg: error.message})
        }


        if(usuarioExiste.email != email){
            const existeUsuario1 = await Usuarios.findOne({
                attributes: ['id', 'nom_usuario', 'password', 'email', 'id_empresa', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add'],
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
              

        await Usuarios.update({
            nom_usuario : nombre,
            id_empresa,
            email,
            id_perfil,
            est_activo
        },{
            where:{ 
                id : id
            }
        })


        res.status(200).json({msg: "Usuario actualizado"})
        
    } catch (error) {
        console.log(error)
    }   
}


const eliminarUsuario = async (req, res) =>{
    const {id} = req.params

    try {
        const usuarioExiste = await Usuarios.findByPk(id, {
          attributes: [
            "id",
            "nom_usuario",
            "password",
            "email",
            "id_empresa",
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

        await Usuarios.destroy({
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

const listarUsuarios = async (req, res) => {
    try {     
        const {id_empresa} = req.params
        const usuariosRegistrados = await Usuarios.findAll({
            attributes: ['id', 'nom_usuario', 'password', 'email', 'id_empresa', 'token', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add'],
            where:{id_empresa},
            order: [['id', 'desc']],
            include: [{ model: Perfiles }, {model: Empresas}]
        })
       // console.log((usuariosRegistrados))

        return res.status(200).json(usuariosRegistrados)
        
    } catch (error) {
        console.log(error)
    }
}


//LLENAR SELECTS --------------------------------------------------------------------------------------------------------------------//
const obtenerPerfiles = async (req, res) => {
    try {
        const {id_empresa} = req.params
        const perfiles = await Perfiles.findAll({
            attributes: ['id', 'nom_perfil', 'est_activo', 'id_empresa'],
            where:{id_empresa}})
    
        return res.status(200).json(perfiles)        
    } catch (error) {
        console.log(error)
    }
}
const obtenerPerfilesActivos = async (req, res) => {
    try {
        const {id_empresa} = req.params
        const perfiles = await Perfiles.findAll({
            attributes: ['id', 'nom_perfil', 'est_activo', 'id_empresa'],
            where:{id_empresa, est_activo : 1}})
        return res.status(200).json(perfiles)        
    } catch (error) {
        console.log(error)
    }
}

const obtenerEmpresasPorEmpresa = async (req, res) => {
    try {
        const {id_empresa} = req.params
        const empresas = await EmpresasSistema.findAll({
            attributes: ['id', 'rut_empresa', 'nom_empresa', 'cod_ciudad', 'direccion', 'est_activo', 'id_empresa'],
            where:{id_empresa}})
        return res.status(200).json(empresas)        
    } catch (error) {
        console.log(error)
    }
}

const obtenerEmpresas = async (req, res) => {
    try {
        const empresas = await Empresas.findAll({
            attributes: ['id', 'rut_empresa', 'nom_empresa','est_activo'],
        })
        return res.status(200).json(empresas)        
    } catch (error) {
        console.log(error)
    }
}


const obtenerEmpresasSistema = async (req, res) => {
  try {
    const empresas = await EmpresasSistema.findAll({
      attributes: [
        "id",
        "rut_empresa",
        "nom_empresa",
        "cod_ciudad",
        "direccion",
        "est_activo",
        "id_empresa",
      ],
      include: [{ model: Ciudades }],
    });
    return res.status(200).json(empresas);
  } catch (error) {
    console.log(error);
  }
};



//EXPORTAR --------------------------------------------------------------------------------------------------------------------//
export {
    registrar,
    listarUsuarios,
    actualizarUsuario,
    obtenerPerfiles,
    obtenerPerfilesActivos,
    obtenerEmpresas,
    eliminarUsuario,
    obtenerEmpresasSistema,
    obtenerEmpresasPorEmpresa
}