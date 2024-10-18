import ADAM_usuarios_transportistas from "../models/ADAM_usuarios_transportistas.js";
import ADAM_usuarios from "../models/ADAM_usuarios.js";
import Transportistas from "../models/Transportistas.js";
import ADAM_tipo_alarma from "../models/ADAM_tipo_alarma.js";
import ADAM_alarma_transportista from "../models/ADAM_alarma_transportista.js";
import ADAM_unidades from "../models/ADAM_unidades.js";
import emailAlerta from "../helpers/emailAlerta.js";
import { Op } from "sequelize";

const obtenerUsuarioTransportista = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const resultado = await ADAM_usuarios_transportistas.findAll({
      where: {
        id_usuario,
      },
      include: [{ model: Transportistas }, { model: ADAM_usuarios }],
    });

    return res.status(200).json(resultado);
  } catch (error) {
    console.log(error);
  }
};

const editarTipoAlarma = async (req, res) => {
  const { id } = req.params;
  const { est_activo } = req.body;

  try {
    await ADAM_tipo_alarma.update(
      {
        est_activo,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json({ msg: "Estado Actualizado" });
  } catch (error) {
    console.log(error);
  }
};

const obtenerTransportistasActivos = async (req, res) => {
  try {
    const tra = await Transportistas.findAll({
      attributes: [
        "id",
        "rut",
        "nombre",
        "ape_paterno",
        "ape_materno",
        "fono",
        "email",
        "est_activo",
        "id_empresa",
      ],
      where: {
        est_activo: 1,
      },
    });
    return res.status(200).json(tra);
  } catch (error) {
    console.log(error);
  }
};

const eliminarTrasnportistaAlerta = async (req, res) => {
  const { id_transportista } = req.params;

  try {      
        await ADAM_alarma_transportista.destroy({
            where: {
                id_transportista,
            },
          });
     
    res.status(200).json({ msg: "Alertas Eliminadas" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};


const registrarTrasnportistaAlerta = async (req, res) => {
  const { id_transportista, alertas } = req.body;

  try {
    // Eliminar las alertas actuales del transportista
    await ADAM_alarma_transportista.destroy({
      where: {
        id_transportista,
      },
    });

    // Agregar las nuevas alertas
    for (const alerta of alertas) {
      if (alerta.value) {
        await ADAM_alarma_transportista.create({
          id_transportista,
          id_tipo_alarma: alerta.value,  // Asegúrate de que 'alerta.value' contiene el ID de la alerta
        });
      }
    }

    res.status(200).json({ msg: "Alertas Actualizadas" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};




const obtenerAlarmasTransportista = async (req, res) => {
  const {id} = req.params
  try { 
    const alarmas = await ADAM_alarma_transportista.findAll({
      where :{
        id_transportista : id
      },
      include: [
        {
          model: Transportistas            
        }
      ],
      order: [
        [Transportistas, 'nombre', 'ASC'], // Asegura que el ordenamiento sea consistente
      ],
    });
    
    // Extraemos los ids de tipo de alarma de las alarmas obtenidas
    const idTiposAlarma = alarmas.map(alarmas => alarmas.id_tipo_alarma);
    
    // Obtenemos los tipos de alarma correspondientes
    const tiposAlarma = await ADAM_tipo_alarma.findAll({
      where: {
        id_tipo: {
          [Op.in]: idTiposAlarma
        }
      },
      attributes: ['id_tipo', 'nombre_tipo_alarma']
    });
    
    // Creamos un diccionario para acceso rápido a los nombres de tipo de alarma
    const diccionarioTiposAlarma = {};
    tiposAlarma.forEach(tipo => {
      diccionarioTiposAlarma[tipo.id_tipo] = tipo.nombre_tipo_alarma;
    });
    
    // Agregamos el nombre del tipo de alarma a cada alarma en la lista
    const alarmasConNombreTipo = alarmas.map(alarmas => {
      return {
        ...alarmas.toJSON(), // Convertimos a JSON para manipulación más fácil
        nombre_tipo_alarma: diccionarioTiposAlarma[alarmas.id_tipo_alarma]
      };
    });
    
    // Procesamos los resultados para agrupar por transportista
    const resultadoAgrupado = agruparPorTransportista(alarmasConNombreTipo);

    return res.status(200).json(resultadoAgrupado);
   } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener las alarmas de los transportistas" });
  } 
};


const obtenerAlarmasTransportistas = async (req, res) => {
  try {
 
    const alarmas = await ADAM_alarma_transportista.findAll({
      include: [
        {
          model: Transportistas            
        }
      ],
      order: [
        [Transportistas, 'nombre', 'ASC'], // Asegura que el ordenamiento sea consistente
      ],
    });
    
    // Extraemos los ids de tipo de alarma de las alarmas obtenidas
    const idTiposAlarma = alarmas.map(alarmas => alarmas.id_tipo_alarma);
    
    // Obtenemos los tipos de alarma correspondientes
    const tiposAlarma = await ADAM_tipo_alarma.findAll({
      where: {
        id_tipo: {
          [Op.in]: idTiposAlarma
        }
      },
      attributes: ['id_tipo', 'nombre_tipo_alarma']
    });
    
    // Creamos un diccionario para acceso rápido a los nombres de tipo de alarma
    const diccionarioTiposAlarma = {};
    tiposAlarma.forEach(tipo => {
      diccionarioTiposAlarma[tipo.id_tipo] = tipo.nombre_tipo_alarma;
    });
    
    // Agregamos el nombre del tipo de alarma a cada alarma en la lista
    const alarmasConNombreTipo = alarmas.map(alarmas => {
      return {
        ...alarmas.toJSON(), // Convertimos a JSON para manipulación más fácil
        nombre_tipo_alarma: diccionarioTiposAlarma[alarmas.id_tipo_alarma]
      };
    });
    
    // Procesamos los resultados para agrupar por transportista
    const resultadoAgrupado = agruparPorTransportista(alarmasConNombreTipo);

    return res.status(200).json(resultadoAgrupado);
   } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener las alarmas de los transportistas" });
  } 
};

const agruparPorTransportista = (alarmas) => {
  // Implementa la lógica de agrupación aquí
  // Puedes utilizar un objeto para agrupar las alarmas por transportista
  const agrupado = {};


  alarmas.forEach(alarma => {
    const transportistaId = alarma.mae_transportista.id;
    if (!agrupado[transportistaId]) {
      agrupado[transportistaId] = {
        transportista: alarma.mae_transportista,
        alarmas: []
      };
    }
    agrupado[transportistaId].alarmas.push(alarma);
  });

  return Object.values(agrupado);
};



  const obtenerInfoUnidad = async (req, res) => {
    try {
      const { device_id } = req.params;
      const resultado = await ADAM_unidades.findOne({
        where: {
          device_id ,
        },
      });
   
  
      return res.status(200).json(resultado);
    } catch (error) {
      console.log(error);
    }
  };


  const obtenerInfoTransportista = async (req, res) => {
    try {
      const { id } = req.params;
      const resultado = await Transportistas.findAll({
        where: {
          id,
        },
      });
     
  
      return res.status(200).json(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  const enviarCorreoAlerta = async (req, res) => {
    try {
      const {contacto, alerta, detalle } = req.body;
    
      emailAlerta(contacto, alerta, detalle)
      
      return res.status(200).json({ msg: "Correo Enviado" });

    } catch (error) {
      console.log(error);
    }
  };

  

  
export {
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
};
