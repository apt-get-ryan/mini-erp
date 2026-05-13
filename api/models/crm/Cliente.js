import db from "../../database/database.js";
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
    },

    pais: {
      type: DataTypes.STRING,
      defaultValue: "BR"
    },

    estado: {
      type: DataTypes.STRING,
    },

    cidade: {
      type: DataTypes.STRING,
    },

    bairro: {
      type: DataTypes.STRING,
    },

    logradouro: {
      type: DataTypes.STRING,
    },

    // cep: {
    //   type: DataTypes.STRING(),
    //   allowNull: true
    // },

    endereco: {
      type: DataTypes.STRING,
    },

    dadosEnderecamento: {
      type: DataTypes.VIRTUAL,
      get: () => {
        return {
          estado: this.estado,
          cidade: this.cidade,
          bairro: this.bairro,
          logradouro: this.logradouro,
          endereco: this.endereco,
        }
      }
    }
  }
);


export default Cliente;