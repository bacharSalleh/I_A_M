import { JWTService } from "@Domain/jwt_service.domain";
import { JWT } from "@Domain/jwt_entity.domain";
import { INVALID_SIGNING_DATA, INVALID_TOKEN, BLOCKED_TOKEN } from "@Messages";
import config from "@Config";
import { BlockRepository } from "@Domain/block/block_repository.domain";
import { nowBySeconds } from "@Utils/date_tools";

class JWTManager {
  private jwtService: JWTService;
  private blockRepo: BlockRepository;

  constructor(jwtService: JWTService, blockRepo: BlockRepository) {
    this.jwtService = jwtService;
    this.blockRepo = blockRepo;
  }

  public async sign(payload, exp): Promise<JWT> {
    if (!payload) {
      throw Error(INVALID_SIGNING_DATA);
    }
    const expires = exp ? exp : 60 * 60 * 24;

    const jwt = await this.jwtService.sign(payload, expires);

    return jwt;
  }

  public async validate(jwt: any): Promise<JWT> {
    let result;
    try {
      result = await this.jwtService.validate(jwt, config.JWT_SECRET);
    } catch (error) {
      throw new Error(INVALID_TOKEN);
    }

    if (await this.isJTIBlocked(result.jti)) throw Error(BLOCKED_TOKEN);

    return new JWT(result.id, result.access_token, result.exp, result.jti);
  }

  private async isJTIBlocked(jti: any): Promise<boolean> {
    const isBlocked = await this.blockRepo.isExistBeforeDate(
      jti,
      new Date(nowBySeconds())
    );
    return isBlocked;
  }
}

export default JWTManager;
