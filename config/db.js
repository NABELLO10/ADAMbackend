 import { Sequelize } from "sequelize";
 import dotenv from "dotenv";

 dotenv.config();

/*   const db = new Sequelize(process.env.BDNAME_LOCAL, process.env.BDUSER_LOCAL, process.env.BDPASS_LOCAL, {
    dialect: process.env.BDDIALECT_LOCAL,
    host: process.env.BDHOST_LOCAL,
    port: process.env.PORT_DB_LOCAL,
    logging: false,
    timezone: process.env.TIMEZONE_LOCAL,
    dialectOptions: {
      options: {
          requestTimeout: 60000, // 60 segundos
      }
  },
  pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 60000 // 60 segundos
  }
  })    */

 const db = new Sequelize(process.env.BDNAME_AZURE, process.env.BDUSER_AZURE, process.env.BDPASS_AZURE, {
    dialect: process.env.BDDIALECT_AZURE,
    host: process.env.BDHOST_AZURE,
    port: process.env.PORT_DB_AZURE,
    logging: false,
    timezone: process.env.TIMEZONE_AZURE,
    dialectOptions: {
      options: {
          requestTimeout: 60000, // 60 segundos
      }
  },
  pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 60000 // 60 segundos
  }
  })  
  

export default db  