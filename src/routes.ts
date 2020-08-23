import express from "express";
import SessionsController from "./controllers/SessionsController";
import UploadsFileController from "./controllers/UploadsFileController";

import upload from "./config/multer";
import authMiddleware from "./middlewares/auth";

const routes = express.Router();

const sessionsController = new SessionsController();
const uploadsFileController = new UploadsFileController();

routes.post("/sessions", sessionsController.create);

routes.post(
  "/uploads",
  upload.single("file"),
  authMiddleware,
  uploadsFileController.create
);

export default routes;
