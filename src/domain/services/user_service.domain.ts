import { UserManager } from "@Domain/user_manager.domain";
import UserRepositoryImpl from "@Data/user.repository";
import EncryptorImpl from "@Adapters/encryptor";
import { DTO } from "@Shared/dto";
import { User } from "@Domain/user_entity.domain";
import {
  CreateUserDTO,
  CreateUser,
  UserAttrsToUpdate,
  UserAttrsToSearch,
  UserParamsToDelete
} from "@Domain/shared/interfaces";
import {
  USERNAME_IS_USED,
  USER_NOT_EXIST,
  INVALID_UPDATE_OPERATION
} from "@Messages";
import Validator from "@Domain/validation/validator.domain";
import { UsernameRule } from "@Domain/validation/username_rule.domain";
import { PasswordRule } from "@Domain/validation/password_rule.domain";
import { RolesRule } from "@Domain/validation/roles_rule.domain";
import { Rule } from "@Domain/validation/rule.domain";

class UserService {
  private userMangaer = new UserManager(UserRepositoryImpl, EncryptorImpl);
  private validator = new Validator();

  public async createUser(params: CreateUser): Promise<DTO<CreateUserDTO>> {
    const isValid = this.validator.validate([
      new UsernameRule(params.username),
      new PasswordRule(params.password),
      new RolesRule(params.roles)
    ]);

    const usernameIsUsed = await this.userMangaer.isUserExist({
      username: params.username
    });

    if (usernameIsUsed) throw Error(USERNAME_IS_USED);

    const userCreated: User = await this.userMangaer.createUser({
      username: params.username,
      password: params.password,
      roles: params.roles
    });

    if (userCreated) return new DTO<CreateUserDTO>(null, { user: userCreated });
  }

  public async updateUser(
    attrsToSearch: UserAttrsToSearch,
    attrsToUpdate: UserAttrsToUpdate
  ) {
    const validationRules: Rule[] = [];
    const valuesToUpate = {};

    if (attrsToUpdate.username) {
      validationRules.push(new UsernameRule(attrsToUpdate.username));
      valuesToUpate["username"] = attrsToUpdate.username;
    }
    if (attrsToUpdate.password) {
      validationRules.push(new PasswordRule(attrsToUpdate.password));
      valuesToUpate["password"] = attrsToUpdate.password;
    }
    if (attrsToUpdate.roles) {
      validationRules.push(new RolesRule(attrsToUpdate.roles));
      valuesToUpate["roles"] = attrsToUpdate.roles;
    }

    if (validationRules.length < 1) throw Error(INVALID_UPDATE_OPERATION);

    this.validator.validate(validationRules);

    const isExist = await this.userMangaer.isUserExist({ ...attrsToSearch });

    if (!isExist) throw Error(USER_NOT_EXIST);

    await this.userMangaer.updataUser(
      { ...attrsToSearch },
      { ...valuesToUpate }
    );
  }


  public async deleteUser(params: UserParamsToDelete) {
    const isExist = await this.userMangaer.isUserExist({
      ...params
    });
    
    if (!isExist) throw Error(USER_NOT_EXIST);


    await this.userMangaer.deleteUser({...params});
  }
}

export default new UserService();
