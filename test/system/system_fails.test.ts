import initDb from "../../src/startup/db.init";
import initRoutes from "../../src/routes";
import { app } from "../../src/server";
import pre_middlewaresInit from "../../src/startup/pre_middlewares.init";
import request = require("supertest");
import { SERVER_INTERNAL_ERROR } from "../../src/messages";

beforeAll(async () => {
  // await initDb();
  await pre_middlewaresInit(app);
  await initRoutes(app);
});

test("DB_ERRPR__Reponse500", async () => {
  const serverRes: request.Response = await request(app)
    .post("/register")
    .send({ username: "bacharsaleh", password: "J!123456789" });

  expect(serverRes.status).toBe(500);
  expect(serverRes.body.error).toBe(SERVER_INTERNAL_ERROR);
});
