import mongoose from "mongoose";

const checkConnection = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/myNewApp", {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("DB connected successfully.....😍");
    })
    .catch((error) => {
      console.log("DB connected Failed.....😢");
    });
};

export default checkConnection;
