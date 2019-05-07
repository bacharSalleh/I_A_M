import { Encryptor } from "@Domain/encryptor.domain";
import bcrypt = require("bcrypt");

class EncryptorImpl implements Encryptor {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(value, salt);
    return hashed;
  }
  async compare(value: string, hashedValue: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(value, hashedValue);
    return isEqual;
  }
}

export default new EncryptorImpl();
