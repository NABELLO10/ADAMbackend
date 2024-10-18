import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Region from "./Region.js";


const Provincias = db.define('mae_provincias', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    nom_provincia:{
        type: Sequelize.STRING
    },  
    id_region:{
        type: Sequelize.INTEGER
    },
},
{
    timestamps: false,
    tableName : 'mae_provincias'
})

Provincias.belongsTo(Region, {foreignKey : "id_region"})


export default Provincias