import express from 'express';
import passport from 'passport';
import sessionController from '../controller/session.controller.js';
export const sessionRouter = express.Router();

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), sessionController.callBack);

sessionRouter.get("/login", sessionController.loginGet);

sessionRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), sessionController.loginPost);

sessionRouter.get("/register", sessionController.registerGet);

sessionRouter.post('/register', passport.authenticate('register', { failureRedirect: '/' }), sessionController.register);

sessionRouter.get('/logout', sessionController.logout);

sessionRouter.get('/current', sessionController.current);
