import express from "express";
import { checkConnection } from "./DB/connectionDB.js";
import bookRouter from "./module/book/book.controller.js";
import authorRouter from "./module/author/author.controller.js";
import LogsRouter from "./module/logs/logs.controller.js";
const app = express();
let port = 5000;

const bootstrap = () => {
  app.use(express.json());
  app.get("/", (req, res, next) => {
    res.status(200).json({ message: "Hello in my app.....😊" });
  });
  checkConnection();

  app.use("/collection/book", bookRouter);
  app.use("/collection/author", authorRouter);
  app.use("/collection/logs", LogsRouter);

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
