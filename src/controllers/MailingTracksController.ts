import { Request, Response } from "express";
import { rastro } from "rastrojs";
import db from "../database/connection";

class MailingTracksController {
  async index(req: Request, res: Response) {
    const { cpf } = req.query;

    const userId = await db("users")
      .where("cpf", String(cpf))
      .select("id")
      .first();

    if (!userId) {
      return res.status(404).json({ error: "CPF not found" });
    }

    const trackingCodes = (
      await db("mailings").where("user_id", userId.id).select("tracking_code")
    ).map((item) => {
      return item.tracking_code;
    });

    const tracks = await rastro.track(trackingCodes);

    return res.status(200).json(tracks);
  }

  async show(req: Request, res: Response) {
    const { code } = req.params;

    const [track] = await rastro.track(String(code));

    return res.status(200).json(track.tracks);
  }
}

export default MailingTracksController;
