import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const Log = db.define('logs', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    des_log:{
        type: Sequelize.STRING(2000)
    },
    fec_add: {
        type: DataTypes.DATE,    
        defaultValue: DataTypes.NOW 
    },
    id_empresa:{
        type: Sequelize.INTEGER
    },
},
{
    timestamps: false,
    tableName: 'logs'
})


export default Log