import HOWEN_alertas from '../models/HOWEN_alertas.js'
import HOWEN_evidencias from '../models/HOWEN_evidencias.js'
import HOWEN_unidades from '../models/HOWEN_unidades.js'
import emailAlerta from "../helpers/emailAlerta.js";
import { Op } from "sequelize";


  const obtenerInfoUnidadHOWEN = async (req, res) => {
    try {
      const { deviceno } = req.params;
      const resultado = await HOWEN_unidades.findOne({
        where: {
          deviceno,
        },
      });  
  
      return res.status(200).json(resultado);
    } catch (error) {
      console.log(error);
    }
  };


  

  const obtenerAlertasHOWEN = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.params;
  
        // Formateo de fechas con horas completas
        const fechaInicioDiaCompleto = `${fechaInicio} 00:00:00`;
        const fechaFinDiaCompleto = `${fechaFin} 23:59:59`;

        // Consultar solo los campos necesarios para optimizar
        const resultado = await HOWEN_alertas.findAll({
            attributes: ['guid', 'deviceno', 'deviceName', 'alarmTypeValue','alarmGps', 'speed', 'reportTime', 'est_gestionada'], // Selecciona solo los campos necesarios
            where: {
                reportTime: {
                    [Op.between]: [fechaInicioDiaCompleto, fechaFinDiaCompleto],
                }
            },
            order: [['reportTime', 'DESC']], // Ordenar por reportTime descendente       
        });

        return res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al obtener las alertas' });
    }
};

  

  const obtenerAlertaUnidadHOWEN = async (req, res) => {
    try {
      const { deviceno, fechaInicio, fechaFin } = req.params;
      const resultado = await HOWEN_alertas.findAll({
        where: {
          deviceno,
          reportTime: {
            [Op.between]: [fechaInicio, fechaFin],
            }
        },
      });  
  
      return res.status(200).json(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerEvidenciasHOWEN = async (req, res) => {
    try {
      const {fechaInicio, fechaFin } = req.params;
      const resultado = await HOWEN_evidencias.findAll({
        where :{                
          reportTime: {
          [Op.between]: [fechaInicio, fechaFin],
          } },
          order: [['reportTime', 'DESC']]    
      });  
  
      return res.status(200).json(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerEvidenciaUnidadHOWEN = async (req, res) => {
    try {
      const { alarmGuid  } = req.params;

      const resultado = await HOWEN_evidencias.findAll({ 
        where: {
           alarmGuid           
        },
      });  
  
      return res.status(200).json(resultado);
    } catch (error) {
      console.log(error);
    }
  };


  const enviarCorreoAlertaHOWEN = async (req, res) => {
    try {
      const {contacto, alerta, detalle } = req.body;
    
      emailAlerta(contacto, alerta, detalle)
     
      return res.status(200).json({ msg: "Correo Enviado" });

    } catch (error) {
      console.log(error);
    }
  };

  

  
export {
    obtenerInfoUnidadHOWEN,
    obtenerAlertasHOWEN,
    obtenerAlertaUnidadHOWEN,
    obtenerEvidenciasHOWEN,
    obtenerEvidenciaUnidadHOWEN,
    enviarCorreoAlertaHOWEN
};
