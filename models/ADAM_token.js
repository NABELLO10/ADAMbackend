import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";


const ADAM_token = db.define('ADAM_token', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    token:{
        type: Sequelize.STRING
    },   
},
{
    timestamps: true,
    tableName : 'ADAM_token'
})


export default ADAM_token;
