import express from "express";
import mailController from "../controller/mail.controller.js";
export const mailRouter = express.Router();

mailRouter.post('/send', mailController.sendMail);
