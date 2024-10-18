import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import HOWEN_alertas from '../../../models/HOWEN_alertas.js';
import HOWEN_token from '../../../models/HOWEN_token.js';
import HOWEN_unidades from '../../../models/HOWEN_unidades.js';
import db from '../../../config/db.js';
import cron from 'node-cron';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function alarmasHOWEN() {
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
            const scriptPath = join(__dirname, '../howen/obtenerAlarmasHowen.py');
            const command = `python3 ${scriptPath} "${token}" "${terid.dataValues.deviceno}" "${beginTime}" "${endTime}"`;


            try {
                const { stdout, stderr } = await execAsync(command);
                if (stderr) {
                    console.error("Error en el script Python:", stderr);
                    continue;
                }

                const resultado = JSON.parse(stdout);
   
                if(resultado.status == 10023){
                    return console.log("TOKEN HOWEN INACTIVO")
                   
                }


                if (resultado.data) {               
                    for (let alerta of resultado.data.dataList) {               
                        // Intentar encontrar la alerta o crear una nueva si no existe
                        const [alertaExistente, created] = await HOWEN_alertas.findOrCreate({
                            where: { guid: alerta.guid }, // Buscar por GUID
                            defaults: {
                                guid: alerta.guid,
                                deviceName: alerta.deviceName,
                                alarmTypeValue: alerta.alarmTypeValue,
                                alarmGps: alerta.alarmGps,
                                speed: alerta.speed,
                                reportTime: alerta.reportTime,
                                totalMileage: alerta.totalMileage,
                                fleetName: alerta.fleetName,
                                deviceno: alerta.deviceno,
                                alarmtype: alerta.alarmtype,
                                createtime: alerta.createtime,
                                alarmvalue: alerta.alarmvalue,
                                est_gestionada: 8 // Puedes cambiar este valor según corresponda
                            },
                            transaction
                        });                       
                    } 
                } 
            } catch (error) {
                console.error("Error al obtener datos de alarma HOWEN:", error);
                await transaction.rollback();
                return;
            } 
        }
        
        await transaction.commit();

        console.log("Alertas HOWEN finalizado")

    } catch (error) {
        console.error("Error en alarmas HOWEN:", error);
        await transaction.rollback();
    }
}

// Configuración del cron job para ejecutar cada minuto
cron.schedule("*/60 * * * * *", () => {
    console.log("Tarea obtener alertas HOWEN siendo ejecutada...");
    alarmasHOWEN();
});
