import { Router } from "express";
import * as CF from "./comment.service.js";
const commentRouter = Router();

commentRouter.post("/", CF.createComments);
commentRouter.patch("/:commentId", CF.updateComment);
commentRouter.post("/find-or-create", CF.find_or_create);
commentRouter.get("/search", CF.getBySearch);
commentRouter.get("/newest/:postId", CF.getNewestPosts);
commentRouter.get("/details/:id", CF.getCommentDetails);

export default commentRouter;
