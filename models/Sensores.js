
import { Sequelize } from "sequelize";
import db from "../config/db.js";

const Sensores = db.define(
  "mov_oxigenacion",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    patente: {
      type: Sequelize.STRING(2000),
    },
    id_wialon: {
      type: Sequelize.INTEGER,
    },
    fechaGPS: {
      type: Sequelize.STRING(200),
    },
    fechaDato: {
      type: Sequelize.STRING(200),
    },
    nomSensor: {
      type: Sequelize.STRING(200),
    },
    velocidad: {
      type: Sequelize.STRING(200),
    },
    latitud: {
      type: Sequelize.STRING(200),
    },
    longitud: {
      type: Sequelize.STRING(200),
    },
    curso: {
      type: Sequelize.STRING(200),
    },
    altitud: {
      type: Sequelize.STRING(200),
    },
    ox1: {
      type: Sequelize.STRING(200),
    },
    ox2: {
      type: Sequelize.STRING(200),
    },
    ox3: {
      type: Sequelize.STRING(200),
    },
    ox4: {
      type: Sequelize.STRING(200),
    },
    ox5: {
      type: Sequelize.STRING(200),
    },
    ox6: {
      type: Sequelize.STRING(200),
    },
    ox7: {
      type: Sequelize.STRING(200),
    },
    ox8: {
      type: Sequelize.STRING(200),
    },
    ox9: {
      type: Sequelize.STRING(200),
    },
    ox10: {
      type: Sequelize.STRING(200),
    },

    temp: {
      type: Sequelize.STRING(200),
    },
    ox11: {
      type: Sequelize.STRING(200),
    },
    ox12: {
      type: Sequelize.STRING(200),
    },   
    fecha: {
      type: Sequelize.STRING(200),
    },
    fechaRegistro: {
      type: Sequelize.DATE, // O Sequelize.DATETIME si también quieres la hora
      defaultValue: Sequelize.NOW,
    },
    est_alerta: {
      type: Sequelize.INTEGER,
    },
    fec_gps: {
      type: Sequelize.STRING(200),
    },
  },
  {
    timestamps: false,
    tableName: "mov_oxigenacion",
  }
);


export default Sensores

