import TipoNotificacion from "../../models/TipoNotificacion.js"
import CatNotificacion from "../../models/CatNotificacion.js"


const registrarTipoNotificacion = async (req, res) => {
    const {id_cat_not, val_min, val_max, obs, est_activo, id_empresa, id_empresa_sistema, id_transportista} = req.body

    try {  
        const existe = await TipoNotificacion.findOne({
            where:{
                id_cat_not,
                id_empresa,
                id_empresa_sistema,
                id_transportista
            }
        }) 

        if(existe){
            const error = new Error("Tipo ya existe")
            return res.status(400).json({msg : error.message})
        }
                         
        await TipoNotificacion.create({
            id_cat_not,
            val_min, val_max, obs,
            est_activo,
            id_empresa,
            id_empresa_sistema, id_transportista
        })      
      
        res.status(200).json({msg: "Tipo Registrado"})

    } catch (error) {
        console.log(error)            
    }      
}


const editarTipoNotificacion =  async (req, res) =>{
    const {id} = req.params
    const {id_cat_not, val_min, val_max, obs, est_activo, id_empresa_sistema, id_transportista} = req.body

    try {
        const existe = await TipoNotificacion.findByPk(id) 

        if(!existe){
            const error = new Error("Tipo no existe")
            return res.status(400).json({msg : error.message})
        }      
                    
        await TipoNotificacion.update({
            id_cat_not, val_min, val_max, obs, est_activo, id_empresa_sistema, id_transportista
        },{
            where:{
                id : id
            }
        })     
        res.status(200).json({msg: "Tipo Actualizado"})   

    } catch (error) {
        console.log(error)            
    }      
}


const eliminarTipoNotificacion = async (req, res) =>{
    const {id} = req.params

    try {        
        await TipoNotificacion.destroy({
            where:{
                id : id
            }
        })        
         res.status(200).json({msg: "Tipo Eliminado"})

    } catch (error) {
        console.log(error)    
    }   
}


const obtenerTipoNotificacion = async (req, res) => {
    try {
        const {id_transportista, id_empresa_sistema, id_empresa} = req.params
        
        const tipos = await TipoNotificacion.findAll({
            where:{id_transportista, id_empresa_sistema, id_empresa},
            include: [{model : CatNotificacion}]
        })


        return res.status(200).json(tipos)        
    } catch (error) {
        console.log(error)
    }
}


const obtenerTipoNotificacionActivo = async (req, res) => {
    try {
        const { id_empresa, id_transportista, id_empresa_sistema} = req.params
        const tipos = await TipoNotificacion.findAll({
            where:{id_empresa, est_activo : 1, id_transportista, id_empresa_sistema},
            include: [{model : CatNotificacion}]
        })
        return res.status(200).json(tipos)        
    } catch (error) {
        console.log(error);
    }
}



export{
    registrarTipoNotificacion,
    editarTipoNotificacion,
    eliminarTipoNotificacion,
    obtenerTipoNotificacion,
    obtenerTipoNotificacionActivo
}