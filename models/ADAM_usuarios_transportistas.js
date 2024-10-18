import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";
import ADAM_usuarios from '../models/ADAM_usuarios.js'
import Transportistas from '../models/Transportistas.js'

const ADAM_usuarios_transportistas = db.define('ADAM_usuarios_transportistas', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    id_usuario:{
        type: Sequelize.INTEGER
    },   

    id_transportista:{
        type: Sequelize.INTEGER
    },   
},
{
    timestamps: true,
    tableName : 'ADAM_usuarios_transportistas'
})


ADAM_usuarios_transportistas.belongsTo(ADAM_usuarios, {foreignKey : "id_usuario"})
ADAM_usuarios_transportistas.belongsTo(Transportistas, {foreignKey : "id_transportista"})



export default ADAM_usuarios_transportistas;