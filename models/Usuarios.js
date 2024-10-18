import {DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt"

import generarID from '../helpers/generarID.js'
import db from "../config/db.js";

//para Foreign Keys
import Perfiles from "../models/Perfiles.js"
import Empresas from "../models/Empresas.js"


const Usuarios = db.define('mae_usuarios', {
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
       // type: DataTypes.DATE,        
        type: Sequelize.literal('GETDATE()')
    },
    est_adam:{
        type: Sequelize.INTEGER,        
    }    

},{  
    timestamps: false,
    tableName : 'mae_usuarios' ,
    hooks:{
        async beforeCreate(user){   
            console.log('acaaa')       
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(user.password, salt)
            user.password = hash

            
        }       
    }    
})


//agregando foreign key
Usuarios.belongsTo(Perfiles, { foreignKey: 'id_perfil'})
Usuarios.belongsTo(Empresas, { foreignKey: 'id_empresa'}) 


export default Usuarios