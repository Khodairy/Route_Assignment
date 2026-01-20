import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
export const userModel = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,

    // =================== cheack the length of name =============
    validate: {
      checkNameLength(value) {
        if (value.length <= 3) {
          throw new Error("the name length must be greater than 2 characters");
        }
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // =================== cheack the length of the password =============
    validate: {
      checkPasswordLength(value) {
        if (value.length <= 6) {
          throw new Error(
            "the password length must be greater than 6 characters",
          );
        }
      },
    },
  },
  role: { type: DataTypes.ENUM("user", "admin") },
  age: {
    type: DataTypes.INTEGER,
    validate: { min: 0 },
  },
});
