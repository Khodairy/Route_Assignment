import { Router } from "express";
import * as AC from "./author.service.js";

const authorRouter = Router();

authorRouter.post("/", AC.createAuthor);

export default authorRouter;
