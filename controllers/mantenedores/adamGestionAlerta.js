import ADAM_estados_evidencia from "../../models/ADAM_estados_evidencia.js"
import ADAM_tipo_alarma from "../../models/ADAM_tipo_alarma.js"
import ADAM_alarmas_ceiba from "../../models/ADAM_alarmas_ceiba.js"
import ADAM_unidades from "../../models/ADAM_unidades.js"
import Transportista from "../../models/Transportistas.js"
import ADAM_detalle_gestion from "../../models/ADAM_detalle_gestion.js"
import ADAM_alarma_transportista from "../../models/ADAM_alarma_transportista.js"
import ADAM_usuarios_transportistas from "../../models/ADAM_usuarios_transportistas.js"
import moment from 'moment-timezone';
import { Op, Sequelize, where } from 'sequelize'
import HOWEN_alertas from "../../models/HOWEN_alertas.js"


const obtenerEstadoAlarma = async (req, res) => {
  try {         
      const estados = await ADAM_estados_evidencia.findAll({              
          attributes: ['id', 'nombre_estado', 'id_transportista', 'color', 'nom_kpi'] 
      });
     
      return res.status(200).json(estados);
  } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error al obtener los estados' });
  }
}

const obtenerTipoAlertas = async (req, res) => {
    try {      
        const tipos = await ADAM_tipo_alarma.findAll({              
          attributes: ['id', 'id_tipo', 'nombre_tipo_alarma', 'est_activo'] 
      })
        return res.status(200).json(tipos)        
    } catch (error) {
        console.log(error)
    }
}

const obtenerUnidadesAdam = async (req, res) => {
    try {      
        const unidades = await ADAM_unidades.findAll(/* {
            where:{id_empresa}
        } */)

        
        return res.status(200).json(unidades)        
    } catch (error) {
        console.log(error)
    }
}

const obtenerTransportista = async (req, res) => {
    try {      
        const resultado = await Transportista.findAll(/* {
            where:{id_empresa}
        } */)
        return res.status(200).json(resultado)        
    } catch (error) {
        console.log(error)
    }
}

const formatDateString = (dateString) => {
    return moment.tz(dateString, 'America/Santiago').format('DD-MM-YYYY HH:mm:ss');
  };


  const obtenerAlertas = async (req, res) => {
    try {
      const { desde, hasta } = req.params;
      const { id } = req.usuario;
  
         let whereClause = {};
      if (desde && hasta) {
  

        whereClause.fec_alerta = {
          [Op.between]: [
            desde,
            hasta
          ]
        };
        
      }
  
      const transportistasUsuario = await ADAM_usuarios_transportistas.findAll({
        where: {
          id_usuario: id,
        },
        attributes: ['id_transportista']
      });
  
      const transportistasUsuarioIds = transportistasUsuario.map(alerta => alerta.id_transportista);
  
      const alarmasTransportistas = await ADAM_alarma_transportista.findAll({
        where: {
          id_transportista: {
            [Op.in]: transportistasUsuarioIds
          }
        },
        attributes: ['id_tipo_alarma']
      });
  
      const alarmasTransportistasIds = alarmasTransportistas.map(alarmas => alarmas.id_tipo_alarma);
  
      const alertasActivas = await ADAM_tipo_alarma.findAll({
        where: {
          est_activo: 1,
          id_tipo: {
            [Op.in]: alarmasTransportistasIds
          }
        },
        attributes: ['id_tipo']
      });
  
      const activeAlertIds = alertasActivas.map(alerta => alerta.id_tipo);
  
      const mov = await ADAM_alarmas_ceiba.findAll({
        where: {
          ...whereClause,
          tipo_alarma: {
            [Op.in]: activeAlertIds
          },
          id_transportista: {
            [Op.in]: transportistasUsuarioIds
          }
        },
        order: [
          [Sequelize.literal(`CASE WHEN estado = 8 THEN 1 ELSE 0 END`), 'DESC'],
          ['inicio', 'DESC']
        ]
      });
  
      // Obtener detalles de los transportistas
      const transportistas = await Transportista.findAll({
        where: {
          id: {
            [Op.in]: transportistasUsuarioIds
          }
        },
        attributes: ['id', 'nombre', 'ape_paterno', 'ape_materno']
      });
  
      // Convertir a un objeto para acceso rápido por id
      const transportistasMap = {};
      transportistas.forEach(t => {
        transportistasMap[t.id] = `${t.nombre} ${t.ape_paterno} ${t.ape_materno}`;
      });
  
      // Combinar los nombres de los transportistas con los resultados de las alarmas
      const resultadosConNombres = mov.map(alarma => ({
        ...alarma.toJSON(),
        transportista_nombre: transportistasMap[alarma.id_transportista] || 'Desconocido'
      }));
  
      return res.status(200).json(resultadosConNombres);
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    } 
  };
  

  
const gestionarAlerta = async (req, res) => {
    const { id } = req.params;
    const {id_estado} = req.body
    try {                      
     
        await ADAM_alarmas_ceiba.update({
            estado: id_estado
        },{
            where:{
                id
            }
        })
      
        res.status(200).json({msg: "Alarma Gestionada"})

    } catch (error) {
        console.log(error)            
    }      
}

const gestionarAlertaHowen = async (req, res) => {
  const { guid } = req.params;
  const {id_estado} = req.body
  try {                      
   
      await HOWEN_alertas.update({
          estado: id_estado
      },{
          where:{
            guid
          }
      })
    
      res.status(200).json({msg: "Alarma Gestionada"})

  } catch (error) {
      console.log(error)            
  }      
}

const detalleGestion = async (req, res) => {
    const { id } = req.params;
    const {id_estado, usr_gestion, detalle, nom_contacto, fono_contacto, mail_contacto, id_alarma_ceiba, tipo_notificacion} = req.body

    try {                       
        await ADAM_detalle_gestion.create({
            id_alarma_adam: id,
            id_estado,
            usr_gestion, 
            detalle,
            nom_contacto,
            fono_contacto,
            mail_contacto,
            id_alarma_ceiba,
            tipo_notificacion
        })      
            
        res.status(200).json({msg: "Aviso enviado"})

    } catch (error) {
        console.log(error)            
    }      
}

const obtenerDetalleGestion = async (req, res) => {
    try {   
        const { id } = req.params
        
        const gestiones = await ADAM_detalle_gestion.findAll( {
            where:{id_alarma_ceiba: id}
        })
        return res.status(200).json(gestiones)        
    } catch (error) {
        console.log(error)
    }
}



export{
    obtenerEstadoAlarma,
    obtenerTipoAlertas,
    obtenerAlertas,
    gestionarAlerta,
    obtenerUnidadesAdam,
    obtenerTransportista,
    detalleGestion,
    obtenerDetalleGestion,
    gestionarAlertaHowen
}