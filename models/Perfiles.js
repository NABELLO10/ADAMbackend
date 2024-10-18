import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Empresas from "./Empresas.js";

const Perfiles = db.define('mae_perfiles', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    nom_perfil:{
        type: Sequelize.STRING
    },
    est_activo:{
        type: Sequelize.INTEGER
    },
    id_empresa:{
        type: Sequelize.INTEGER
    },   
},
{
    timestamps: false,
    tableName: 'mae_perfiles'
})

Perfiles.belongsTo(Empresas, {foreignKey : "id_empresa"})

export default Perfiles