import { Sequelize } from "sequelize";
import db from "../config/db.js";

const HOWEN_evidencias = db.define('HOWEN_evidencias', {
    alarmGuid:{
        type: Sequelize.STRING,
        primaryKey:true, 
    },       
    deviceID:{
        type: Sequelize.STRING
    }, 
    deviceName:{
        type: Sequelize.STRING
    },    
    alarmType:{
        type: Sequelize.STRING
    },
    alarmTypeValue:{
        type: Sequelize.STRING
    }, 
    reportTime:{
        type: Sequelize.STRING
    }, 
    totalMileage:{
        type: Sequelize.STRING
    }, 
    fileGuid:{
        type: Sequelize.STRING
    },  
    fileStartTime:{
        type: Sequelize.STRING
    },  
    fileStopTime:{
        type: Sequelize.STRING
    },  
    downUrl:{
        type: Sequelize.TEXT
    },  
    fleetName:{
        type: Sequelize.STRING
    },  
    alarmTimeEnd:{
        type: Sequelize.STRING
    },  
    speed:{
        type: Sequelize.STRING
    },  
    endGps:{
        type: Sequelize.STRING
    },  
    estado:{
        type: Sequelize.INTEGER
    }
},
{
    timestamps: true,
    tableName : 'HOWEN_evidencias'
})





export default HOWEN_evidencias;
