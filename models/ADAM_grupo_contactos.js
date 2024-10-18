import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

import ADAM_grupos from "./ADAM_grupos.js";

const ADAM_grupo_contactos = db.define('ADAM_grupo_contactos', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    id_grupo:{
        type: Sequelize.INTEGER
    },   
    contacto:{
        type: Sequelize.STRING,
        allowNull: true
    },   
},
{
    timestamps: true,
    tableName : 'ADAM_grupo_contactos'
})

ADAM_grupo_contactos.belongsTo(ADAM_grupos, {foreignKey : "id_grupo"})


export default ADAM_grupo_contactos;
