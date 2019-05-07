import { Rule } from "@Domain/validation/rule.domain";
import { ValidationOps } from "@Domain/validation/validation_ops.domain";
import {
  USERNAME_IS_REQUIRED,
  USERNAME_IS_STRING,
  USERNAME_LENGTH,
  USERNAME_SPECIAL_CHAR,
  USERNAME_CHAR,
  USERNAME_NO_CHARS
} from "@Messages";

export class UsernameRule implements Rule {
  private validationOps: ValidationOps;
  private value: string;

  constructor(value: string, validationOps?: ValidationOps) {
    if (validationOps) this.validationOps = validationOps;
    this.value = value;
  }

  apply() {
    if (typeof this.value != "string") throw Error(USERNAME_IS_STRING);
    if (this.value.length == 0) throw Error(USERNAME_IS_REQUIRED);
    if (/[-\s]+/.test(this.value)) throw Error(USERNAME_NO_CHARS);
    if (this.value.length < 8 || this.value.length > 30)
      throw Error(USERNAME_LENGTH);
    if (!/[a-zA-Z]{1}/.test(this.value)) throw Error(USERNAME_CHAR);
    if (!/[!@#$%^&*?~_]{1}/.test(this.value))
      throw Error(USERNAME_SPECIAL_CHAR);

    return true;
  }
}
