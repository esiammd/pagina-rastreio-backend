import express from "express";
import SessionsController from "./controllers/SessionsController";
import MailingListController from "./controllers/MailingListController";
import MailingTracksController from "./controllers/MailingTracksController";

import upload from "./config/multer";
import authMiddleware from "./middlewares/auth";

const routes = express.Router();

const sessionsController = new SessionsController();
const mailingListController = new MailingListController();
const mailingTracksController = new MailingTracksController();

routes.post("/sessions", sessionsController.create);

routes.post(
  "/uploads",
  upload.single("file"),
  authMiddleware,
  mailingListController.create
);

routes.get("/tracks", mailingTracksController.index);

export default routes;
