import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";


const ADAM_unidad_alarmas = db.define('ADAM_unidad_alarmas', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    device_id:{
        type: Sequelize.STRING
    },   
    date:{
        type: Sequelize.STRING
    },   
    count:{
        type: Sequelize.STRING
    },   
},
{
    timestamps: true,
    tableName : 'ADAM_unidad_alarmas'
})


export default ADAM_unidad_alarmas;
