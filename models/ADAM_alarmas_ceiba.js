import { Sequelize } from "sequelize";
import db from "../config/db.js";


const ADAM_alarmas_ceiba = db.define('ADAM_alarmas_ceiba', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    id_ceiba:{
        type: Sequelize.STRING
    },   
    evidencia:{
        type: Sequelize.STRING,  
    },  
    unidad:{
        type: Sequelize.STRING,  
    },  
    serie:{
        type: Sequelize.STRING,  
    },  
    inicio:{
        type: Sequelize.DATE,  
    },  
    fin:{
        type: Sequelize.DATE,  
    },  
    fecha_carga:{
        type: Sequelize.DATE,  
    },  
    tipo_alarma:{
        type: Sequelize.INTEGER,  
    },  
    nom_tipo_alarma:{
        type: Sequelize.STRING,  
    },  
    nivel:{
        type: Sequelize.STRING,  
    },  
    velocidad:{
        type: Sequelize.INTEGER,  
    },  
    id_evento:{
        type: Sequelize.STRING,  
    },
    url_evidencia:{
        type: Sequelize.STRING(500),  
    },
    estado:{
        type: Sequelize.INTEGER,  
    }, 
    id_transportista:{
        type: Sequelize.INTEGER,  
    }, 
    fec_alerta:{
        type: Sequelize.DATEONLY,  
    },
           
},
{
    timestamps: true,
    tableName : 'ADAM_alarmas_ceiba'
})



export default ADAM_alarmas_ceiba;
