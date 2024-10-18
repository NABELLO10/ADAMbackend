import express from "express";
import checkAuth from "../middleware/authMiddleware.js";

import {       
    obtenerEstadoAlarma,
    obtenerTipoAlertas,
    obtenerAlertas,
    gestionarAlerta,
    gestionarAlertaHowen,
    obtenerUnidadesAdam,
    obtenerTransportista,
    detalleGestion,
    obtenerDetalleGestion
             } from "../controllers/mantenedores/adamGestionAlerta.js";

import { editarCamion } from "../controllers/mantenedores/adamUnidades.js";

import {  registrarPerfil,
    editarPerfil,
    eliminarPerfil,
    obtenerPerfiles,
    obtenerPerfilesActivos  } from "../controllers/mantenedores/adamPerfiles.js";


import {  registrar,
    listar_usuarios,
    actualizarUsuario,
    eliminarUsuario } from "../controllers/mantenedores/adamUsuarios.js";

    import {      registrarContactoTranportista,
        editarContactoTransportista,
        eliminarContactoTransportista,
        obtenerContactos,
        obtenerContacto } from "../controllers/mantenedores/adamContactoTransportista.js";


const router = express.Router()

router.get('/estadoAlarma',checkAuth,  obtenerEstadoAlarma)
router.get('/tipoAlertas',checkAuth,  obtenerTipoAlertas)
router.get('/unidadesAdam',checkAuth,  obtenerUnidadesAdam)
router.get('/transportista',checkAuth,  obtenerTransportista)
router.get('/alarmasCeiba/:desde/:hasta',checkAuth,  obtenerAlertas)
router.post('/gestionAlerta/:id',checkAuth,  gestionarAlerta)
router.post('/gestionarAlertaHowen/:guid',checkAuth,  gestionarAlertaHowen)
router.post('/detalleGestion/:id',checkAuth,  detalleGestion)
router.get('/obtenerDetalleGestion/:id',checkAuth,  obtenerDetalleGestion)
router.put('/editarUnidadAdam/:id',checkAuth,  editarCamion)
router.post('/registrarPerfil',checkAuth,  registrarPerfil)
router.put('/editarPerfil/:id',checkAuth,  editarPerfil)
router.delete('/eliminarPerfil/:id',checkAuth,  eliminarPerfil)
router.get('/perfiles',checkAuth,  obtenerPerfiles)
router.get('/perfilesActivos',checkAuth,  obtenerPerfilesActivos)

router.post('/usuarios',checkAuth,  registrar)
router.put('/usuarios/:id',checkAuth,  actualizarUsuario)
router.delete('/usuarios/:id',checkAuth,  eliminarUsuario)
router.get('/usuarios',checkAuth,  listar_usuarios)

router.post('/contactos',checkAuth,  registrarContactoTranportista)
router.put('/contactos/:id',checkAuth,  editarContactoTransportista)
router.delete('/contactos/:id',checkAuth,  eliminarContactoTransportista)
router.get('/contactos',checkAuth,  obtenerContactos)
router.get('/contacto/:id_transportista',checkAuth,  obtenerContacto)


export default router