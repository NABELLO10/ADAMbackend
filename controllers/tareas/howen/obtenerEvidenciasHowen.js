import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import HOWEN_evidencias from '../../../models/HOWEN_evidencias.js';
import HOWEN_token from '../../../models/HOWEN_token.js';
import HOWEN_unidades from '../../../models/HOWEN_unidades.js';
import db from '../../../config/db.js';
import cron from 'node-cron';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function evidenciasHOWEN() {
    const transaction = await db.transaction();

    try {
        const tokenData = await HOWEN_token.findOne({ attributes: ['token'], where: { id: 1 }, transaction });
        const token = tokenData.token;

        const now = new Date();
        const twoMinutesAgo = new Date(now.getTime() - 1 * 60000); // Restar exactamente 2 minutos
        

        
        const formatDate = (date) => {
            const pad = (num) => num.toString().padStart(2, '0');
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        };
        
        const beginTime = formatDate(twoMinutesAgo); // Hace 2 minutos
        const endTime = formatDate(now); // Ahora
        
        
        const unidades = await HOWEN_unidades.findAll({
            attributes: ['deviceno'],
            transaction
        });

        for (let terid of unidades) {
            const scriptPath = join(__dirname, '../howen/obtenerEvidenciasHowen.py');
            const command = `python3 ${scriptPath} "${token}" "${terid.dataValues.deviceno}" "${beginTime}" "${endTime}"`;

            try {
                const { stdout, stderr } = await execAsync(command, { maxBuffer: 1024 * 1024 * 10 }); // Aumentar el buffer a 10MB

                if (stderr) {
                    console.error("Error en el script Python:", stderr);
                    continue;
                }
                
                const resultado = JSON.parse(stdout);
   
                if(resultado){
                    if(resultado.status == 10023){
                      return  console.log("TOKEN HOWEN INACTIVO")                        
                     }

                     
                    if (resultado.data) {
                    for (let info of resultado.data) {
                        // Asegúrate de que 'alarmFile' es un array antes de iterarlo
                        if (Array.isArray(info.alarmFile)) {
                        for (let alarma of info.alarmFile) {
                            // Intentar encontrar la alarma o crear una nueva si no existe
                            await HOWEN_evidencias.findOrCreate({
                            where: { alarmGuid: info.alarmGuid }, // Buscar por GUID
                            defaults: {
                                alarmGuid: info.alarmGuid,
                                deviceID: info.deviceID,
                                deviceName: info.deviceName,
                                alarmType: info.alarmType,
                                alarmTypeValue: info.alarmTypeValue,
                                reportTime: info.reportTime,
                                totalMileage: info.totalMileage,
                                fileGuid: alarma.fileGuid,
                                fileStartTime: alarma.fileStartTime,
                                fileStopTime: alarma.fileStopTime,
                                downUrl: alarma.downUrl,
                                fleetName: info.fleetName,
                                alarmTimeEnd: info.alarmTimeEnd,
                                speed: info.speed,
                                endGps: info.endGps,
                                estado: 0, // Puedes cambiar este valor según corresponda
                            },
                            transaction,
                            });
                        }
                        } else {
                        console.log(
                            `No hay archivos de alarma para el dispositivo ${info.deviceID}`
                        );
                        }
                    }
                } 
            }

            
                

            } catch (error) {
                console.error("Error al obtener Evidencias de alarma:", error);
                await transaction.rollback();
                return;
            } 
        }
        
        await transaction.commit();

        console.log("Evidencias HOWEN finalizado")

    } catch (error) {
        console.error("Error en Evidencias HOWEN:", error);
        await transaction.rollback();
    }
}

// Configuración del cron job para ejecutar cada minuto
cron.schedule("*/60 * * * * *", () => {
    console.log("Tarea obtener Evidencias HOWEN siendo ejecutada...");
    evidenciasHOWEN();
});
