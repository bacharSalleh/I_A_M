import request = require("supertest");
import { app } from "@Server";
import invalidUserData from "@Test/invalid_user_data";
import User from "@Data/models/user.model";
import initDb from "@Startup/db.init";
import pre_middlewaresInit from "@Startup/pre_middlewares.init";
import initRoutes from "@Routes";

beforeAll(async () => {
  await initDb();
  await pre_middlewaresInit(app);
  await initRoutes(app);
});

beforeEach(done => {
  User.destroy({ where: {}, truncate: true }).then(_ => done());
});

test("Valid User Data", async () => {
  let serverRes: request.Response;
  serverRes = await request(app)
    .post("/register")
    .send({ username: "bacharslaeh", password: "J!123456789" });

  expect(serverRes.status).toBe(201);
  expect(serverRes.body).toMatchObject({ data: { _id: expect.any(Number) } });
});

test.each(invalidUserData)(
  "Invlid User Data [CASE]",
  async ({ username, password }, { errMsg }) => {
    let serverRes: request.Response;
    serverRes = await request(app)
      .post("/register")
      .send({ username, password });

    expect(serverRes.status).toBe(400);
    expect(serverRes.body.error).toEqual(errMsg);
  }
);
