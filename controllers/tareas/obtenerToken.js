// Este es tu controlador, por ejemplo, sensorController.js
import ADAM_token from "../../models/ADAM_token.js";
import cron from "node-cron";
import { exec } from "child_process"; 
import { promisify } from "util";
import { fileURLToPath } from "url";
import { dirname, join } from "path"; //

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const registrarToken = async () => {
    const scriptPath = join(__dirname, "../tareas/jobsPy/obtenerToken.py");

    try { 
        const resultado = await execAsync(`python ${scriptPath}`);
        const resultadoJson = JSON.parse(resultado.stdout.trim()); // Asegúrate de usar trim() para eliminar cualquier espacio extra alrededor del JSON
        
        if (resultadoJson.Token) {
            await ADAM_token.update(
                { token: resultadoJson.Token },
                { where: { id: 1 } }
            );
        } else {
            console.error('Error al obtener el token:', resultadoJson.Error);
        }
    } catch (error) {
        console.error(`exec error: ${error}`);
        return;
    } 
};

// 1 vez a las 3 am
cron.schedule("0 3 * * *", () => {
  console.log("Tarea actualizar token...");
  registrarToken();
});
