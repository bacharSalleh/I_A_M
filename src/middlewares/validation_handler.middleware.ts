import express = require("express");
import validationResultFormatter from "@Utils/validation_result_formatter";

export default async (req: express.Request, res: express.Response, next) => {
  const validationResult = await req.getValidationResult();

  if (validationResult.isEmpty()) return next();

  const errorMsgs = validationResultFormatter(validationResult);

  return res.status(400).send({ error: errorMsgs });
};
