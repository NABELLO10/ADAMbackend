import dbCeiba from "../../../config/dbCeiba.js";
import ADAM_alarmas_ceiba from "../../../models/ADAM_alarmas_ceiba.js";
import ADAM_unidades from "../../../models/ADAM_unidades.js";
import cron from "node-cron";
import moment from "moment";

const obtenerAlertas = async () => {
  try {
    const alarmasCeiba = await dbCeiba.query(
      "SELECT ID, Name, CarLicense, Device, StartTime, EndTime, UploadTime, AlarmType, (SELECT `strategy_alarmtype`.`AlarmTypeName` FROM `strategy_alarmtype` WHERE (`strategy_alarmtype`.`AlarmTypeID` = `evidence_data`.`AlarmType`)) as NomAlarma, Status, Run, Evtuuid FROM wcms4.evidence_data WHERE est_procesada IS NULL;",
      { type: dbCeiba.QueryTypes.SELECT }
    );

    const promesas = alarmasCeiba.map(async (alarma) => {
      const infoUnidad = await ADAM_unidades.findOne({
        where: {
          device_id: alarma.Device,
        },
      });

      const nuevaAlarma = await ADAM_alarmas_ceiba.create({
        id_ceiba: alarma.ID,
        evidencia: alarma.Name,
        unidad: alarma.CarLicense,
        serie: alarma.Device,
        inicio: alarma.StartTime, // Restar 4 horas y formatear la fecha
        fin: alarma.EndTime, // Restar 4 horas y formatear la fecha
        fecha_carga: alarma.UploadTime, // Restar 4 horas y formatear la fecha
        tipo_alarma: alarma.AlarmType,
        nom_tipo_alarma: alarma.NomAlarma,
        nivel: alarma.Status,
        velocidad: alarma.Run,
        id_evento: alarma.Evtuuid,
        url_evidencia: "http://186.10.115.124:3113/evidence-center?eid=" + alarma.ID,
        estado: 8,
        id_transportista: infoUnidad ? infoUnidad.id_transportista : 0,
        fec_alerta : alarma.StartTime
      });
      

      // Actualizar el campo est_procesada una vez creada la alarma
      if (nuevaAlarma) {
        return dbCeiba.query(
          `UPDATE wcms4.evidence_data SET est_procesada = 1 WHERE ID = :id`,
          {
            type: dbCeiba.QueryTypes.UPDATE,
            replacements: { id: alarma.ID },
          }
        );
      }
    });

    // Espera a que todas las promesas se resuelvan
    await Promise.all(promesas);
    console.log("Todas las alarmas CEIBA han sido procesadas y actualizadas");
  } catch (error) {
    console.error("Error procesando las alarmas CEIBA", error);
  }
};

// Cada 3 minutos
cron.schedule("*/2 * * * *", () => {
  console.log("Tarea obtener alarmas CEIBA siendo ejecutada...");
  obtenerAlertas();
});
