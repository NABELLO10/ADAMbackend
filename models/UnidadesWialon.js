import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const UnidadesWialon = db.define('unidades_wialon', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    nm:{
        type: Sequelize.STRING(200)
    },   
    id_wialon:{
        type: Sequelize.INTEGER
    },
    mu:{
        type: Sequelize.STRING(200)
    },  
    uacl:{
        type: Sequelize.STRING(200)
    },    
    id_unidad_sistema:{
        type: Sequelize.INTEGER
    }
},
{
    timestamps: true,
    tableName : 'unidades_wialon'
})


export default UnidadesWialon;
