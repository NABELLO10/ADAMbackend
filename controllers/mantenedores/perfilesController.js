import Perfiles from "../../models/Perfiles.js"


const registrarPerfil = async (req, res) => {
    const {nom_perfil, est_activo, id_empresa} = req.body

    try {  
        const perfilExiste = await Perfiles.findOne({
            attributes: ['id', 'nom_perfil', 'est_activo', 'id_empresa'],
            where:{
                nom_perfil : nom_perfil, id_empresa
            }
        }) 

        if(perfilExiste){
            const error = new Error("Perfil ya existe")
            return res.status(400).json({msg : error.message})
        }
                         
        await Perfiles.create({
            nom_perfil, est_activo, id_empresa
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
        const perfilExiste = await Perfiles.findByPk(id,{attributes: ['id', 'nom_perfil', 'est_activo', 'id_empresa']}) 

        if(!perfilExiste){
            const error = new Error("Perfil no existe")
            return res.status(400).json({msg : error.message})
        }      
                    
        await Perfiles.update({
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
        const perfilExiste = await Perfiles.findByPk(id, {
          attributes: ["id", "nom_perfil", "est_activo", "id_empresa"],
        });

        if(!perfilExiste){
            const error = new Error("Perfil no Existe")
            return res.status(404).json({msg: error.message})
        }
    
        await Perfiles.destroy({
            where:{
                id : id
            }
        })
        
        res.status(200).json({msg: "Perfil Eliminado"})

    } catch (error) {
        console.log(error)    
    }   
}

export{
    registrarPerfil,
    editarPerfil,
    eliminarPerfil
}