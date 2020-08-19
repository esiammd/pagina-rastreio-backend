import { Request, Response } from "express";
import db from "../database/connection";

export default class UsersController {
  async index(req: Request, res: Response) {
    const users = await db("users").select("*");

    return res.json(users);
  }

  async create(req: Request, res: Response) {
    const user = req.body;

    const [user_id] = await db("users").insert(user);

    return res.json(user_id);
  }
}
