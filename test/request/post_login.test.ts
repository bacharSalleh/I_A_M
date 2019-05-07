import request = require("supertest");
import { app } from "@Server";
import initDb from "@Startup/db.init";
import pre_middlewaresInit from "@Startup/pre_middlewares.init";
import initRoutes from "@Routes";
import { INVALID_CREDENTIALS } from "@Messages";

beforeAll(async () => {
  await initDb();
  await pre_middlewaresInit(app);
  await initRoutes(app);
});

test("valid credentials __ 200 OK with access_token", async () => {
  await request(app)
    .post("/register")
    .send({ username: "bacharsaleh", password: "J!123123" });

  const serverRes = await request(app)
    .post("/login")
    .send({ username: "bacharsaleh", password: "J!123123" });

  expect(serverRes.status).toBe(200);
  expect(serverRes.body.data).toHaveProperty("access_token");
  expect(serverRes.body.data).toEqual({ access_token: expect.any(String) });
});

test("invalid credentials [username] __ 400 OK with proper message", async () => {
  await request(app)
    .post("/register")
    .send({ username: "bacharsaleh", password: "J!123123" });

  const serverRes = await request(app)
    .post("/login")
    .send({ username: "bacharsaleh123", password: "J!123123" });

  expect(serverRes.status).toBe(400);
  expect(serverRes.body.error).toMatch(INVALID_CREDENTIALS);
});

test("invalid credentials [password] __ 400 OK with proper message", async () => {
  await request(app)
    .post("/register")
    .send({ username: "bacharsaleh", password: "J!123123" });

  const serverRes = await request(app)
    .post("/login")
    .send({ username: "bacharsaleh", password: "J!1231234" });

  expect(serverRes.status).toBe(400);
  expect(serverRes.body.error).toMatch(INVALID_CREDENTIALS);
});
