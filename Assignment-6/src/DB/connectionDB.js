import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("User_posts", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect to DB Successfully....😊");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const checkSyncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Sync to DB Successfully....😊");
    await sequelize.sync({ alter: false });
  } catch (error) {
    console.error("Unable to Sync to the database:", error);
  }
};
