import { Sequelize } from "sequelize";
import db from "../config/db.js";

const HOWEN_unidades = db.define('HOWEN_unidades', {
    deviceno:{
        type: Sequelize.STRING,
        primaryKey:true, 
    }, 
    id_transportista:{
        type: Sequelize.INTEGER
    },          
    nom_transportista:{
        type: Sequelize.STRING
    },          
    devicename:{
        type: Sequelize.STRING
    },  
    fleetname:{
        type: Sequelize.STRING
    }, 
    plateno:{
        type: Sequelize.STRING
    },
    vehicletype:{
        type: Sequelize.STRING
    }, 
    streamserver:{
        type: Sequelize.STRING
    }, 
    longitude:{
        type: Sequelize.STRING
    }, 
    latitude:{
        type: Sequelize.STRING
    }, 
    altitude:{
        type: Sequelize.STRING
    }, 
    speed:{
        type: Sequelize.STRING
    },  
    onlineTime:{
        type: Sequelize.STRING
    },  
    offlineTime:{
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
    tableName : 'HOWEN_unidades'
})





export default HOWEN_unidades;
