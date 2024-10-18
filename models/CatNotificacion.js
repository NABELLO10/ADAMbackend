import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const CatNotificaciones = db.define('cat_notificaciones', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    nom_tipo:{
        type: Sequelize.STRING(100)
    },
    id_empresa:{
        type: Sequelize.INTEGER
    },
},
{
    timestamps: false,
    tableName: 'cat_notificaciones'
})


export default CatNotificaciones