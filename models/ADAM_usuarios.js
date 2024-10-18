import {DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt"

import generarID from '../helpers/generarID.js'
import db from "../config/db.js";

//para Foreign Keys
import ADAM_perfiles from "./ADAM_perfiles.js"


const ADAM_usuarios = db.define('ADAM_usuarios', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    nom_usuario:{
        type: Sequelize.STRING,
        required: true
    },
    password:{
        type: Sequelize.STRING,
        required: true
    },
    email : {
        type: Sequelize.STRING, required: true
    },
    id_empresa:{
        type:Sequelize.INTEGER
    },
    token:{
        type: Sequelize.STRING,
        defaultValue: generarID(),
    },
    confirmado:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    id_perfil:{
        type: Sequelize.INTEGER,
    },
    est_activo:{
        type: Sequelize.INTEGER,        
    },
    user_add:{
        type: Sequelize.STRING
    },    
    fec_add:{
       type: DataTypes.DATE,        

    },
    est_adam:{
        type: Sequelize.INTEGER,        
    }    

},{  
    timestamps: true,
    tableName : 'ADAM_usuarios' ,
    hooks:{
        async beforeCreate(user){                
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(user.password, salt)
            user.password = hash            
        }       
    }    
})

//agregando foreign key
ADAM_usuarios.belongsTo(ADAM_perfiles, { foreignKey: 'id_perfil'})



export default ADAM_usuarios