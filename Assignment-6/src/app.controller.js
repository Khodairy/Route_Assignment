import express from "express";
import { checkConnection } from "./DB/connectionDB.js";
import userRouter from "./module/users/user.controller.js";
const app = express();
let port = 5000;

const bootstrap = () => {
  checkConnection();
  app.use(express.json());
  app.get("/", (req, res, next) => {
    res.status(200).json({ message: "Hello in my app.....😊" });
  });

  app.use("/user", userRouter);

  app.use("{/*demo}", (req, res, next) => {
    res
      .status(404)
      .json({ message: `404 URL ${req.originalUrl} not found.....😒` });
  });

  app.listen(port, () => {
    console.log(`Server Running in port ${port}`);
  });
};
export default bootstrap;
