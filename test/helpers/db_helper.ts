import UserModel from "@Data/models/user.model";
import initDb from "@Startup/db.init";
import bcrypt = require("bcrypt");
import arrayToString from "@Utils/array_to_string";
import BlockModel from "@Data/models/block.model";

export const createUser = async (params: {
  password: string,
  roles: Array<string>,
  username:string
}) => {
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(params.password, salt);
  const parramsToSave = {
    username: params.username,
    password: hashedPass,
    roles: arrayToString(params.roles)
  }

  return await UserModel.create(parramsToSave);
};

export const destroyAllUsers = async () => {
  await UserModel.destroy({ where: {}, truncate: true });
};

export const destroyAllBlocks = async () => {
  await BlockModel.destroy({ where: {}, truncate: true });
};

export const initDbForTests = async () => {
  await initDb();
};

export const getBlockInfo = async jti => {
  const block = await BlockModel.findOne({ where: { jti: jti } });
  return block;
};

export const getUser = async params => {
  const user = await UserModel.findOne({ where: { ...params } });

  return user;
};

export const saveBlockToDB = async (jti, blockTime) => {
  const block = await BlockModel.create({
    jti: jti,
    forEver: blockTime.forEver,
    from: blockTime.from,
    to: blockTime.to
  });
};
