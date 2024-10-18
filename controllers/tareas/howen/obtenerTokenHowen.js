// Este es tu controlador, por ejemplo, sensorController.js
import HOWEN_token from "../../../models/HOWEN_token.js";
import cron from "node-cron";
import { exec } from "child_process"; 
import { promisify } from "util";
import { fileURLToPath } from "url";
import { dirname, join } from "path"; //

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const registrarToken = async () => {
    const scriptPath = join(__dirname, "../howen/obtenerTokenHowen.py");
    try { 
        const resultado = await execAsync(`python ${scriptPath}`);
        const resultadoJson = JSON.parse(resultado.stdout.trim()); // Asegúrate de usar trim() para eliminar cualquier espacio extra alrededor del JSON
   
        if(resultadoJson.data){
            if (resultadoJson.data.token) {
                await HOWEN_token.update(
                    { token: resultadoJson.data.token},
                    { where: { id: 1 } }
                );
            } else {
                console.error('Error al obtener el token:', resultadoJson.Error);
            } 
        }
      
    } catch (error) {
        console.error(`exec error: ${error}`);
        return;
    }  

    console.log("Token HOWEN finalizado")
};

cron.schedule("*/2 * * * *", () => {
    console.log("Tarea token HOWEN siendo ejecutada...");
    registrarToken();
});