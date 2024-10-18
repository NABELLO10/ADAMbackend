import Ciudades from "../models/Ciudades.js"
import Token from "../models/Token.js"
import Sensores from "../models/Sensores.js"
import ResumenGPS from "../models/ResumenGPS.js"
import ResumenTablet from "../models/ResumenTablet.js"
import LogSensores from "../models/LogSensores.js"
import SesionConductores from "../models/SesionConductores.js"
import GPSTablet from "../models/GPSTablet.js"
import OxSchool from "../models/OxSchool.js"
import { Op } from "sequelize"


const obtenerCiudades = async (req, res) =>{
    try {
        const ciudades = await Ciudades.findAll({       
            attributes: ['id', 'nom_comuna', 'id_provincia'],
            order: [
                [['nom_comuna', 'ASC']],
              ]            
        })
        return res.status(200).json(ciudades)        
    } catch (error) {
        console.log(error)
    }
}


    const obtenerTokenWialon = async (req, res) => {
      try {
        const token = await Token.findOne({
          where: {
            id: 1,
          },
        });
        return res.status(200).json(token);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
      }
    };


const actualizarWialon =  async (req, res) =>{    
    const {usuario, token} = req.body

     try {                          
        await Token.update({
            usuario, token
        },{
            where:{id : 1}
        })     
        res.status(200).json({msg: "Actualizado"})   

     } catch (error) {
        console.log(error)            
    }       
}


const obtenerDatosOx = async (req, res) => {
    try {
      const {patente} = req.params

      const registros = await Sensores.findAll({
        where :{ patente },
        limit: 100,
        order: [['id', 'DESC']] 
      });
      return res.status(200).json(registros);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
};


const obtenerAlertas = async (req, res) => {
    try {
      const {patente} = req.params

      const registros = await LogSensores.findAll({
        where :{ patente },
        limit: 50,
        order: [['id', 'DESC']] 
      });
      return res.status(200).json(registros);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
};


const obtenerResumenGPS = async (req, res) => {
  try {
    const registros = await ResumenGPS.findAll({   
      order: [['fechaGPS', 'DESC']] 
    });
    return res.status(200).json(registros);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};



const obtenerResumenTablet = async (req, res) => {
  try {
    const registros = await ResumenTablet.findAll({
      //limit: 200,
      //order: [['id', 'DESC']] 
    });
    return res.status(200).json(registros);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};


const obtenerLog = async (req, res) => {
  try { 
    const {patente, desde, hasta, empresa, transportista} = req.params

    const registros = await LogSensores.findAll({
        where :{ patente,
          id_empresa : empresa,
          id_transportista : transportista,
          fecAlerta: {
          [Op.between]: [desde, hasta],
          } }    
      });
   

      return res.status(200).json(registros);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error interno del servidor." });
    } 
  }

const obtenerLogTablet = async (req, res) => {
  try { 
    const {patente, desde, hasta, empresa, transportista} = req.params

    const registros = await LogSensores.findAll({
        where :{ patente,          
          fecAlerta: {
          [Op.between]: [desde, hasta],
          } }    
      });

      return res.status(200).json(registros);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error interno del servidor." });
    } 
  }

  const obtenerLogConductor = async (req, res) => {
  try { 
    const {empresa, transportista, patente} = req.params

    // Obtiene la fecha actual
    const hoy = new Date();
    // Calcula la fecha de ayer restando un día a la fecha actual
    const ayer = new Date(hoy);
    ayer.setDate(hoy.getDate() - 1);

    // Formatea las fechas a YYYY-MM-DD
    const fechaInicio = ayer.toISOString().split('T')[0]; // Fecha de ayer
    const fechaFin = hoy.toISOString().split('T')[0]; // Fecha de hoy

    const registros = await LogSensores.findAll({
        where :{ patente,
          id_empresa : empresa,
          id_transportista : transportista,
          fecAlerta: {
          [Op.between]: [fechaInicio, fechaFin],
          } },
          order: [['id', 'DESC']]    
      });

      return res.status(200).json(registros);

     } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }  
  }

  const obtenerDatosOxFechas = async (req, res) => {
     try { 
      const {patente, desde, hasta} = req.params
      
      const registros = await Sensores.findAll({
        where :{ patente,
          fec_gps: {
            [Op.between]: [desde, hasta] 
          } },
          order: [['id', 'ASC']]     
      });
      
      return res.status(200).json(registros);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error interno del servidor." });
    } 
};

const obtenerDatosTabletFechas = async (req, res) => {
     try { 
      const {patente, desde, hasta} = req.params
      
      
      const registros = await OxSchool.findAll({
        where :{ PATENTE: patente,
          DATE: {
            [Op.between]: [desde, hasta] 
          } },
          order: [['id', 'ASC']]     
      });      
      
      return res.status(200).json(registros);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error interno del servidor." });
    } 
};


const logRevisado =  async (req, res) =>{
  const {id} = req.params 
  try {                        
      await LogSensores.update({
          est_revisado : 1, 
      },{
          where:{
              id : id
          }
      })           
      res.status(200).json({msg: "Revisado!"})
  } catch (error) {
      console.log(error)            
  }      
}

const revisarTodos =  async (req, res) =>{
  const {patente} = req.params
 
  try {     
      await LogSensores.update({
          est_revisado : 1, 
      },{
          where:{
              patente
          }
      })           
      res.status(200).json({msg: "Registros Revisados!"})
  } catch (error) {
      console.log(error)            
  }      
}

const obtenerLogConductor2 = async (req, res) => {
  try { 
    const {patente} = req.params

    // Obtiene la fecha actual
    const hoy = new Date();
    // Calcula la fecha de ayer restando un día a la fecha actual
    const ayer = new Date(hoy);
    ayer.setDate(hoy.getDate() - 1);

    // Formatea las fechas a YYYY-MM-DD
    const fechaInicio = ayer.toISOString().split('T')[0]; // Fecha de ayer
    const fechaFin = hoy.toISOString().split('T')[0]; // Fecha de hoy

    const registros = await LogSensores.findAll({
        where :{ patente,               
          fecAlerta: {
          [Op.between]: [fechaInicio, fechaFin],
          } },
          order: [['id', 'DESC']]    
      });

      return res.status(200).json(registros);

     } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }  
}


const inicioConductor = async (req, res) => {
  const {patente, rut, est_activo} = req.body
  try {       

    if(est_activo == 1){
      await SesionConductores.update({
        est_activo : 0
      },{
          where:{
              patente
          }
      })        
  
        await SesionConductores.create({
          patente, rut_conductor : rut , est_activo : 1
        })

    }else{

      await SesionConductores.update({
        est_activo : 0
      },{
          where:{
              patente
          }
      })      
    }                    
      res.status(200).json({msg: "Iniciado!"})

  } catch (error) {
      console.log(error)            
  }      
}

const obtenerConductorActivo = async (req, res) => {
  const { patente, rut } = req.params;
  try {
    const activo = await SesionConductores.findOne({
      where: {
        patente,
        rut_conductor: rut,
        est_activo: 1,
      },
    });

    return res.status(200).json(activo);
  } catch (error) {
    console.log(error);
  }
};


const enviarGPS = async (req, res) => {
  const {patente, rut, lat, lon} = req.body
  try {     
        await GPSTablet.create({
          patente, rut, lat, lon
        })  
  } catch (error) {
      console.log(error)            
  }      
}



export {
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
}