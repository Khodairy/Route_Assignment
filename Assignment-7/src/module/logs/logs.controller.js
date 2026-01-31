import { Router } from "express";
import * as LC from "./logs.service.js";

const LogsRouter = Router();

LogsRouter.post("/", LC.createLogs);

export default LogsRouter;
