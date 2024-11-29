import HOWEN_alertas from '../models/HOWEN_alertas.js'
import HOWEN_evidencias from '../models/HOWEN_evidencias.js'
import HOWEN_unidades from '../models/HOWEN_unidades.js'
import emailAlerta from "../helpers/emailAlerta.js";
import ADAM_alarma_transportista from "../models/ADAM_alarma_transportista.js"
import ADAM_usuarios_transportistas from "../models/ADAM_usuarios_transportistas.js"

import { Op } from "sequelize";



const obtenerUnidadesHowen = async (req, res) => {
  try {      
      const unidades = await HOWEN_unidades.findAll()
      
      return res.status(200).json(unidades)        
  } catch (error) {
      console.log(error)
  }
}

const editarCamionHowen = async (req, res) => {
    
  const {deviceno} = req.params;
  const {
      id_transportista,  fec_rev_tecnica, fec_per_circulacion,
      fec_seguro, est_activo
  } = req.body;


  try {
      await HOWEN_unidades.update({
          id_transportista, deviceno,  fec_rev_tecnica, fec_per_circulacion,
          fec_seguro, est_activo
      }, {
          where: {
            deviceno
          }
      });

      res.status(200).json({msg: "Camión actualizado"});
  } catch (error) {
      console.log(error);
      res.status(500).json({msg: "Error al actualizar el camión"});
  }
}


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

  

/*   const obtenerAlertasHOWEN = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.params;
  
        // Formateo de fechas con horas completas
        const fechaInicioDiaCompleto = `${fechaInicio} 00:00:00`;
        const fechaFinDiaCompleto = `${fechaFin} 23:59:59`;

        // Consultar solo los campos necesarios para optimizar
        const resultado = await HOWEN_alertas.findAll({
            attributes: ['guid', 'deviceno', 'deviceName', 'alarmTypeValue','alarmGps', 'speed', 'reportTime', 'estado'], // Selecciona solo los campos necesarios
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
 */


const obtenerAlertasHOWEN = async (req, res) => {
  try {
      const { fechaInicio, fechaFin } = req.params;
      const { id } = req.usuario; // Identificador del usuario para obtener transportistas relacionados

      // Formateo de fechas con horas completas
      const fechaInicioDiaCompleto = `${fechaInicio} 00:00:00`;
      const fechaFinDiaCompleto = `${fechaFin} 23:59:59`;

      // Obtener transportistas asociados al usuario
      const transportistasUsuario = await ADAM_usuarios_transportistas.findAll({
          where: {
              id_usuario: id,
          },
          attributes: ['id_transportista']
      });

      const transportistasUsuarioIds = transportistasUsuario.map(t => t.id_transportista);

      // Obtener transportistas relacionados con dispositivos de HOWEN
      const dispositivosTransportistas = await HOWEN_unidades.findAll({
          where: {
              id_transportista: {
                  [Op.in]: transportistasUsuarioIds
              }
          },
          attributes: ['deviceno', 'id_transportista']
      });

      // Crear un mapa para relacionar deviceno con transportista
      const devicenoTransportistaMap = {};
      dispositivosTransportistas.forEach(dispositivo => {
          devicenoTransportistaMap[dispositivo.deviceno] = dispositivo.id_transportista;
      });

      // Consultar las alarmas de HOWEN
      const resultado = await HOWEN_alertas.findAll({
          attributes: [
              'guid',
              'deviceno',
              'deviceName',
              'alarmTypeValue',
              'alarmGps',
              'speed',
              'reportTime',
              'estado'
          ],
          where: {
              reportTime: {
                  [Op.between]: [fechaInicioDiaCompleto, fechaFinDiaCompleto],
              }
          },
          order: [['reportTime', 'DESC']], // Ordenar por reportTime descendente       
      });

      // Agregar el transportista a cada alarma basada en el deviceno
      const resultadoConTransportista = resultado.map(alarma => {
          const idTransportista = devicenoTransportistaMap[alarma.deviceno] || null;
          return {
              ...alarma.toJSON(),
              id_transportista: idTransportista,
          };
      });

      return res.status(200).json(resultadoConTransportista);
  } catch (error) {
      console.error(error);
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
    enviarCorreoAlertaHOWEN,
    obtenerUnidadesHowen,
    editarCamionHowen
};
