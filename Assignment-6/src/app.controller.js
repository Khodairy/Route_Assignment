import express from "express";
import { checkConnection, checkSyncDB } from "./DB/connectionDB.js";
import "./DB/relations.js";
import userRouter from "./module/users/user.controller.js";
import PostRouter from "./module/posts/post.controller.js";
import commentRouter from "./module/comments/comment.controller.js";
const app = express();
let port = 5000;

const bootstrap = () => {
  checkConnection();
  checkSyncDB();
  app.use(express.json());
  app.get("/", (req, res, next) => {
    res.status(200).json({ message: "Hello in my app.....😊" });
  });

  app.use("/user", userRouter);
  app.use("/posts", PostRouter);
  app.use("/comments", commentRouter);

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
