import express from "express";
import SessionsController from "./controllers/SessionsController";

const routes = express.Router();
const sessionsController = new SessionsController();

routes.post("/sessions", sessionsController.create);

export default routes;
