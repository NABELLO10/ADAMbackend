import ADAM_contacto_transportista from "../../models/ADAM_contacto_transportista.js"


const registrarContactoTranportista = async (req, res) => {
    const {id_transportista, nom_contacto, fono, mail} = req.body

    try {                                     
        await ADAM_contacto_transportista.create({
            id_transportista, nom_contacto, fono, mail
        })      
                
        res.status(200).json({msg: "Contactos Registrados"})

    } catch (error) {
        console.log(error)            
    }      
}


const editarContactoTransportista =  async (req, res) =>{
    const {id} = req.params
    const { nom_contacto, fono, mail} = req.body

    try {    
                    
        await ADAM_contacto_transportista.update({
             nom_contacto, fono, mail
        },{
            where:{
                id : id
            }
        })           
        res.status(200).json({msg: "Perfil Actualizado"})


    } catch (error) {
        console.log(error)            
    }      
}

const eliminarContactoTransportista = async (req, res) =>{
    const {id} = req.params

    try {        
        await ADAM_contacto_transportista.destroy({
            where:{
                id : id
            }
        })
        
        res.status(200).json({msg: "Contacto Eliminado"})

    } catch (error) {
        console.log(error)    
    }   
}

const obtenerContactos = async (req, res) => {
    try {   
        const contactos = await ADAM_contacto_transportista.findAll({})            
                return res.status(200).json(contactos)        
    } catch (error) {
        console.log(error)
    }
}

const obtenerContacto = async (req, res) => {
    try {   
        const {id_transportista} = req.params
        const contactos = await ADAM_contacto_transportista.findAll({where:{id_transportista}})         
        return res.status(200).json(contactos)        
    } catch (error) {
        console.log(error)
    }
}


export{
    registrarContactoTranportista,
    editarContactoTransportista,
    eliminarContactoTransportista,
    obtenerContactos,
    obtenerContacto
}