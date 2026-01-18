const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

export const userModel = sequelize.define("user", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  fname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: false,
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
  },
  gender: {
    type: DataTypes.ENUM("male", "female"),
  },
  age: {
    type: DataTypes.INTEGER,
    validate: { min: 0 },
  },
});

(async () => {
  await sequelize.sync({ alter: true, force: true });
  // Code here
})();
