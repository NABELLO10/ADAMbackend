import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import { 
    login, perfil, 
    confirmar, 
    olvidePassword, 
    comprobarToken, 
    nuevoPassword,  
    actualizarPassword
             } from "../controllers/loginController.js";


const router = express.Router()

//Area publicas no se requiere cuenta
router.get("/confirmar/:token", confirmar)
router.post("/login", login)
router.post("/olvide-password", olvidePassword)
router.get("/olvide-password/:token", comprobarToken)
router.post('/olvide-password/:token', nuevoPassword)

//Area privada
router.get('/perfil', checkAuth, perfil)
router.put('/actualizar-password', checkAuth, actualizarPassword)



export default router