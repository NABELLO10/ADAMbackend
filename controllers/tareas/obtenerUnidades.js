import dbCeiba from "../../config/dbCeiba.js"
import ADAM_unidades from "../../models/ADAM_unidades.js";
import cron from "node-cron";
import moment from "moment"; // Importar moment


const obtenerUnidades = async () => {
 
    const unidadesCeiba = await dbCeiba.query(
      "SELECT * FROM wcms4.vehicledevice;",
      { type: dbCeiba.QueryTypes.SELECT }
    );

    const promesas = unidadesCeiba.map(async (unidad) => {
               
        const existe = await ADAM_unidades.findOne({
          where: {
            device_id: unidad.DeviceID,
          },
        });
  
        if (!existe) {          
         await ADAM_unidades.create({
           nom_patente : unidad.CarLicence,
           device_id : unidad.DeviceID,
           grupo_id : unidad.GroupID,
           canales : 0,
           ip_registro : unidad.RegisterIP,
           puerto_registro : unidad.RegisterPort,
           puerto_transmision : unidad.TransmitPort,
           linktype : "",
           devicetype : "",          
           est_activo : 1            
         });
        }       
    });

    // Espera a que todas las promesas se resuelvan
    await Promise.all(promesas);
    console.log("Todas las unidades han sido procesadas y actualizadas");
};

// cada 3 minutos
cron.schedule("*/20 * * * *", () => {
  console.log("Tarea obtener UNIDADES siendo ejecutada...");
  obtenerUnidades();
});
