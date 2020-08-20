import { Request, Response } from "express";
import db from "../database/connection";
import verifyPassword from "../utils/verifyPassword";

class SessionsController {
  async create(req: Request, res: Response) {
    const { username, password } = req.body;

    if (username && password) {
      const user_admin = await db("user_admin")
        .where("username", username)
        .select("password")
        .first();

      if (user_admin && (await verifyPassword(user_admin.password, password))) {
        return res.status(201).send();
      }
    }

    return res.status(401).json({ message: "Incorrect username or password" });
  }
}

export default SessionsController;
