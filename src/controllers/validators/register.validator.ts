import { body } from "express-validator/check";
import {
  USERNAME_IS_REQUIRED,
  USERNAME_LENGTH,
  PASSWORD_IS_REQUIRED,
  PASSWORD_LENGTH,
  PASSWORD_SPECIAL_CHAR,
  USERNAME_IS_STRING,
  PASSWORD_IS_STRING
} from "@Messages";

export default () => {
  return [
    body("username", USERNAME_IS_REQUIRED)
      .trim()
      .exists()
      .escape(),
    body("username", USERNAME_IS_STRING)
      .trim()
      .isString(),
    body("username", USERNAME_LENGTH).isLength({ min: 8, max: 30 }),
    body("password", PASSWORD_IS_REQUIRED)
      .trim()
      .exists()
      .escape(),
    body("password", PASSWORD_IS_STRING)
      .trim()
      .isString(),
    body("password", PASSWORD_LENGTH).isLength({ min: 6, max: 30 }),
    body("password", PASSWORD_SPECIAL_CHAR).matches(/^.*([!@#$%^&]+).*$/)
  ];
};
