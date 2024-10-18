import { exec } from "child_process";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';  // <-- Corregido aquí

import Token from "../../models/Token.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const listarUnidadesPY = async (req, res) => {
    const token = await Token.findOne({ 
        attributes: ['token'],           
        where:{
            id : 1
        }
    })   

    try {
        const scriptPath = join(__dirname, 'Listar_Unidades.py');  // <-- Corregido aquí

        exec(`python ${scriptPath} ${token.token}`, (error, resultado, stderr) => {
            if (error) {            
                console.error(`exec error: ${error}`);
                return res.status(400).send(error)      
             
            }       
            return res.status(200).send(resultado)          
        });
    } catch (error) {
        return res.status(400).send(error)  
    }

   
}

const datosOxPY = async (req, res) => {
    const token = await Token.findOne({ 
        attributes: ['token'],           
        where:{
            id : 1
        }
    }) 
    try {
        const scriptPath = join(__dirname, 'Datos_ox.py');  // <-- Corregido aquí

    exec(`python ${scriptPath} ${token.token}`, (error, resultado, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(400).send(error) 
          
        }   
        return res.status(200).send(resultado)  
    });
        
    }  catch (error) {
        return res.status(400).send(error)  
    }

    
}

const tControl = async (req, res) => {
    const token = await Token.findOne({
      attributes: ["token"],
      where: {
        id: 1,
      },
    }); 

    try {
        const scriptPath = join(__dirname, 'TKONTROL.py');  // <-- Corregido aquí

    exec(`python ${scriptPath} ${token.token}`, (error, resultado, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(400).send(error)  
           
        }   

        return res.status(200).send(resultado)  
    });
       }  catch (error) {
        return res.status(400).send(error)  
    }
    
}

export {
    listarUnidadesPY,
    datosOxPY, tControl
}
