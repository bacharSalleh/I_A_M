import { Result } from "express-validator/check";

export default (validationResult: Result<any>) => {
  return validationResult.array().reduce((acc, { msg, param }) => {
    const singleErr = {};

    singleErr[param] = msg;

    acc.push(singleErr);

    return acc;
  }, []);
};
