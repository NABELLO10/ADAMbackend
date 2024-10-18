import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Empresas from "./Empresas.js";
import Ciudades from "./Ciudades.js";
const EmpresasSistema = db.define('mae_empresas_sistema', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    rut_empresa:{
        type: Sequelize.STRING(20)
    },
    nom_empresa:{
        type: Sequelize.TEXT
    },
    cod_ciudad:{
        type: Sequelize.INTEGER
    },
    direccion:{
        type: Sequelize.TEXT
    },
    est_activo:{
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    id_empresa:{
        type: Sequelize.INTEGER
    }     
},
{
    timestamps: false,
    tableName: 'mae_empresas_sistema'
})

EmpresasSistema.belongsTo(Empresas, {foreignKey : "id_empresa"})
EmpresasSistema.belongsTo(Ciudades, {foreignKey : "cod_ciudad"})


export default EmpresasSistema