import { Request, Response } from "express";
import UserService from "@Domain/services/user_service.domain";

const create = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const result = await UserService.createUser(username, password, []);

  if (result.error) return res.status(400).send({ error: result.error });

  return res.status(201).send({
    data: result.data.user
  });
};

export default { create };
