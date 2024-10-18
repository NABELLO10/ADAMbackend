import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import ADAM_unidad_alarmas from '../../models/ADAM_unidad_alarmas.js';
import ADAM_token from '../../models/ADAM_token.js';
import ADAM_alarmas_ceiba from '../../models/ADAM_alarmas_ceiba.js';
import db from '../../config/db.js';
import cron from 'node-cron';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function alertasCeiba() {
    const transaction = await db.transaction();

    try {
        const tokenData = await ADAM_token.findOne({ attributes: ['token'], where: { id: 1 }, transaction });
        const token = tokenData.token;

        
        // Ajustamos las fechas de inicio y fin
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const fecInicio = yesterday.toISOString().split('T')[0];
        const fecTermino = tomorrow.toISOString().split('T')[0];
        
        const tiposAlarma = [3];

        const unidades = await ADAM_unidad_alarmas.findAll({
            attributes: ['device_id'],
            where: { date: fecInicio,   count: {
              [db.Sequelize.Op.gt]: 0
          }  },
            transaction
        });
  
        for (let terid of unidades) {
            for (let tipoAlarma of tiposAlarma) {
                const scriptPath = join(__dirname, '../tareas/jobsPy/obtenerAlertasCeiba.py');
                const command = `python ${scriptPath} ${token} ${terid.dataValues.device_id} ${tipoAlarma} ${fecInicio} ${fecTermino}`;

                try {
                    const { stdout, stderr } = await execAsync(command);
                    if (stderr) {
                        console.error("Error en el script Python:", stderr);
                        continue;
                    }

                    const resultadoAlarma = JSON.parse(stdout);
                    if (resultadoAlarma.data && resultadoAlarma.data.length > 0) {
                        for (let alarma of resultadoAlarma.data) {
                            const [existingAlarma, created] = await ADAM_alarmas_ceiba.findOrCreate({
                                where: { alarmid: alarma.alarmid },
                                defaults: {
                                    device_id: alarma.terid,
                                    gps_time: alarma.gpstime,
                                    altitude: alarma.altitude,
                                    direction: alarma.direction,
                                    gpslat: alarma.gpslat,
                                    gpslng: alarma.gpslng,
                                    speed: alarma.speed,
                                    recordspeed: alarma.recordspeed,
                                    state: alarma.state,
                                    time: alarma.time,
                                    type: alarma.type,
                                    content: alarma.content,
                                    cmdtype: alarma.cmdtype,
                                    alarmid: alarma.alarmid,
                                    estado: 8,
                                },
                                transaction
                            });

                           
                        }
                    }
                } catch (error) {
                    console.error("Error al obtener datos de alarma:", error);
                    await transaction.rollback();
                    return;
                }
            }
        }
        await transaction.commit();
        
    } catch (error) {
        console.error("Error en alertasCeiba:", error);
        await transaction.rollback();
    }
}

cron.schedule("*/1 * * * *", () => {
    console.log("Tarea obtener alertas Ceiba siendo ejecutada...");
    alertasCeiba();
});
