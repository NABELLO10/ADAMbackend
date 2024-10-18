import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import ADAM_unidades from '../../models/ADAM_unidades.js';
import ADAM_token from '../../models/ADAM_token.js';
import cron from 'node-cron';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



async function actualizarPosiciones() {
    try {
        const tokenData = await ADAM_token.findOne({ attributes: ['token'], where: { id: 1 } });
        const token = tokenData.token;
        const unidades = await ADAM_unidades.findAll({ attributes: ['device_id'], where: { est_activo: 1 } });

        for (let terid of unidades) {
            const scriptPath = join(__dirname, '../tareas/jobsPy/obtenerPosGPS.py');
            const command = `python ${scriptPath} ${token} "${terid.dataValues.device_id}"`;

            try {
                const { stdout, stderr } = await execAsync(command);
                if (stderr) {
                    console.error("Error en el script Python:", stderr);
                    continue; // Continúa con el siguiente ID
                }
                
                if (stdout) {
                    try {
                        const resultadoGPS = JSON.parse(stdout);
                        if (resultadoGPS && resultadoGPS.data && resultadoGPS.data.length > 0) {
                                               for (let data of resultadoGPS.data) {
                                await ADAM_unidades.update(
                                    {
                                        gpstime: data.gpstime,
                                        altitud: data.altitude,
                                        direccion: data.direction,
                                        velocidad: data.speed,
                                        time: data.time,
                                        lat: data.gpslat,
                                        lon: data.gpslng,
                                    },
                                    { where: { device_id: data.terid } }
                                );
                            }
                        } else {
                            console.log("No se encontraron datos GPS para el dispositivo:", terid.dataValues.device_id);
                        }
                    } catch (error) {
                        console.error("Error decodificando JSON:", error, "Respuesta recibida:", stdout);
                    }
                } else {
                    console.log("No se recibió salida desde el script Python para el dispositivo:", terid.dataValues.device_id);
                }
            } catch (error) {
                console.error("Error ejecutando el comando:", error);
            }
        }
    } catch (error) {
        console.error("Error al obtener datos GPS:", error);
    }
}

cron.schedule("*/10 * * * *", () => {
    console.log("Tarea obtener GPS siendo ejecutada...");
    actualizarPosiciones();
});
