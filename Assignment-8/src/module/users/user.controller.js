import { Router } from "express";
import * as US from "./user.service.js";
import { hashAndEncrypt } from "../../middleware/hash-encrypt.js";
import { auth } from "../../middleware/auth.js";

const userRouter = Router();

userRouter.post("/signup", hashAndEncrypt, US.signUp);
userRouter.post("/login", US.login);
userRouter.patch("/", auth, US.update);
userRouter.delete("/", auth, US.deleting);
userRouter.get("/", auth, US.getUser);

export default userRouter;
