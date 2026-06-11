import db from "@/database/database.js";
import { DataTypes } from "sequelize";

const Cliente = db.define(
  "Cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nomeFantasia: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    whatsapp: {
      type: DataTypes.STRING(11),
      allowNull: true
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    instagram: {
      type: DataTypes.STRING(30),
      allowNull: true
    },

    obs: {
      type: DataTypes.STRING(150),
      allowNull: true
    },

    estado: {
      type: DataTypes.STRING,
      allowNull: true
    },

    cidade: {
      type: DataTypes.STRING,
      allowNull: true
    },

    bairro: {
      type: DataTypes.STRING,
      allowNull: true
    },

    logradouro: {
      type: DataTypes.STRING,
      allowNull: true
    },

    endereco: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
  },
  {
    tableName: "clientes",
    timestamps: true
  }
);


export default Cliente;