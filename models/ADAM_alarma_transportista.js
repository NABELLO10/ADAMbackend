import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";
import Transportistas from '../models/Transportistas.js'
import ADAM_tipo_alarma from '../models/ADAM_tipo_alarma.js'

const ADAM_alarma_transportista = db.define('ADAM_alarma_transportista', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    id_transportista:{
        type: Sequelize.INTEGER
    },   

    id_tipo_alarma:{
        type: Sequelize.INTEGER
    },   
},
{
    timestamps: true,
    tableName : 'ADAM_alarma_transportista'
})


ADAM_alarma_transportista.belongsTo(Transportistas, {foreignKey : "id_transportista"})



export default ADAM_alarma_transportista;