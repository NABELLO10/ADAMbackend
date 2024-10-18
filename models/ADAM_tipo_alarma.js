import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const ADAM_tipo_alarma = db.define('ADAM_tipo_alarma', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    id_tipo:{
        type: Sequelize.INTEGER
    },   

    nombre_tipo_alarma:{
        type: Sequelize.STRING
    },
    
    est_activo:{
        type: Sequelize.INTEGER
    }, 
},
{
    timestamps: false,
    tableName : 'ADAM_tipo_alarma'
})


export default ADAM_tipo_alarma;

/*
Type Center description Description
1 video loss video loss
2 motion detection motion detection
3 cover Cover
4 storage exception storage exception
5 IO1 IO1
6 IO2 IO2
7 IO3 IO3
8 IO4 IO4
9 IO5 IO5
10 IO6 IO6
11 IO7 IO7
12 IO8 IO8
13 panic alarm panic alarm
14 low-speed low-speed
15 high-speed high-speed
16 low voltage low voltage
17 ACC ACC
18 fence Fence
19 illegal ignition illegal ignition
20 illegal shutdown illegal shutdown
29 temperature alarm temperature alarm
36 Collision alarm Near Distance alarm
38 Lane departure alarm Lane departure alarm
47 Abnormal temperature changes
alarm
Abnormal temperature changes
58 DSM fatigue driving DSM fatigue driving
59 DSM no driver DSM no driver
60 DSM driver call up DSM driver call
61 DSM driver smoking DSM driver smoking
62 DSM driver distraction DSM driver distraction
63 DSM lane departure alarm DSM lane departure alarm
64 DSM previous car collision DSM previous car collision
74 Abnormal boot up Abnormal boot
81 Idle switch door alarm Idle switch door alarm
160 DSM overspeed alarm DSM overspeed alarm
161 DSM license plate recognition DSM license plate recognition
162 DSM distance too close alarm DSM distance too close alarm*/