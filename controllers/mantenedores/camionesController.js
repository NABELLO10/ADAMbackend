import Camiones from "../../models/Camiones.js"
import UnidadesWialon from "../../models/UnidadesWialon.js"

import Arrastres from "../../models/Arrastres.js"
import Transportistas from "../../models/Transportistas.js"
import EmpresasSistema from "../../models/EmpresasSistema.js"
import Conductores from "../../models/Conductores.js"


const registrarCamion = async (req, res) => {
    const {id_transportista, id_arrastre, nom_patente, fec_rev_tecnica, fec_per_circulacion, fec_seguro, est_activo, id_empresa, id_empresa_global, est_asignado, id_wialon, est_ox, id_conductor, est_temp}  = req.body

    try {
        const existe = await Camiones.findOne({
            attributes: ['id'],
            where:{
                nom_patente,
                id_empresa,
                id_transportista
            }
        }) 
    
        if(existe){
            const error = new Error("Camión ya existe")
            return res.status(400).json({msg : error.message})
        }
                         
        await Camiones.create({
            id_transportista,id_arrastre,nom_patente, fec_rev_tecnica, fec_per_circulacion, fec_seguro, est_activo , id_empresa, id_empresa_global, est_asignado, id_wialon, est_ox, id_conductor, est_temp
        })      
                
        res.status(200).json({msg: "Camión Registrado!"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor: " + error.message });
    } 
}


const editarCamion =  async (req, res) =>{
    const {id} = req.params
    const {id_transportista, id_arrastre, nom_patente, fec_rev_tecnica, fec_per_circulacion, fec_seguro, est_activo, lat_actual, lon_actual, id_empresa, id_wialon, est_ox, id_conductor , est_temp} = req.body

    try {     
        await Camiones.update({
            id_transportista,id_arrastre,nom_patente, fec_rev_tecnica, fec_per_circulacion, fec_seguro, est_activo, lat_actual, lon_actual, id_empresa, id_wialon, est_ox, id_conductor, est_temp
        },{
            where:{
                id : id
            }
        })    
               
         res.status(200).json({msg: "Camión Actualizado"})

    } catch (error) {
        console.log(error)            
    }      
}


const eliminarCamion = async (req, res) =>{
    const {id} = req.params

    try {        
        await Camiones.destroy({
            where:{
                id : id
            }
        })        
         res.status(200).json({msg: "Camión Eliminado"})
    } catch (error) {
        console.log(error)    
    }   
}


const obtenerCamiones = async (req, res) => {
    try {
        const { id_empresa, id_empresa_global } = req.params;
        const camiones = await Camiones.findAll({
            where: { id_empresa, id_empresa_global },
            include: [{model : EmpresasSistema}, {model : Transportistas}, {model : Arrastres}, {model : Conductores}]
        });
        return res.status(200).json(camiones);        
     } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "Error interno del servidor." });
     }   
}


const obtenerTodosCamiones = async (req, res) => {
    try {
        const { id_empresa_global } = req.params;
        const camiones = await Camiones.findAll({
            where: {id_empresa_global, est_activo : 1 },
            include: [{model : EmpresasSistema}, {model : Transportistas}, {model : Arrastres}]
        });
        return res.status(200).json(camiones);        
     } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "Error interno del servidor." });
     }   
}


const obtenerUnidadesWialon = async (req, res) => {
    try {      
        const camiones = await UnidadesWialon.findAll({});
        return res.status(200).json(camiones);        
     } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "Error interno del servidor." });
     }   
}


export{
    registrarCamion,
    editarCamion,
    eliminarCamion,
    obtenerCamiones,
    obtenerTodosCamiones,
    obtenerUnidadesWialon
}