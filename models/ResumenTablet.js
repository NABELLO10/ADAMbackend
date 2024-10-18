import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const ResumenTablet = db.define('mov_resumen_tablet', {
    ID: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    PATENTE: {
        type: DataTypes.STRING(20),   
    },
    RB: {
        type: DataTypes.INTEGER,   
    },
    RA: {
        type: DataTypes.INTEGER,   
    },
    DATE: {
        type: DataTypes.STRING(20),   
    },
    TIME: {
        type: DataTypes.STRING(20),   
    },
    O1:{
        type: Sequelize.FLOAT
    },
    O2:{
        type: Sequelize.FLOAT
    },
    O3:{
        type: Sequelize.FLOAT
    },
    O4:{
        type: Sequelize.FLOAT
    },
    O5:{
        type: Sequelize.FLOAT
    },
    O6:{
        type: Sequelize.FLOAT
    },
    O7:{
        type: Sequelize.FLOAT
    },
    O8:{
        type: Sequelize.FLOAT
    },
    O9:{
        type: Sequelize.FLOAT
    },
    O10:{
        type: Sequelize.FLOAT
    },
    TEMP:{
        type: Sequelize.FLOAT
    },
    Fact:{
        type: Sequelize.STRING(100)
    },
    Facum:{
        type: Sequelize.STRING(100)
    },
    fec_add:{
        type: DataTypes.DATE,   
    }, 
    lat_tablet:{
        type: Sequelize.FLOAT
    },
    lon_tablet:{
        type: Sequelize.FLOAT
    },
    lat_celular:{
        type: Sequelize.FLOAT
    },
    lon_celular:{
        type: Sequelize.FLOAT
    },
    est_alerta:{
        type: Sequelize.INTEGER
    },
},
{
    timestamps: false,
    tableName: 'mov_resumen_tablet'
})


export default ResumenTablet