import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const LogSensores = db.define('log_sensores', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    patente:{
        type: Sequelize.STRING(10)
    },
    tipo:{
        type: Sequelize.STRING(500)
    },
    detalle:{
        type: Sequelize.TEXT
    },
    fec_add: {
        type: DataTypes.DATE,    
        defaultValue: DataTypes.NOW 
    },  
    est_activo:{
        type: Sequelize.INTEGER
    },
    id_transportista:{
        type: Sequelize.INTEGER
    },
    id_empresa:{
        type: Sequelize.INTEGER
    },
    fecGPS:{
        type: Sequelize.STRING(100)
    },
    fecAlerta:{
        type: Sequelize.STRING(100)
    },
    est_revisado:{
        type: Sequelize.INTEGER
    },
    user_revisado:{
        type: Sequelize.STRING(100)
    },
},
{
    timestamps: true,
    tableName: 'log_sensores'
})


export default LogSensores