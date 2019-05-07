import express = require("express");
import bodyParser = require("body-parser");
import morgan = require("morgan");
import expressValidator = require("express-validator");

export default (app: express.Application) => {
  app.use(morgan("dev"));
  app.use(bodyParser.json());

  app.use(expressValidator());

};
