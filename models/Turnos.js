import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const Turnos = db.define('mov_turnos', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    patente:{
        type: Sequelize.STRING(10)
    },
    id_usuario:{
        type: Sequelize.STRING(500)
    },
    est_iniciado:{
        type: Sequelize.INTEGER
    },
    est_terminado:{
        type: Sequelize.INTEGER
    },
    fec_add: {
        type: DataTypes.DATE,    
        defaultValue: DataTypes.NOW 
    }
},
{
    timestamps: false,
    tableName: 'mov_turnos'
})


export default Turnos