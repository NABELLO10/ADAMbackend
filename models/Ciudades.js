import { Sequelize } from "sequelize";
import db from "../config/db.js";

import Provincias from "./Provincias.js";

const Ciudades = db.define('mae_comunas',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nom_comuna:{
        type: Sequelize.STRING
    },
    id_provincia:{
        type: Sequelize.INTEGER
    }
},
{
    timestamps: false,
    tableName: 'mae_comunas'
})

Ciudades.belongsTo(Provincias, {foreignKey : "id_provincia"})

export default Ciudades
