import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Transportistas from "./Transportistas.js";
import EmpresasSistema from "./EmpresasSistema.js";
import CatNotificacion from "./CatNotificacion.js";

const TipoNotificacion = db.define('mae_tipo_notificacion', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    id_cat_not:{
        type: Sequelize.INTEGER
    },
    val_min:{
        type: Sequelize.STRING(100)
    },
    val_max:{
        type: Sequelize.STRING(100)
    },
    obs:{
        type: Sequelize.TEXT
    },   
    est_activo:{
        type: Sequelize.INTEGER
    },   
    id_empresa:{
        type: Sequelize.INTEGER
    },
    id_empresa_sistema:{
        type: Sequelize.INTEGER
    },
    id_transportista:{
        type: Sequelize.INTEGER
    },
},
{
    timestamps: false,
    tableName: 'mae_tipo_notificacion'
})

TipoNotificacion.belongsTo(Transportistas, {foreignKey : "id_transportista"})
TipoNotificacion.belongsTo(EmpresasSistema, {foreignKey : "id_empresa_sistema"})
TipoNotificacion.belongsTo(CatNotificacion, {foreignKey : "id_cat_not"})


export default TipoNotificacion