import express from "express";
import checkAuth from "../middleware/authMiddleware.js";

// USUARIOS ------------------------------------------------------------------------//
import { registrar, 
listarUsuarios, 
actualizarUsuario,
eliminarUsuario,
obtenerPerfiles,
obtenerPerfilesActivos,
obtenerEmpresas,
obtenerEmpresasSistema,
obtenerEmpresasPorEmpresa } from "../controllers/mantenedores/usuariosController.js";

// PERFiLES ------------------------------------------------------------------------//
import { 
registrarPerfil,
editarPerfil,
eliminarPerfil } from "../controllers/mantenedores/perfilesController.js";


// EMPRESAS GENERALES ------------------------------------------------------------------------//
import { 
registrarEmpresaGral,
editarEmpresaGral,
eliminarEmpresaGral } from "../controllers/mantenedores/empresasController.js";

// EMPRESAS ------------------------------------------------------------------------//
import { 
registrarEmpresa,
editarEmpresa,
eliminarEmpresa } from "../controllers/mantenedores/empresasSistemaController.js";

// TRANSPORTISTAS ------------------------------------------------------------------------//
import { 
registrarTransportista,
editarTransportista,
eliminarTransportista,
obtenerTransportista,
obtenerTransportistasActivos } from "../controllers/mantenedores/transportistaController.js";

// TRANSPORTISTAS ------------------------------------------------------------------------//
import { 
registrarConductor,
editarConductor,
eliminarConductor,
obtenerConductores } from "../controllers/mantenedores/conductoresController.js";

// ARRASTRES ------------------------------------------------------------------------//
import { 
registrarArrastres,
editarArrastre,
eliminarArrastre,
obtenerArrastres,
obtenerTodosArrastres } from "../controllers/mantenedores/arrastresController.js";

// CAMIONES ------------------------------------------------------------------------//
import { 
registrarCamion,
editarCamion,
eliminarCamion,
obtenerCamiones,
obtenerUnidadesWialon,
obtenerTodosCamiones } from "../controllers/mantenedores/camionesController.js";

// TIPO NOTIFICACION ------------------------------------------------------------------------//
import { 
    registrarTipoNotificacion,
    editarTipoNotificacion,
    eliminarTipoNotificacion,
    obtenerTipoNotificacion,
    obtenerTipoNotificacionActivo } from "../controllers/mantenedores/tipoNotificacionController.js";

// NOTIFICACION ------------------------------------------------------------------------//
import { 
    registrarNotificacion,
    editarNotificacion,
    eliminarNotificacion,
    obtenerNotificacion } from "../controllers/mantenedores/notificacionesController.js";

// CAT NOTIFICACION ------------------------------------------------------------------------//
import { 
    registrarCat,
    editarCat,
    eliminarCat,
    obtenerCat } from "../controllers/mantenedores/catNotificacionesController.js";

    
const router = express.Router()

// USUARIOS ------------------------------------------------------------------------//
router.post("/registrar", checkAuth, registrar)
router.put("/registrar/:id", checkAuth, actualizarUsuario)
router.delete("/registrar/:id", checkAuth, eliminarUsuario)
router.get("/obtener-usuarios/:id_empresa", checkAuth, listarUsuarios)
router.get('/obtener-perfil/:id_empresa', checkAuth, obtenerPerfiles) 
router.get('/obtener-perfil-activo/:id_empresa', checkAuth, obtenerPerfilesActivos) 
router.get('/obtener-empresas', checkAuth, obtenerEmpresas) 


// PERFLES ------------------------------------------------------------------------//
router.post("/perfil", checkAuth, registrarPerfil)
router.put("/perfil/:id", checkAuth, editarPerfil)
router.delete("/perfil/:id", checkAuth, eliminarPerfil)

// EMPRESAS GENERALES------------------------------------------------------------------------//
router.post("/empresasGral", checkAuth, registrarEmpresaGral)
router.put("/empresasGral/:id", checkAuth, editarEmpresaGral)
router.delete("/empresasGral/:id", checkAuth, eliminarEmpresaGral)

// EMPRESAS ------------------------------------------------------------------------//
router.post("/empresas", checkAuth, registrarEmpresa)
router.put("/empresas/:id", checkAuth, editarEmpresa)
router.delete("/empresas/:id", checkAuth, eliminarEmpresa)
router.get('/obtener-empresas-sistema', checkAuth, obtenerEmpresasSistema) 
router.get('/obtener-empresas-sistema/:id_empresa', checkAuth, obtenerEmpresasPorEmpresa) 

// TRANSPORTISTAS ------------------------------------------------------------------------//
router.post("/transportista", checkAuth, registrarTransportista)
router.put("/transportista/:id", checkAuth, editarTransportista)
router.delete("/transportista/:id", checkAuth, eliminarTransportista)
router.get('/obtener-transportistas/:id_empresa/:id_empresa_global', checkAuth, obtenerTransportista) 
router.get('/obtener-transportistas1/:id_empresa', checkAuth, obtenerTransportistasActivos) 

// CODUCTORES ------------------------------------------------------------------------//
router.post("/conductor", checkAuth, registrarConductor)
router.put("/conductor/:id", checkAuth, editarConductor)
router.delete("/conductor/:id", checkAuth, eliminarConductor)
router.get('/obtener-conductores/:id_empresa/:id_empresa_global', checkAuth, obtenerConductores) 


// ARRASTRES ------------------------------------------------------------------------//
router.post("/registrarArrastre", checkAuth, registrarArrastres)
router.put("/arrastre/:id", checkAuth, editarArrastre)
router.delete("/arrastre/:id", checkAuth, eliminarArrastre)
router.get('/obtener-arrastres/:id_empresa/:id_empresa_global', checkAuth, obtenerArrastres) 
router.get('/obtener-todosarrastres/:id_empresa', checkAuth, obtenerTodosArrastres) 

// CAMIONES ------------------------------------------------------------------------//
router.post("/camion", checkAuth, registrarCamion)
router.put("/camion/:id", checkAuth, editarCamion)
router.delete("/camion/:id", checkAuth, eliminarCamion)
router.get('/obtener-camiones/:id_empresa/:id_empresa_global', checkAuth, obtenerCamiones) 
router.get('/unidades-wialon', checkAuth, obtenerUnidadesWialon) 
router.get('/obtener-todoscamiones/:id_empresa/:id_empresa_global', checkAuth, obtenerTodosCamiones) 

// TIPO NOTIFICACION ------------------------------------------------------------------------//
router.post("/tipo-notificacion", checkAuth, registrarTipoNotificacion)
router.put("/tipo-notificacion/:id", checkAuth, editarTipoNotificacion)
router.delete("/tipo-notificacion/:id", checkAuth, eliminarTipoNotificacion)
router.get('/obtener-tipo-notificacion/:id_empresa_sistema/:id_transportista/:id_empresa', checkAuth, obtenerTipoNotificacion) 
router.get('/not-activas/:id_empresa/:id_transportista/:id_empresa_sistema', checkAuth, obtenerTipoNotificacionActivo) 

// NOTIFICACION ------------------------------------------------------------------------//
router.post("/notificacion", checkAuth, registrarNotificacion)
router.put("/notificacion/:id", checkAuth, editarNotificacion)
router.delete("/notificacion/:id", checkAuth, eliminarNotificacion)
router.get('/obtener-notificacion/:id_empresa/:id_transportista/:id_empresa_sistema', checkAuth, obtenerNotificacion) 

// CAT NOTIFICACION ------------------------------------------------------------------------//
router.post("/cat-not", checkAuth, registrarCat)
router.put("/cat-not/:id", checkAuth, editarCat)
router.delete("/cat-not/:id", checkAuth, eliminarCat)
router.get('/cat-not/:id_empresa', checkAuth, obtenerCat) 


export default router