import { Request, Response } from "express";
import csvtojson from "../utils/csvtojson";
import db from "../database/connection";

class MailingListController {
  async create(req: Request, res: Response) {
    const file = await csvtojson(req.file.filename);

    file.map(async (item) => {
      const trx = await db.transaction();

      try {
        const user = await db("users")
          .where("cpf", item.CPF)
          .select("id", "email")
          .first();

        if (!user) {
          const [user_id] = await trx("users")
            .insert({
              cpf: item.CPF,
              name: item.NOME,
              email: item.EMAIL,
            })
            .returning("id");

          await trx("mailings").insert({
            user_id,
            tracking_code: item.COD_RAST,
            product: item.NOME_PROD,
          });
        } else {
          await trx("users").where("id", user.id).update({ email: item.EMAIL });
          await trx("mailings").insert({
            user_id: user.id,
            tracking_code: item.COD_RAST,
            product: item.NOME_PROD,
          });
        }
        await trx.commit();
      } catch (error) {
        await trx.rollback();
        return res.status(400).json({
          error: "Unexpected error while processing new file",
        });
      }
    });

    return res.status(201).send();
  }
}

export default MailingListController;
