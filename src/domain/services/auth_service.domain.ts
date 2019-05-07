import { DTO } from "@Shared/dto";
import { User } from "@Domain/user_entity.domain";
import { UserManager } from "@Domain/user_manager.domain";
import UserRepositoryImpl from "@Data/user.repository";
import EncryptorImpl from "@Adapters/encryptor";
import JWTManager from "@Domain/jwt_manager.domain";
import JWTServiceImpl from "@Adapters/jwt_service";
import { JWT } from "@Domain/jwt_entity.domain";
import { LoginDTO } from "@Domain/shared/interfaces";
import { INVALID_CREDENTIALS } from "@Messages";
import config from "@Config";
import BlockRepositoryImpl from "@Data/block.repository";

class AuthService {
  
  private userMangaer = new UserManager(UserRepositoryImpl, EncryptorImpl);
  private jwtManager = new JWTManager(JWTServiceImpl, BlockRepositoryImpl);
  
  public async login(username: string, password: string): Promise<DTO <LoginDTO>> {
    
    const user: User = await this.userMangaer.isLegalUser(username, password);
    
    if (!user) return new DTO(INVALID_CREDENTIALS);
    
    const jwt: JWT = await this.jwtManager.sign(  { id: user.id, roles: user.roles } , config.jwt_exp );
    
    
    return new DTO<LoginDTO>(null, { access_token: jwt.access_token });
  }

  public async validateJWT(jwt): Promise<JWT>{
    const jwtValidated:JWT = await this.jwtManager.validate(jwt);
    return jwtValidated;
  }
}

export default new AuthService();
