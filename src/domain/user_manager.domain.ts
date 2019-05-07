import { UserRepository } from "@Domain/user_repository.domain";
import { User } from "@Domain/user_entity.domain";
import { Encryptor } from "@Domain/encryptor.domain";
import {
  CreateUser,
  UserSearchParams,
  UserAttrsToUpdate,
  UserAttrsToSearch,
  UserParamsToDelete
} from "@Domain/shared/interfaces";

export class UserManager {
  
  private repo: UserRepository;
  private encryptor: Encryptor;

  constructor(repo: UserRepository, encryptor: Encryptor) {
    this.repo = repo;
    this.encryptor = encryptor;
  }

  async createUser(params: CreateUser): Promise<User> {
    const hashedPassword = await this.encryptor.hash(params.password);

    const userSaved = await this.repo.save(
      params.username,
      hashedPassword,
      params.roles
    );

    return new User({
      id: userSaved.id,
      username: userSaved.username,
      password: params.password,
      email: userSaved.email,
      roles: userSaved.roles
    });
  }

  async isUserExist(params: UserSearchParams): Promise<boolean> {
    const userExist = await this.repo.findUser({ ...params });
    if (userExist) return true;
    return false;
  }

  async isLegalUser(username: string, password: string) {
    const user = await this.repo.findUser({ username: username });

    if (!user) return null;

    const isPasswordCorrect = await this.encryptor.compare(
      password,
      user.password
    );

    if (isPasswordCorrect) return user;

    return null;
  }

  async updataUser(
    attrsToSearch: UserAttrsToSearch,
    attrsToUpdate: UserAttrsToUpdate
  ) {
    let hashedPassword;
    let valuesToUpdate = {...attrsToUpdate};
   
    if (attrsToUpdate.password) {
      hashedPassword = await this.encryptor.hash(attrsToUpdate.password);
      valuesToUpdate = { ...valuesToUpdate, password: hashedPassword };
    }
    await this.repo.update({ ...attrsToSearch }, valuesToUpdate);
  }

  async deleteUser(params: UserParamsToDelete) {
    await this.repo.delete({...params});
  }
}
