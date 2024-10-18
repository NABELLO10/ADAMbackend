import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import HOWEN_token from '../../../models/HOWEN_token.js';
import HOWEN_unidades from '../../../models/HOWEN_unidades.js';
import db from '../../../config/db.js';
import cron from 'node-cron';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function obtenerUnidadesHowen() {
    const transaction = await db.transaction();

    try {
        // Recuperar el token de la base de datos
        const tokenData = await HOWEN_token.findOne({ attributes: ['token'], where: { id: 1 }, transaction });
        const token = tokenData.token;

        // Definir la ruta del script de Python
        const scriptPath = join(__dirname, '../../tareas/howen/obtenerUnidadesHowen.py');
        const command = `python ${scriptPath} ${token}`;

        // Ejecutar el script de Python
        const { stdout, stderr } = await execAsync(command);
        if (stderr) {
            console.error("Error en el script Python:", stderr);
            await transaction.rollback();
            return;
        }

        const resultado = JSON.parse(stdout);

        // Obtener la fecha de hoy en formato 'YYYY-MM-DD'
        const hoy = new Date().toISOString().split('T')[0];
        

        // Procesar los datos de unidades
        if (resultado.data.dataList.length > 0) {
            for (let unidad of resultado.data.dataList) {               
                // Guardar o actualizar la información de las unidades en la base de datos
                await HOWEN_unidades.upsert({
                    deviceno: unidad.deviceno, // Criterio para identificar si existe o no
                    devicename: unidad.devicename,
                    fleetname: unidad.fleetname,
                    plateno: unidad.plateno,
                    vehicletype: unidad.vehicletype,
                    streamserver: unidad.streamserverid,
                    longitude: unidad.longitude,
                    latitude: unidad.latitude,
                    altitude: unidad.altitude,
                    speed: unidad.speed,
                    onlineTime: unidad.lastonlinetime,
                    offlineTime: unidad.lastofflinetime,
                    est_activo: 1, // Puedes cambiar este valor según corresponda

                    // Asignar la fecha de hoy a los campos de fecha
                    fec_rev_tecnica: hoy,
                    fec_per_circulacion: hoy,
                    fec_seguro: hoy,
                }, {
                    where: { deviceno: unidad.deviceno }, // Define el criterio de actualización
                    transaction
                });
            }
        }

        await transaction.commit();
        console.log("Datos de unidades actualizados correctamente.");

    } catch (error) {
        console.error("Error al obtener datos de unidades Howen:", error);
        await transaction.rollback();
    }
}

// Configuración del cron job para ejecutar cada 15 minutos
cron.schedule("*/25 * * * *", () => {
    console.log("Ejecutando tarea de obtención de unidades Howen...");
    obtenerUnidadesHowen();
});
