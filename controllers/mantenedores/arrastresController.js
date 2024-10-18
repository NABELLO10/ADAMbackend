import Arrastres from "../../models/Arrastres.js"

import Transportistas from "../../models/Transportistas.js"
import EmpresasSistema from "../../models/EmpresasSistema.js"


const registrarArrastres = async (req, res) => {
    const {id_transportista, nom_patente, fec_rev_tecnica, fec_per_circulacion, fec_seguro, est_activo, id_empresa, id_empresa_global, est_asignado  }  = req.body

     try { 
        const existe = await Arrastres.findOne({
            where: { nom_patente, id_empresa, id_transportista, id_empresa_global }
          });
      
          console.log(existe)
          if (existe) {
            console.log("error")
            return res.status(400).json({ msg: "Arrastre ya existe" });
          }

        await Arrastres.create({
            id_transportista,nom_patente, fec_rev_tecnica, fec_per_circulacion, fec_seguro, est_activo , id_empresa, id_empresa_global, est_asignado
        })      
                
        res.status(200).json({msg: "Arrastre Registrado!"})

     } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor: " + error.message });
    }  
}


const editarArrastre =  async (req, res) =>{
    const {id} = req.params
    const {id_transportista,nom_patente, fec_rev_tecnica, fec_per_circulacion, fec_seguro, est_activo, lat_actual, lon_actual, id_empresa} = req.body

    try {
     
        await Arrastres.update({
            id_transportista,nom_patente, fec_rev_tecnica, fec_per_circulacion, fec_seguro, est_activo, lat_actual, lon_actual, id_empresa
        },{
            where:{
                id : id
            }
        })    
               
         res.status(200).json({msg: "Arrastre Actualizado"})

    } catch (error) {
        console.log(error)            
    }      
}

const asignarArrastre =  async (req, res) =>{
    const {id} = req.params
    const {est_asignado} = req.body

    try {
     
        await Arrastres.update({
            est_asignado
        },{
            where:{
                id : id
            }
        })    
               
         res.status(200).json({msg: "Arrastre Actualizado"})

    } catch (error) {
        console.log(error)            
    }      
}


const eliminarArrastre = async (req, res) =>{
    const {id} = req.params

    try {    
    
        await Arrastres.destroy({
            where:{
                id : id
            }
        })
        
         res.status(200).json({msg: "Arrastre Eliminado"})

    } catch (error) {
        console.log(error)    
    }   
}


const obtenerArrastres = async (req, res) => {
    try {
        const { id_empresa, id_empresa_global } = req.params;
        const arrastres = await Arrastres.findAll({
            where: { id_empresa, id_empresa_global },
            include: [{model : EmpresasSistema}, {model : Transportistas}]
        });
        return res.status(200).json(arrastres);        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }   
}

const obtenerTodosArrastres = async (req, res) => {
    try {
        const {id_empresa } = req.params;
        const arrastres = await Arrastres.findAll({
            where: {id_empresa, est_activo : 1 },
            include: [{model : EmpresasSistema}, {model : Transportistas}]
        });
        return res.status(200).json(arrastres);        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }   
}


export{
    registrarArrastres,
    editarArrastre,
    eliminarArrastre,
    obtenerArrastres,
    obtenerTodosArrastres
}