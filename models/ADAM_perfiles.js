import { Sequelize } from "sequelize";
import db from "../config/db.js";


const ADAM_perfiles = db.define('ADAM_perfiles', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    nom_perfil:{
        type: Sequelize.STRING
    },
    est_activo:{
        type: Sequelize.INTEGER
    }
     
},
{
    timestamps: true,
    tableName: 'ADAM_perfiles'
})



export default ADAM_perfiles