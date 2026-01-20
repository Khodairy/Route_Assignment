import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";

export const postModel = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    paranoid: false, // hard delete (false)
    timestamps: true, // control createdAt & updatedAt
  },
);
