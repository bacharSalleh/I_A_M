import { JWTService } from "@Domain/jwt_service.domain";
import { JWT } from "@Domain/jwt_entity.domain";
import jsonwebtoken = require("jsonwebtoken");
import config from "@Config";
import uuid = require("uuid/v1");

class JWTServiceImpl implements JWTService {
  async validate(jwt, key) {
    const result = await jsonwebtoken.verify(jwt, key);
    return result;
  }

  async sign(payload: any, exp: number): Promise<JWT> {
    const jti = uuid();

    const payloads = { ...payload, jti };

    const token = await jsonwebtoken.sign(payloads, config.JWT_SECRET, {
      expiresIn: exp
    });
    return new JWT(payload.id, token, exp, jti);
  }
}

export default new JWTServiceImpl();
