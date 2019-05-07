import { User } from "@Domain/user_entity.domain";

export interface CreateUserDTO {
  user: User;
}
export interface LoginDTO {
  access_token: string;
}
export interface BlockedDTO {
  jti: string;
  forEver: boolean;
  from?: Date;
  to?: Date;
}

export interface CreateUser {
  username: string;
  password: string;
  roles: string[];
}

export interface UserAttrsToUpdate {
  username?: string;
  password?: string;
  roles?: string[];
}

export interface UserSearchParams {
  id?: number;
  username?: string;
}
export interface UserAttrsToSearch {
  id: number;
}
export interface UserParamsToDelete {
  id: number;
}
