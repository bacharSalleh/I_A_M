import { Rule } from "@Domain/validation/rule.domain";
import { ValidationOps } from "@Domain/validation/validation_ops.domain";
import {
  ROLES_IS_ARRAY,
  ROLES_CONTAIN_VALUE,
  ROLES_VALUES_IS_STRINGS,
  ROLES_LENGTH,
  ROLE_CHARS_LENGTH
} from "@Messages";

export class RolesRule implements Rule {
  private validationOps: ValidationOps;
  private value: Array<string>;

  constructor(value: Array<string>, validationOps?: ValidationOps) {
    if (validationOps) this.validationOps = validationOps;

    this.value = value;
  }

  apply() {
    if (!Array.isArray(this.value)) throw Error(ROLES_IS_ARRAY);

    if (this.value.length == 0) throw Error(ROLES_CONTAIN_VALUE);

    this.value.forEach(role => {
      if (typeof role != "string") throw Error(ROLES_VALUES_IS_STRINGS);
      if (!/^[A-Z]{1,30}$/.test(role)) throw Error(ROLE_CHARS_LENGTH);
    });

    if (this.value.length < 1 || this.value.length > 15)
      throw Error(ROLES_LENGTH);

    return true;
  }
}
