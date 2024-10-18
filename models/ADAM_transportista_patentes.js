import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";
import Transportistas from '../models/Transportistas.js'
import ADAM_unidades from '../models/ADAM_unidades.js'

const ADAM_transportista_patentes = db.define('ADAM_transportista_patentes', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    id_transportista:{
        type: Sequelize.INTEGER
    },   

    id_unidad:{
        type: Sequelize.INTEGER
    },   
},
{
    timestamps: true,
    tableName : 'ADAM_transportista_patentes'
})


ADAM_transportista_patentes.belongsTo(Transportistas, {foreignKey : "id_transportista"})
ADAM_transportista_patentes.belongsTo(ADAM_unidades, {foreignKey : "id_unidad"})



export default ADAM_transportista_patentes;