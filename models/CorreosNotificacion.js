import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

import TipoNotificacion from "./TipoNotificacion.js";
import Transportistas from "./Transportistas.js";
import EmpresasSistema from "./EmpresasSistema.js";

const CorreosNotificacion = db.define('mov_correos_notificaciones', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    id_notificacion:{
        type: Sequelize.INTEGER
    },
    id_transportista:{
        type: Sequelize.INTEGER
    },
    correos:{
        type: DataTypes.TEXT
    },
    asunto:{
        type: DataTypes.STRING(100)
    },
    mensaje:{
        type: DataTypes.TEXT
    },
    est_activo:{
        type: DataTypes.INTEGER
    },
    id_empresa:{
        type: DataTypes.INTEGER
   },
    id_empresa_sistema:{
        type: DataTypes.INTEGER
    }
    
},
{
    timestamps: false,
    tableName: 'mov_correos_notificaciones'
})

CorreosNotificacion.belongsTo(TipoNotificacion, {foreignKey : "id_notificacion"})
CorreosNotificacion.belongsTo(Transportistas, {foreignKey : "id_transportista"})
CorreosNotificacion.belongsTo(EmpresasSistema, {foreignKey : "id_empresa_sistema"})

export default CorreosNotificacion