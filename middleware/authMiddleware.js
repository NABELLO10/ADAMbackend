import jwt from "jsonwebtoken"
import ADAM_usuarios from "../models/ADAM_usuarios.js"

const checkAuth = async (req, res, next) => {    
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1] // la convierte en un arreglo por lo que necesitamos la posicion 1
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            // creando sesion con info del veterianrio
            req.usuario = await ADAM_usuarios.findByPk(decoded.id, {
                attributes: ['id', 'nom_usuario', 'email', 'password', 'confirmado', 'id_perfil', 'est_activo', 'user_add', 'fec_add'],
              });
                
            return next()      

        } catch (error) {
            const e = new Error('Token no valido')
            res.status(403).json({msg : e.message})
        }      
    }

    if (!token){
        const error = new Error('Token Inexistente')
        res.status(403).json({msg : error.message})
    }   

    //next()
}

export default checkAuth