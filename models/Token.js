import { Sequelize } from "sequelize";
import db from "../config/db.js";

const Token = db.define('mae_token', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    usuario:{
        type: Sequelize.STRING(100)
    },
    token:{
        type: Sequelize.STRING(2000)
    },      
    fec_add:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
},
{
    timestamps: true, // Esto activa el seguimiento de createdAt y updatedAt
    createdAt: false, // Esto desactiva la creación del campo createdAt
    updatedAt: 'fec_add', // Esto mapea el campo updatedAt a fec_add en tu base de datos
    tableName: 'mae_token'
})




export default Token