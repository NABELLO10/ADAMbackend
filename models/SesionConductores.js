import { Sequelize } from "sequelize";
import db from "../config/db.js";

const SesionConductores = db.define('mov_sesion_conductores', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    patente:{
        type: Sequelize.STRING(20)
    },       
    rut_conductor:{
        type: Sequelize.STRING(2000)
    },   
    est_activo:{
        type: Sequelize.INTEGER
    },
},
{
    timestamps: true,
    tableName: 'mov_sesion_conductores'
})


export default SesionConductores