import EmpresasSistema from "../../models/EmpresasSistema.js"


const registrarEmpresa = async (req,res) => {          
        const {rut_empresa, nom_empresa, cod_ciudad, direccion, est_activo, id_empresa} = req.body

        try {  
            const empresaExiste = await EmpresasSistema.findOne({
                attributes: ['id', 'rut_empresa', 'nom_empresa', 'cod_ciudad', 'direccion', 'est_activo', 'id_empresa'],
                where:{
                    rut_empresa : rut_empresa
                }
            }) 

            if(empresaExiste){
                const error = new Error("Empresa ya existe")
                return res.status(400).json({msg : error.message})
            }
                             
            const nuevaEmpresa = await EmpresasSistema.create({
                rut_empresa, nom_empresa, cod_ciudad, direccion, est_activo, id_empresa
            })      
                      
            //res.json({nuevaEmpresa})
            res.status(200).json({msg: "Empresa Registrada!"})

        } catch (error) {
            console.log(error)            
        }      
}


const editarEmpresa = async (req,res) => {          
    const {id} = req.params
    const {rut_empresa, nom_empresa, cod_ciudad, direccion, est_activo} = req.body

    try {
        const empresaExiste = await EmpresasSistema.findOne({
            attributes: ['id', 'rut_empresa', 'nom_empresa', 'cod_ciudad', 'direccion', 'est_activo', 'id_empresa'],
            where:{
                id : id
            }
        }) 

        if(!empresaExiste){
            const error = new Error("Empresa no existe")
            return res.status(400).json({msg : error.message})
        }      
                    
       const empresaActualizada = await EmpresasSistema.update({
            rut_empresa, nom_empresa, cod_ciudad, direccion, est_activo
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


const eliminarEmpresa = async (req, res) =>{
    const {id} = req.params

    try {
        const empresaExiste = await EmpresasSistema.findByPk(id, {attributes: ['id', 'rut_empresa', 'nom_empresa', 'cod_ciudad', 'direccion', 'est_activo', 'id_empresa']})

        if(!empresaExiste){
            const error = new Error("Empresa no Existe")
            return res.status(404).json({msg: error.message})
        }
    
        await EmpresasSistema.destroy({
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
    registrarEmpresa,
    editarEmpresa,
    eliminarEmpresa
}
