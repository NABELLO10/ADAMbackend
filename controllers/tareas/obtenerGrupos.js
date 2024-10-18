// Este es tu controlador, por ejemplo, sensorController.js
import ADAM_grupos from "../../models/ADAM_grupos.js";
import ADAM_token from "../../models/ADAM_token.js";

import cron from "node-cron";
import { exec } from "child_process"; 
import { promisify } from "util";
import { fileURLToPath } from "url";
import { dirname, join } from "path"; //

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let arrayResultado = [];


const obtenerGrupos = async () => {
    const token = await ADAM_token.findOne({
      attributes: ["token"],
      where: {
        id: 1,
      },
    });
  
    const scriptPath = join(__dirname, "../tareas/jobsPy/obtenerGrupos.py"); 
  
    try {
      const { stdout, stderr } = await execAsync(`python ${scriptPath} ${token.token}`);
      
      if (stderr) {
        console.error("Error en el script Python:", stderr);
        return;
      }
  
      const resultado = JSON.parse(stdout);
      const grupos = resultado.data;  // Aquí accedemos a la propiedad 'data' que es un array
       
      grupos.map(async (grupo) => {  
        
         const existe = await ADAM_grupos.findOne({
          where: {
            id_grupo: grupo.groupid,
          },
        });
  
        if (!existe) {          
          await ADAM_grupos.create({
            id_grupo: grupo.groupid,
            nom_grupo: grupo.groupname,       
          });
        } else {
          await ADAM_grupos.update(
            {
              nom_grupo: grupo.groupname,   
            },
            {
              where: {
                id_grupo: grupo.groupid,
              },
            }
          );  
        } 
      }); 
  
    } catch (error) {
      console.error(`Error al ejecutar el script Python: ${error}`);
      return;
    }
  };
  

// cada 15 minutos
cron.schedule("0 2 * * *", () => {
  console.log("Tarea obtener grupos siendo ejecutada...");
  obtenerGrupos();
});
