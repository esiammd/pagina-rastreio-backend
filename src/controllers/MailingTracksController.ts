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

    const products = (
      await db("mailings")
        .where("user_id", userId.id)
        .select("tracking_code", "product")
    ).map((item) => {
      return { code: item.tracking_code, product: item.product };
    });

    const trackingCodes = products.map((item) => item.code);

    const tracks = await rastro.track(trackingCodes);

    const response = tracks.map((track) => {
      const current = track.tracks?.find(
        (item) => item.trackedAt === track.updatedAt
      );

      return {
        code: track.code,
        product: products.find((item) => item.code === track.code)?.product,
        status: current?.status,
        date: moment(current?.trackedAt).format("DD/MM/YYYY"),
        hour: moment(current?.trackedAt).format("HH:mm"),
      };
    });

    return res.status(200).json({ user: userId.name, tracks: response });
  }

  async show(req: Request, res: Response) {
    function formatCityState(text: string) {
      if (text !== null) {
        const [city, state, state2] = text.split("/");

        const response =
          city.trimRight() +
          "/" +
          (state.slice(0, 3).toUpperCase().trimLeft() + state.substr(3));

        if (state2) {
          return (
            response.trimRight() +
            "/" +
            (state2.slice(0, 3).toUpperCase().trimLeft() + state2.substr(3))
          );
        }
        return response;
      }
    }

    const { code } = req.params;

    const [track] = await rastro.track(String(code));

    const formatTrack = track.tracks?.map((item) => {
      const locale = formatFirstUpperCase(item.locale);

      const observation =
        item.observation && formatFirstUpperCase(item.observation);

      return {
        locale: formatCityState(locale),
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
