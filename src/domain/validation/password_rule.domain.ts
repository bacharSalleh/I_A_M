import { Rule } from "@Domain/validation/rule.domain";
import { ValidationOps } from "@Domain/validation/validation_ops.domain";
import {
  PASSWORD_IS_STRING,
  PASSWORD_IS_REQUIRED,
  PASSWORD_LENGTH,
  PASSWORD_SPECIAL_CHAR,
  PASSWORD_CHAR,
  PASSWORD_NO_CHARS
} from "@Messages";

export class PasswordRule implements Rule {
  private validationOps: ValidationOps;
  private value: string;

  constructor(value: string, validationOps?: ValidationOps) {
    if (validationOps) this.validationOps = validationOps;
    this.value = value;
  }

  apply() {
    if (typeof this.value != "string") throw Error(PASSWORD_IS_STRING);

    if (this.value.length == 0) throw Error(PASSWORD_IS_REQUIRED);

    if (/[-\s]+/.test(this.value)) throw Error(PASSWORD_NO_CHARS);

    if (this.value.length < 8 || this.value.length > 30)
      throw Error(PASSWORD_LENGTH);

    if (!/[a-zA-Z]{1}/.test(this.value)) throw Error(PASSWORD_CHAR);

    if (!/[!@#$%^&*?~_]{1}/.test(this.value))
      throw Error(PASSWORD_SPECIAL_CHAR);

    return true;
  }
}
