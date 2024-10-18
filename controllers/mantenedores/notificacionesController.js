import CorreosNotificacion from "../../models/CorreosNotificacion.js"
import EmpresasSistema from "../../models/EmpresasSistema.js"
import TipoNotificacion from "../../models/TipoNotificacion.js"
import Transportistas from "../../models/Transportistas.js"
import CatNotificacion from "../../models/CatNotificacion.js"


const registrarNotificacion = async (req, res) => {
    const {id_notificacion, id_transportista, correos, asunto, mensaje, est_activo, id_empresa, id_empresa_sistema} = req.body

    try {
      await CorreosNotificacion.create({
        id_notificacion,
        id_transportista,
        correos,
        asunto,
        mensaje,
        est_activo,
        id_empresa,
        id_empresa_sistema
      });

      res.status(200).json({ msg: "Notificación Registrada" });
    } catch (error) {
      console.log(error);
    }      
}


const editarNotificacion =  async (req, res) =>{
    const {id} = req.params
    const {id_notificacion, id_transportista, correos, asunto, mensaje, est_activo, id_empresa_sistema} = req.body

    try {         
                    
        await CorreosNotificacion.update({
            id_notificacion, id_transportista, correos, asunto, mensaje, est_activo, id_empresa_sistema},{
            where:{
                id : id
            }
        })     
        res.status(200).json({msg: "Notificación Actualizado"})   

    } catch (error) {
        console.log(error)            
    }      
}


const eliminarNotificacion = async (req, res) =>{
    const {id} = req.params

    try {        
        await CorreosNotificacion.destroy({
            where:{
                id : id
            }
        })        
         res.status(200).json({msg: "Notificación Eliminado"})

    } catch (error) {
        console.log(error)    
    }   
}


const obtenerNotificacion = async (req, res) => {
    try {
        const { id_empresa, id_transportista, id_empresa_sistema} = req.params;
        
        const camiones = await CorreosNotificacion.findAll({
            where: { id_empresa, id_transportista, id_empresa_sistema },
            include: [{model : TipoNotificacion , include: CatNotificacion}, {model : Transportistas}, {model : EmpresasSistema}]
        });
        return res.status(200).json(camiones);        
     } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "Error interno del servidor." });
     }   
}




export{
    registrarNotificacion,
    editarNotificacion,
    eliminarNotificacion,
    obtenerNotificacion
}