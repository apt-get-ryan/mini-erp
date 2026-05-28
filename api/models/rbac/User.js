import { DataTypes } from "sequelize";
import db from "@/database/database.js";

const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "E-mail inválido."
      },
      len: {
        args: [5, 255],
        msg: "O e-mail deve ter entre 5 e 255 caracteres."
      }
    }
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING(50),
    validate: {
      len: {
        args: [5, 50],
        msg: "O login deve ter entre 5 e 50 caracteres."
      }
    },
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(72),
    validate: {
      len: {
        args: [5, 72],
        msg: "A senha deve ter entre 5 e 72 caracteres."
      }
    },
    allowNull: false,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verification_code: {
    type: DataTypes.STRING
  },
  token_version: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: "users",
  timestamps: true,
  
});


export default User;