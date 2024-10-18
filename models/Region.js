import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Pais from "./Pais.js";


const Region = db.define('mae_region', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    nom_region:{
        type: Sequelize.STRING
    },
    abrev_region:{
        type: Sequelize.STRING
    },
    capital:{
        type: Sequelize.STRING
    },
    id_pais:{
        type: Sequelize.INTEGER
    },
},
{
    timestamps: false,
    tableName : 'mae_region'
})

Region.belongsTo(Pais, {foreignKey : "id_pais"})


export default Region