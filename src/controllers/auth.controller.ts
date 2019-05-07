import { Response, Request } from "express";
import AuthService from "@Domain/services/auth_service.domain";

const login = async (req: Request, res: Response) => {
    
  const { username, password } = req.body;
  const result = await AuthService.login(username, password);

  if (result.error) return res.status(400).send({ error: result.error });

  return res
    .status(200)
    .send({ data: { access_token: result.data.access_token } });
};

export default { login };
