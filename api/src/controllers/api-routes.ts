import { Router } from "express";
import UserController from "@api/controllers/user";

const apiRouter = Router();

apiRouter.use("/user", new UserController().router);

export default apiRouter;
