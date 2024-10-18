import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Sequelize } from "sequelize";

//BASE DE DATOS
import db from "./config/db.js";
import dbCeiba from "./config/dbCeiba.js";
import exportarModelos from "./config/ExportarModelos.js";

//ROUTES
import loginRoutes from "./routes/loginRoutes.js"
import crudRoutes from "./routes/crudRoutes.js"
import generalRoutes from "./routes/generalRoutes.js"
import adamRoutes from "./routes/adamRoutes.js"
 
//import './controllers/tareas/obtenerToken.js'  
//import './controllers/tareas/obtenerGrupos.js'

import './controllers/tareas/obtenerUnidades.js' 
import './controllers/tareas/Ceiba/obtenerAlertas.js' 
import './controllers/tareas/howen/obtenerUnidadesHowen.js' 
import './controllers/tareas/howen/obtenerAlarmasHowen.js' 
import './controllers/tareas/howen/obtenerEvidenciasHowen.js' 
import './controllers/tareas/howen/obtenerTokenHowen.js'  



//aqui se crea la aplicacion de express
const app = express();

//le decimos que enviaremos datos de tipo json
app.use(express.json());

//busca y agrega el archivo .env
dotenv.config();

//Veriricando modelos al inciar si no existe los crea
exportarModelos();

//conectando a base de datos con sequelize
//await db.authenticate()
 db.sync()
   .then(() => {
     console.log("BD conectada");
   })
   .catch((error) => {
     console.log(error);
   });
 
  dbCeiba.sync()
   .then(() => {
     console.log("BD CEIBA conectada");
   })
   .catch((error) => {
     console.log(error);
   });
  

  //Utilizando cors para proteger la api ORIGINAL
  const corsOptions = {
    origin: process.env.FRONTEND_URL, // Asegúrate de que FRONTEND_URL esté correctamente definido en tu archivo .env
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  };
  app.use(cors(corsOptions));
   
  

  //ROUTES
app.use('/api-adam/', loginRoutes)
app.use("/api-adam/crud/", crudRoutes);
app.use("/api-adam/general/", generalRoutes);
app.use("/api-adam/adam/", adamRoutes);


//PUERTOS
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
