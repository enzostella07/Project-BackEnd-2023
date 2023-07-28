import express from "express";
import { userService } from "../services/users.service.js";
import userController from "../controller/users.controller.js"
export const usersRouter = express.Router();

usersRouter.get("/",  userController.getAll);
