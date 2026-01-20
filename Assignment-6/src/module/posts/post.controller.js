import { Router } from "express";
import * as PF from "./post.service.js";
const PostRouter = Router();

PostRouter.post("/", PF.createPost);
PostRouter.delete("/:postId", PF.deletePost);
PostRouter.get("/details", PF.getUsersWithPosts);
PostRouter.get("/comment-count", PF.getPostsWithCommentsCount);

export default PostRouter;
