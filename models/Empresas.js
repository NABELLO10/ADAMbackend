import { Sequelize } from "sequelize";
import db from "../config/db.js";



const Empresas = db.define('mae_empresas', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    rut_empresa:{
        type: Sequelize.STRING(20)
    },
    nom_empresa:{
        type: Sequelize.TEXT
    },   
    est_activo:{
        type: Sequelize.INTEGER,
        defaultValue: 1
    }   
},
{
    timestamps: false,
    tableName: 'mae_empresas'
})




export default Empresas