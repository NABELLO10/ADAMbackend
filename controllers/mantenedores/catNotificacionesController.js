import CatNotificacion from "../../models/CatNotificacion.js"


const registrarCat = async (req, res) => {
    const {nom_tipo, id_empresa} = req.body

    try {  
        const existe = await CatNotificacion.findOne({
            where:{
                nom_tipo,
                id_empresa
            }
        }) 

        if(existe){
            const error = new Error("Tipo ya existe")
            return res.status(400).json({msg : error.message})
        }
                         
        await CatNotificacion.create({
            nom_tipo,
            id_empresa
        })      
      
        res.status(200).json({msg: "Tipo Registrado"})

    } catch (error) {
        console.log(error)            
    }      
}


const editarCat =  async (req, res) =>{
    const {id} = req.params
    const {nom_tipo} = req.body

    try {
        const existe = await CatNotificacion.findByPk(id) 

        if(!existe){
            const error = new Error("Tipo no existe")
            return res.status(400).json({msg : error.message})
        }      
                    
        await CatNotificacion.update({
            nom_tipo
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

const eliminarCat = async (req, res) =>{
    const {id} = req.params

    try {        
        await CatNotificacion.destroy({
            where:{
                id : id
            }
        })        
         res.status(200).json({msg: "Notificación Eliminado"})

    } catch (error) {
        console.log(error)    
    }   
}

const obtenerCat = async (req, res) => {
    try {
        const {id_empresa} = req.params
        const tipos = await CatNotificacion.findAll(/* {
            where:{id_empresa}
        } */)
        return res.status(200).json(tipos)        
    } catch (error) {
        console.log(error)
    }
}


export{
    registrarCat,
    editarCat,
    obtenerCat,
    eliminarCat
}