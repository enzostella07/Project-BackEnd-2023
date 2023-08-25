import homeController from "../controller/home.controller.js";
import express from "express";
export const home = express.Router();

home.get("/", homeController.homeTitle);
home.get("/loggertest", homeController.getLoggertest);
