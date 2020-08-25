import { Request, Response } from "express";
import { rastro } from "rastrojs";
import db from "../database/connection";

class MailingTracksController {
  async index(req: Request, res: Response) {
    const { cpf } = req.query;

    const [userId] = await db("users").where("cpf", cpf).select("id");

    if (!userId) {
      return res.status(404).json({ error: "CPF not found" });
    }

    const trackingCodes = (
      await db("mailings").where("user_id", userId.id).select("tracking_code")
    ).map((item) => {
      return item.tracking_code;
    });

    const tracks = (await rastro.track(trackingCodes)).filter((item) => {
      if (!item.error) {
        return item;
      }
    });

    return res.status(200).json(tracks);
  }
}

export default MailingTracksController;
