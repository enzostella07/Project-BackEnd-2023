import express from "express";
export const testChatRouter = express.Router();
import testChatController from "../controller/test-chat.controller.js"

testChatRouter.get("/", testChatController.testChat);
