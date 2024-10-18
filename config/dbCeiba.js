import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();


/* const dbCeiba = new Sequelize('wcms4','idfleet','',{
    host: '186.10.115.124',
    dialect: 'mysql',
    timezone: '-03:00',
    port: 3307,
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000
    }
}) */

    
const dbCeiba = new Sequelize(process.env.BDNAME_CEIBA,process.env.BDUSER_CEIBA,process.env.BDPASS_CEIBA,{
    host: process.env.BDHOST_CEIBA,
    dialect: process.env.BDDIALECT_CEIBA,
    timezone: process.env.TIMEZONE_CEIBA,
    port: process.env.PORT_DB_CEIBA,
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000
    }
})


export default dbCeiba