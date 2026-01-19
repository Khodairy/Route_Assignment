import { Sequelize } from "sequelize";

const sequelize = new Sequelize("user_posts", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect to DB Successfully....😊");
    sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const checkSyncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Sync to DB Successfully....😊");
    sequelize.sync({ alter: false, force: false });
  } catch (error) {
    console.error("Unable to Sync to the database:", error);
  }
};
