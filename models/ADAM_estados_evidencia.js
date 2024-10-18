import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

import Transportista from "./Transportistas.js";

const ADAM_estados_evidencia = db.define('ADAM_estados_evidencia', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    nombre_estado:{
        type: Sequelize.STRING
    },  
  
    id_transportista:{
        type: Sequelize.INTEGER,     
    },     
    color:{
        type: Sequelize.STRING
    },  
    nom_kpi:{
        type: Sequelize.STRING
    },  

},
{
    timestamps: true,
    tableName : 'ADAM_estados_evidencia'
})

ADAM_estados_evidencia.belongsTo(Transportista, {foreignKey : "id_transportista"})

export default ADAM_estados_evidencia;
