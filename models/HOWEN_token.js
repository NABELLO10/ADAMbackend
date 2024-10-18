import {Sequelize } from "sequelize";
import db from "../config/db.js";


const HOWEN_token = db.define('HOWEN_token', {
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
    tableName : 'HOWEN_token'
})


export default HOWEN_token;
