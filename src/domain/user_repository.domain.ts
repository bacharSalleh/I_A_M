import { User } from "@Domain/user_entity.domain";
import { UserAttrsToUpdate, UserAttrsToSearch, UserParamsToDelete } from "./shared/interfaces";

export interface UserRepository {
  delete(params: UserParamsToDelete);
  update(attrsToSearch: UserAttrsToSearch, attrsToUpadate: UserAttrsToUpdate);
  findUser(params): Promise<User>;
  save(username: string, password: string, roles: string[]): Promise<User>;
}
