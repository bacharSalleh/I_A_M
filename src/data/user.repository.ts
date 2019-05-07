import { UserRepository } from "@Domain/user_repository.domain";
import { User } from "@Domain/user_entity.domain";
import UserModel from "@Data/models/user.model";
import stringToArray from "@Utils/string_to_array";
import { UserAttrsToUpdate, UserAttrsToSearch, UserParamsToDelete } from "@Domain/shared/interfaces";
import arrayToString from "@Utils/array_to_string";

class UserRepositoryImpl implements UserRepository {
 
  
  async save(
    username: string,
    password: string,
    roles: string[]
  ): Promise<User> {

    const rolesToSave = arrayToString(roles);

    const userSaved = await UserModel.create({
      username: username,
      password: password,
      roles: rolesToSave
    });

    const rolesFromDB = stringToArray(userSaved.roles, ",");

    return new User({
      id: userSaved.id,
      username: userSaved.username,
      password: userSaved.password,
      email: userSaved.email,
      roles: rolesFromDB
    });
  }

  async findUser(params: any): Promise<User> {
    const userFound = await UserModel.findOne({ where: { ...params } });
    if (!userFound) return null;

    const roles = stringToArray(userFound.roles, ",");

    return new User({
      id: userFound.id,
      username: userFound.username,
      password: userFound.password,
      email: userFound.email,
      roles: roles
    });
  }

  async update(attrsToSearch: UserAttrsToSearch, attrsToUpadate: UserAttrsToUpdate) {
    let roles;
    let valuesToUpdate = {...attrsToUpadate};
    

    if(attrsToUpadate.roles){
     roles = arrayToString(attrsToUpadate.roles);
      valuesToUpdate = {...valuesToUpdate, roles};
    }

    
    await UserModel.update({...valuesToUpdate}, {where: {...attrsToSearch}})
  }


  async delete(params: UserParamsToDelete) {
    await UserModel.destroy({where: {...params}})
  }
}

export default new UserRepositoryImpl();
