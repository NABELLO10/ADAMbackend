import { Sequelize } from "sequelize";
import db from "../config/db.js";

const HOWEN_alertas = db.define('HOWEN_alertas', {
    guid:{
        type: Sequelize.STRING,
        primaryKey:true, 
    },       
    deviceno:{
        type: Sequelize.STRING
    }, 
    deviceName:{
        type: Sequelize.STRING
    },  
    alarmTypeValue:{
        type: Sequelize.STRING
    }, 
    alarmGps:{
        type: Sequelize.STRING
    },
    speed:{
        type: Sequelize.STRING
    }, 
    reportTime:{
        type: Sequelize.STRING
    }, 
    totalMileage:{
        type: Sequelize.STRING
    }, 
    fleetName:{
        type: Sequelize.STRING
    },  
    alarmtype:{
        type: Sequelize.STRING
    },  
    createtime:{
        type: Sequelize.STRING
    },  
    alarmvalue:{
        type: Sequelize.STRING
    },  
    est_gestionada:{
        type: Sequelize.INTEGER
    }
},
{
    timestamps: true,
    tableName : 'HOWEN_alertas'
})





export default HOWEN_alertas;
