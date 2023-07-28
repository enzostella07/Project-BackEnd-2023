import express from "express";
import userApiController from "../controller/users-api.controller.js"
export const usersApiRouter = express.Router();

usersApiRouter.get("/", userApiController.getAll);

usersApiRouter.post("/", userApiController.createUser);

usersApiRouter.put("/:_id", userApiController.updateUser);

usersApiRouter.delete("/:_id", userApiController.deleteUser);
