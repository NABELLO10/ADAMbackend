import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";


const ADAM_contacto_transportista = db.define('ADAM_contacto_transportista', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    id_transportista:{
        type: Sequelize.INTEGER
    },   
    nom_contacto:{
        type: Sequelize.STRING,
        allowNull: true
    },  
    fono:{
        type: Sequelize.STRING,       
    },
    mail:{
        type: Sequelize.STRING,       
    }          
},
{
    timestamps: true,
    tableName : 'ADAM_contacto_transportista'
})


export default ADAM_contacto_transportista;
