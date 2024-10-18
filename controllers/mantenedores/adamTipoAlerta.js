import ADAM_perfiles from "../../models/ADAM_perfiles.js"


const registrarPerfil = async (req, res) => {
    const {nom_perfil, est_activo} = req.body

    try {  
        const perfilExiste = await ADAM_perfiles.findOne({
            attributes: ['id', 'nom_perfil'],
            where:{
                nom_perfil : nom_perfil
            }
        }) 

        if(perfilExiste){
            const error = new Error("Perfil ya existe")
            return res.status(400).json({msg : error.message})
        }
                         
        await ADAM_perfiles.create({
            nom_perfil, est_activo
        })      
                
        res.status(200).json({msg: "Perfil Registrado!"})

    } catch (error) {
        console.log(error)            
    }      
}


const editarPerfil =  async (req, res) =>{
    const {id} = req.params
    const {nom_perfil,  est_activo} = req.body

    try {
        const perfilExiste = await ADAM_perfiles.findByPk(id,{attributes: ['id', 'nom_perfil']}) 

        if(!perfilExiste){
            const error = new Error("Perfil no existe")
            return res.status(400).json({msg : error.message})
        }      
                    
        await ADAM_perfiles.update({
            nom_perfil, est_activo
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

const eliminarPerfil = async (req, res) =>{
    const {id} = req.params

    try {
        const perfilExiste = await ADAM_perfiles.findByPk(id, {
          attributes: ["id", "nom_perfil", "est_activo"],
        });

        if(!perfilExiste){
            const error = new Error("Perfil no Existe")
            return res.status(404).json({msg: error.message})
        }
    
        await ADAM_perfiles.destroy({
            where:{
                id : id
            }
        })
        
        res.status(200).json({msg: "Perfil Eliminado"})

    } catch (error) {
        console.log(error)    
    }   
}

const obtenerPerfiles = async (req, res) => {
    try {
        const {id_empresa} = req.params
        const perfiles = await ADAM_perfiles.findAll({
            attributes: ['id', 'nom_perfil', 'est_activo'],
            })
    
        return res.status(200).json(perfiles)        
    } catch (error) {
        console.log(error)
    }
}
const obtenerPerfilesActivos = async (req, res) => {
    try {
        const {id_empresa} = req.params
        const perfiles = await ADAM_perfiles.findAll({
            attributes: ['id', 'nom_perfil', 'est_activo'],
            where:{est_activo : 1}})
        return res.status(200).json(perfiles)        
    } catch (error) {
        console.log(error)
    }
}

export{
    registrarPerfil,
    editarPerfil,
    eliminarPerfil,
    obtenerPerfiles,
    obtenerPerfilesActivos
}