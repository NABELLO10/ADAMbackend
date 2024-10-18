import { Sequelize } from "sequelize";
import db from "../config/db.js";

import EmpresasSistema from "./EmpresasSistema.js";



const Transportista = db.define('mae_transportistas', {
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
    tableName : 'mae_transportistas'
})

Transportista.belongsTo(EmpresasSistema, {foreignKey : "id_empresa"})

export default Transportista