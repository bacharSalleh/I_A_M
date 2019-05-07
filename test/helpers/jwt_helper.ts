import jsonwebtoken = require("jsonwebtoken");
import bcrypt = require("bcrypt");


export const decode = token => {
  const decoded = jsonwebtoken.decode(token);
  const parsed = <{ [key: string]: any }>decoded;
  return parsed;
};

export const generateJWT = async (payload, key, expInSeconds) => {
  const token = await jsonwebtoken.sign(payload, key, {
    expiresIn: expInSeconds
  });
  return token;
};

export const hashValue = async (value: string) => {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(value, salt)
  return hashed
}


export const compareHashedValues = async (value1, value2) => {
 const isEqual = await bcrypt.compare(value1, value2);
  return isEqual? true: false;
}
