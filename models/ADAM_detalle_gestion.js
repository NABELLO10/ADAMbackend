import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const ADAM_detalle_gestion = db.define('ADAM_detalle_gestion', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    id_alarma_adam:{
        type: Sequelize.TEXT
    },   
    id_estado:{
        type: Sequelize.INTEGER,       
    },  
    usr_gestion:{
        type: Sequelize.STRING,       
    },
    detalle:{
        type: Sequelize.STRING(2000),       
    },
    nom_contacto:{
        type: Sequelize.STRING,       
    },
    fono_contacto:{ 
        type: Sequelize.STRING,       
    },
    mail_contacto:{
        type: Sequelize.STRING,       
    },
    id_alarma_ceiba:{
        type: Sequelize.TEXT
    },  
    tipo_notificacion:{
        type: Sequelize.STRING
    },  

},
{
    timestamps: true,
    tableName : 'ADAM_detalle_gestion'
})
/* 
ADAM_detalle_gestion.belongsTo(ADAM_estados_evidencia, {foreignKey : "id_estado"})
ADAM_detalle_gestion.belongsTo(ADAM_alarmas, {foreignKey : "id_alarma_adam"}) */


export default ADAM_detalle_gestion;
