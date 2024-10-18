import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {       
        listarUnidadesPY, datosOxPY, tControl
             } from "../controllers/procesos/wialonController.js";
import { 
        obtenerCiudades,
        actualizarWialon,
        obtenerTokenWialon,
        obtenerDatosOx,
        obtenerResumenGPS,
        obtenerResumenTablet,
        obtenerAlertas,
        obtenerDatosOxFechas,
        obtenerLog,
        obtenerLogConductor,
        logRevisado,
        revisarTodos,
        obtenerLogConductor2,
        inicioConductor,
        obtenerConductorActivo,
        enviarGPS,
        obtenerDatosTabletFechas,
        obtenerLogTablet
             } from "../controllers/generalController.js";


// ADAM ---------------------------------------------------------------
import {
  obtenerUsuarioTransportista,
  editarTipoAlarma,
  obtenerTransportistasActivos,
  registrarTrasnportistaAlerta,
  obtenerAlarmasTransportistas,
  obtenerAlarmasTransportista,
  eliminarTrasnportistaAlerta,
  obtenerInfoUnidad,
  obtenerInfoTransportista,
  enviarCorreoAlerta
} from "../controllers/ADAMgeneralController.js";

import {
  obtenerInfoUnidadHOWEN,
  obtenerAlertasHOWEN,
  obtenerAlertaUnidadHOWEN,
  obtenerEvidenciasHOWEN,
  obtenerEvidenciaUnidadHOWEN,
  enviarCorreoAlertaHOWEN
}
 from '../controllers/HOWENgeneralController.js'


const router = express.Router()

router.get('/obtener-ciudades', checkAuth, obtenerCiudades)
router.put('/token-wialon', checkAuth, actualizarWialon)
router.get('/token-wialon', checkAuth, obtenerTokenWialon)
router.get('/datos-ox/:patente', checkAuth, obtenerDatosOx)
router.get('/datos-ox-fechas/:patente/:desde/:hasta', checkAuth, obtenerDatosOxFechas)
router.get('/datos-tablet-fechas/:patente/:desde/:hasta', checkAuth, obtenerDatosTabletFechas)
router.get('/alertas/:patente', checkAuth, obtenerAlertas)
router.get('/datos-tablet', checkAuth, obtenerResumenTablet)
router.get('/resumenGPS', checkAuth, obtenerResumenGPS)
router.get('/obtenerLog/:patente/:desde/:hasta/:empresa/:transportista', checkAuth, obtenerLog)
router.get('/obtenerLogTablet/:patente/:desde/:hasta', checkAuth, obtenerLogTablet)
router.get('/obtenerLogConductor/:empresa/:transportista/:patente', checkAuth, obtenerLogConductor)

router.get('/listarUnidadesPY', checkAuth, listarUnidadesPY)
router.get('/datosOx', checkAuth, datosOxPY)
router.get('/tControl', checkAuth, tControl)

router.put('/revisarLog/:id', logRevisado)
router.put('/revisarTodos/:patente',  revisarTodos)
router.get('/obtenerLogConductor2/:patente',  obtenerLogConductor2)
router.post('/inicioConductor',  inicioConductor)
router.get('/obtenerConductorActivo/:patente/:rut',  obtenerConductorActivo)
router.post('/enviarGPS',  enviarGPS)


// ADAM -----------------------------------------------------------------------
router.get('/usuarios_transportistas/:id_usuario', checkAuth, obtenerUsuarioTransportista)
router.put('/editarTipoAlarma/:id', checkAuth, editarTipoAlarma)
router.get('/obtenerTransportistas', checkAuth, obtenerTransportistasActivos) 
router.get('/obtenerAlarmasTransportistas', checkAuth, obtenerAlarmasTransportistas) 
router.get('/obtenerAlarmasTransportista/:id', checkAuth, obtenerAlarmasTransportista) 
router.delete('/eliminarTrasnportistaAlerta/:id_transportista', checkAuth, eliminarTrasnportistaAlerta) 
router.post('/registrarTransportistaAlerta', checkAuth, registrarTrasnportistaAlerta)

router.get('/infoUnidad/:device_id', checkAuth, obtenerInfoUnidad) 
router.get('/infoTransportista/:id', checkAuth, obtenerInfoTransportista) 
router.post('/enviarCorreoAlerta', checkAuth, enviarCorreoAlerta) 



// HOWEN
router.get('/obtenerInfoUnidadHOWEN/:deviceno', checkAuth, obtenerInfoUnidadHOWEN) 
router.get('/obtenerAlertasHOWEN/:fechaInicio/:fechaFin', checkAuth, obtenerAlertasHOWEN) 
router.get('/obtenerAlertaUnidadHOWEN/:deviceno/:fechaInicio/:fechaFin', checkAuth, obtenerAlertaUnidadHOWEN) 
router.get('/obtenerEvidenciasHOWEN/:fechaInicio/:fechaFin', checkAuth, obtenerEvidenciasHOWEN) 
router.get('/obtenerEvidenciaUnidadHOWEN/:alarmGuid', checkAuth, obtenerEvidenciaUnidadHOWEN) 
router.post('/enviarCorreoAlertaHOWEN',checkAuth,  enviarCorreoAlertaHOWEN)



export default router