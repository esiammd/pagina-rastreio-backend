import { Request, Response } from "express";
import { rastro } from "rastrojs";
import moment from "moment";
import formatFirstUpperCase from "../utils/formatFirstUpperCase";
import db from "../database/connection";

class MailingTracksController {
  async index(req: Request, res: Response) {
    const { cpf } = req.query;

    const userId = await db("users")
      .where("cpf", String(cpf))
      .select("id", "name")
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

    // const estadoAtual = tracks.map((track) => {
    //   track.tracks?.map((item) => {
    //     if (item.trackedAt === track.updatedAt) {
    //       console.log(`Objeto: ${track.code} | Status: ${item.status}`);
    //     }
    //   });
    // });

    return res.status(200).json({ user: userId.name, tracks });
  }

  async show(req: Request, res: Response) {
    function formatCityState(text: string) {
      if (text !== null) {
        const [city, state] = text.split("/");

        return (
          city.trimRight() +
          "/" +
          (state.slice(0, 3).toUpperCase() + state.substr(3)).trimLeft()
        );
      }
    }

    const { code } = req.params;

    const [track] = await rastro.track(String(code));

    const formatTrack = track.tracks?.map((item) => {
      const locale = formatFirstUpperCase(item.locale);

      const observation =
        item.observation && formatFirstUpperCase(item.observation);

      return {
        locale: formatCityState(item.locale),
        status: item.status.toUpperCase(),
        observation: formatCityState(observation),
        date: moment(item.trackedAt).format("DD/MM/YYYY"),
        hour: moment(item.trackedAt).format("HH:mm"),
      };
    });

    return res.status(200).json(formatTrack);
  }
}

export default MailingTracksController;
