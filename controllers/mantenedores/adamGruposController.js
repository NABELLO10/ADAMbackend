import ADAM_grupos from "../../models/ADAM_grupos.js"


const registrarGrupo = async (req, res) => {
    const {nom_grupo, contacto} = req.body

    try {  
        const existe = await ADAM_grupos.findOne({
            where:{
                nom_grupo
                }
        }) 

        if(existe){
            const error = new Error("Grupo ya existe")
            return res.status(400).json({msg : error.message})
        }
                         
        await ADAM_grupos.create({
            nom_grupo,
            contacto
        })      
      
        res.status(200).json({msg: "Grupo Registrado"})

    } catch (error) {
        console.log(error)            
    }      
}


const editarGrupo =  async (req, res) =>{
    const {id} = req.params
    const {nom_grupo, contacto} = req.body

    try {
        const existe = await ADAM_grupos.findByPk(id) 

        if(!existe){
            const error = new Error("Grupo no existe")
            return res.status(400).json({msg : error.message})
        }      
                    
        await ADAM_grupos.update({
            nom_grupo, contacto
        },{
            where:{
                id : id
            }
        })     
        res.status(200).json({msg: "Grupo Actualizado"})   

    } catch (error) {
        console.log(error)            
    }      
}

const eliminarGrupo = async (req, res) =>{
    const {id} = req.params

    try {        
        await ADAM_grupos.destroy({
            where:{
                id : id
            }
        })        
         res.status(200).json({msg: "Grupo Eliminado"})

    } catch (error) {
        console.log(error)   
        res.status(400).json({msg: error}) 
    }   
}

const obtenerGrupos = async (req, res) => {
    try {       
        const Grupos = await ADAM_grupos.findAll(/* {
            where:{id_empresa}
        } */)
        return res.status(200).json(Grupos)        
    } catch (error) {
        console.log(error)
    }
}


export{
    registrarGrupo,
    editarGrupo,
    obtenerGrupos,
    eliminarGrupo
}