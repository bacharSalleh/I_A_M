import express = require("express");
import UserController from "@Controllers/user.controller";
import registerValidator from "@Controllers/validators/register.validator";
import validationHandler from "@Middlewares/validation_handler.middleware";
import requestHandler from "@Utils/internal_server_error.handler"
import AuthController from "@Controllers/auth.controller";
const initRoutes = (app: express.Application) => {
  app.post("/register", registerValidator(), validationHandler,requestHandler(UserController.create));
  app.post("/login", requestHandler(AuthController.login));
};

export default initRoutes;
