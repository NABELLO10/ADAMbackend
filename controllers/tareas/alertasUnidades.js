import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import ADAM_unidades from '../../models/ADAM_unidades.js';
import ADAM_token from '../../models/ADAM_token.js';
import ADAM_unidad_alarmas from '../../models/ADAM_unidad_alarmas.js';
import cron from 'node-cron';
import db from '../../config/db.js';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function obtenerEstadisticasAlarmas() {
    const transaction = await db.transaction();
    try {
        const tokenData = await ADAM_token.findOne({ attributes: ['token'], where: { id: 1 }, transaction });
        const token = tokenData.token;

        const unidades = await ADAM_unidades.findAll({
            attributes: ['device_id'],
            where: { est_activo: 1 },
            transaction
        });

        const today = new Date();
        const fechaInicio = today.toISOString().split('T')[0] + ' 00:00:00';
        const fechaFin = today.toISOString().split('T')[0] + ' 23:59:59';
        const tipo = 4; 

        for (let terid of unidades) {
            const scriptPath = join(__dirname, '../tareas/jobsPy/obtenerAlertasUnidades.py');
            const command = `python ${scriptPath} "${token}" "${terid.dataValues.device_id}" "${tipo}" "${fechaInicio}" "${fechaFin}"`;

            try {
                const { stdout, stderr } = await execAsync(command);
                if (stderr) {
                    console.error("Error en el script Python:", stderr);
                    continue;
                }

                const resultadoAlarma = JSON.parse(stdout);
           
                if (resultadoAlarma.data && resultadoAlarma.data.length > 0) {
                    for (let alarma of resultadoAlarma.data) {
                        const [alarmaRecord, created] = await ADAM_unidad_alarmas.findOrCreate({
                            where: { date: alarma.date, device_id: alarma.terid },
                            defaults: {
                                device_id: alarma.terid,
                                date: alarma.date,
                                count: alarma.count
                            },
                            transaction
                        });

                        if (!created) {
                            // Si no se creó, entonces actualizar
                            await alarmaRecord.update({ count: alarma.count }, { transaction });
                        }
                    }
                }
            } catch (error) {
                console.error("Error al obtener datos de alarma:", error);
                await transaction.rollback();
                throw error;
            }
        }

        await transaction.commit();
    } catch (error) {
        console.error("Error en obtenerEstadisticasAlarmas:", error);
        await transaction.rollback();
    }
}

cron.schedule("*/5 * * * * ", () => {
    console.log("Tarea alerta unidadess siendo ejecutada...");
    obtenerEstadisticasAlarmas();
});
