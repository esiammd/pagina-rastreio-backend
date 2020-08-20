import { Request, Response } from "express";
import db from "../database/connection";
import verifyPassword from "../utils/verifyPassword";
import generateToken from "../utils/generateToken";

class SessionsController {
  async create(req: Request, res: Response) {
    const { username, password } = req.body;

    const user_admin = await db("user_admin")
      .where("username", username)
      .select("password")
      .first();

    if (!user_admin || !(await verifyPassword(user_admin.password, password))) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    return res
      .status(201)
      .json({ token: generateToken({ id: user_admin.id }) });
  }
}

export default SessionsController;
