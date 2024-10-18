import Transportistas from "../../models/Transportistas.js"


const registrarTransportista = async (req, res) => {
    const {rut, nombre, ape_paterno, ape_materno, fono, email, est_activo, id_empresa, id_empresa_global} = req.body

    try {  
        const existe = await Transportistas.findOne({
            attributes: ['rut'],
            where:{
                rut, id_empresa
            }
        }) 

        if(existe){
            const error = new Error("Transportista ya existe")
            return res.status(400).json({msg : error.message})
        }
                         
        await Transportistas.create({
            rut, nombre, ape_paterno, ape_materno, fono, email, est_activo, id_empresa, id_empresa_global
        })      
                
        res.status(200).json({msg: "Transportista Registrado!"})

    } catch (error) {
        console.log(error)            
    }      
}


const editarTransportista =  async (req, res) =>{
    const {id} = req.params
    const {rut, nombre, ape_paterno, ape_materno, fono, email, est_activo, id_empresa } = req.body

    try {
     
        await Transportistas.update({
            rut, nombre, ape_paterno, ape_materno, fono, email, est_activo, id_empresa
        },{
            where:{
                id : id
            }
        })           
        res.status(200).json({msg: "Transportista Actualizado"})

    } catch (error) {
        console.log(error)            
    }      
}

const eliminarTransportista = async (req, res) =>{
    const {id} = req.params

    try {    
    
        await Transportistas.destroy({
            where:{
                id : id
            }
        })
        
        res.status(200).json({msg: "Transportista Eliminado"})

    } catch (error) {
        console.log(error)    
    }   
}


const obtenerTransportista = async (req, res) => {
    const {id_empresa, id_empresa_global} = req.params
    try {
        const tra = await Transportistas.findAll({
            attributes: ['id', 'rut', 'nombre','ape_paterno', 'ape_materno', 'fono', 'email', 'est_activo', 'id_empresa'],
            where:{
                id_empresa, id_empresa_global
            }
        })
        return res.status(200).json(tra)        
    } catch (error) {
        console.log(error)
    }
}

const obtenerTransportistasActivos = async (req, res) => {
    const {id_empresa} = req.params
    try {
        const tra = await Transportistas.findAll({
            attributes: ['id', 'rut', 'nombre','ape_paterno', 'ape_materno', 'fono', 'email', 'est_activo', 'id_empresa'],
            where:{
                id_empresa, est_activo : 1
            }
        })
        return res.status(200).json(tra)        
    } catch (error) {
        console.log(error)
    }
}




export{
    registrarTransportista,
    editarTransportista,
    eliminarTransportista,
    obtenerTransportista,
    obtenerTransportistasActivos
}