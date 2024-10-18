import { Sequelize } from "sequelize";
import db from "../config/db.js";

const Pais = db.define('mae_pais', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    nom_pais:{
        type: Sequelize.STRING
    }
},
{
    timestamps: false,
    tableName: 'mae_pais'
})



export default Pais