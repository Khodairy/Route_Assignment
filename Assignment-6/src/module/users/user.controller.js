import { Router } from "express";
import * as UF from "./user.service.js";
const userRouter = Router();

userRouter.post("/signup", UF.createUser);
userRouter.put("/:id", UF.update_or_created_user_by_id);
userRouter.get("/by-email", UF.getUserByEmail);
userRouter.get("/:id", UF.getUserById);

export default userRouter;
