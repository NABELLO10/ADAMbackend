import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";


const ADAM_grupos = db.define('ADAM_grupos', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    id_grupo:{
        type: Sequelize.INTEGER
    },   
    nom_grupo:{
        type: Sequelize.STRING,
        allowNull: true
    },  
    contacto:{
        type: Sequelize.STRING,       
    }     
},
{
    timestamps: true,
    tableName : 'ADAM_grupos'
})


export default ADAM_grupos;
