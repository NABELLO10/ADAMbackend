import Empresas from "../../models/Empresas.js"


const registrarEmpresaGral = async (req,res) => {          
        const {rut_empresa, nom_empresa, est_activo} = req.body

        try {  
            const empresaExiste = await Empresas.findOne({
                attributes: ['id', 'rut_empresa', 'nom_empresa', 'est_activo'],
                where:{
                    rut_empresa : rut_empresa
                }
            }) 

            if(empresaExiste){
                const error = new Error("Empresa ya existe")
                return res.status(400).json({msg : error.message})
            }
                             
            await Empresas.create({
                rut_empresa, nom_empresa, est_activo
            })      
                      
            //res.json({nuevaEmpresa})
            res.status(200).json({msg: "Empresa Registrada!"})

        } catch (error) {
            console.log(error)            
        }      
}


const editarEmpresaGral = async (req,res) => {          
    const {id} = req.params
    const {rut_empresa, nom_empresa, est_activo} = req.body

    try {
        const empresaExiste = await Empresas.findOne({
            attributes: ['id', 'rut_empresa', 'nom_empresa', 'est_activo'],
            where:{
                id : id
            }
        }) 

        if(!empresaExiste){
            const error = new Error("Empresa no existe")
            return res.status(400).json({msg : error.message})
        }      
                    
       await Empresas.update({
            rut_empresa, nom_empresa, est_activo
        },{
            where:{
                id : id
            }
        }) 
        //res.json(empresaActualizada)         
        res.status(200).json({msg: "Empresa Actualizada"})
        //console.log(empresaActualizada)
    } catch (error) {
        console.log(error)            
    }      
}


const eliminarEmpresaGral = async (req, res) =>{
    const {id} = req.params

    try {             
        await Empresas.destroy({
            where:{
                id : id
            }
        })
        
        res.status(200).json({msg: "Empresa Eliminada"})

    } catch (error) {
        console.log(error)    
        res.status(400).json({msg: error})
    }   
}   



export{
    registrarEmpresaGral,
    editarEmpresaGral,
    eliminarEmpresaGral
}
