import { Sequelize } from "sequelize";
import db from "../config/db.js";

const GPSTablet = db.define('mov_GPSTablet', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    patente:{
        type: Sequelize.STRING(20)
    }, 
    rut:{
        type: Sequelize.STRING(20)
    }, 
    lat:{
        type: Sequelize.FLOAT
    },
    lon:{
        type: Sequelize.FLOAT
    },
},
{
    timestamps: true,
    tableName: 'mov_GPSTablet'
})


export default GPSTablet