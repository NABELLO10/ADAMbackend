import { Sequelize } from "sequelize";
import db from "../config/db.js";
import EmpresasSistema from "./EmpresasSistema.js";


const Conductores = db.define('mae_conductores', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    rut:{
        type: Sequelize.STRING
    }, 
    nombre:{
        type: Sequelize.STRING
    }, 

    ape_paterno:{
        type: Sequelize.STRING
    },

    ape_materno:{
        type: Sequelize.STRING
    }, 

    fono:{
        type: Sequelize.STRING
    }, 

    email:{
        type: Sequelize.STRING
    }, 

    est_activo:{
        type: Sequelize.INTEGER
    },

    id_empresa:{
        type: Sequelize.INTEGER
    },
    
    id_empresa_global:{
        type: Sequelize.INTEGER
    },
},
{
    timestamps: false,
    tableName : 'mae_conductores'
})

Conductores.belongsTo(EmpresasSistema, {foreignKey : "id_empresa"})

export default Conductores