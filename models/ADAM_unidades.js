import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const ADAM_unidades = db.define('ADAM_unidades', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    id_transportista:{
        type: Sequelize.INTEGER
    },       
    nom_patente:{
        type: Sequelize.STRING
    },  
    device_id:{
        type: Sequelize.STRING
    }, 
    grupo_id:{
        type: Sequelize.INTEGER
    },
    canales:{
        type: Sequelize.INTEGER
    }, 
    ip_registro:{
        type: Sequelize.STRING
    }, 
    puerto_registro:{
        type: Sequelize.STRING
    }, 
    puerto_transmision:{
        type: Sequelize.STRING
    }, 
    linktype:{
        type: Sequelize.STRING
    }, 
    devicetype:{
        type: Sequelize.STRING
    },  
    gpstime :{
        type: Sequelize.STRING
    },
    altitud :{
        type: Sequelize.STRING
    },
    direccion :{
        type: Sequelize.STRING
    },
    velocidad :{
        type: Sequelize.STRING
    },
    time :{
        type: Sequelize.STRING
    },
    lat :{
        type: Sequelize.STRING
    },
    lon :{
        type: Sequelize.STRING
    },
    gpstime :{
        type: Sequelize.STRING
    },    
    est_activo:{
        type: Sequelize.INTEGER
    },       
    fec_rev_tecnica:{
        type: Sequelize.STRING(20)
    },
    fec_per_circulacion:{
        type: Sequelize.STRING(20)
    },  
    fec_seguro:{
        type: Sequelize.STRING(20)
    },  
},
{
    timestamps: true,
    tableName : 'ADAM_unidades'
})





export default ADAM_unidades;
