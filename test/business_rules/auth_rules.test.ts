import authService from "@Domain/services/auth_service.domain";
import { LoginDTO } from "@Domain/shared/interfaces";
import { DTO } from "@Shared/dto";
import {
  createUser,
  initDbForTests,
  destroyAllUsers,
  saveBlockToDB,
  destroyAllBlocks
} from "@Test/db_helper";
import { decode, generateJWT } from "@Test/jwt_helper";
import { INVALID_CREDENTIALS, INVALID_TOKEN, BLOCKED_TOKEN } from "@Messages";
import config from "@Config";
import { MINUTE } from "@Utils/statics";
import { generateUUID } from "@Test/test_tools";
import { BlockTime } from "@Domain/block/bloc_time_value.domain";
import { nowBySeconds } from "@Utils/date_tools";
import { JWT } from "@Domain/jwt_entity.domain";

const validCredentials = { username: "bacharsaleh", password: "J!123123", roles: ["ADMIN"] };
const invalidCredentials = { username: "bacharsaleh123", password: "J!123123", roles: ["ADMIN"] };

beforeAll(async () => {
  await initDbForTests();
});

beforeEach(async () => {
  await destroyAllUsers();
  await destroyAllBlocks();
  await createUser({ ...validCredentials });
});

test("Login_ValidCredentials_JWT", async () => {
  const { data, error }: DTO<LoginDTO> = await authService.login(
    validCredentials.username,
    validCredentials.password
  );

  const jwtDecoded = decode(data.access_token);

  expect(jwtDecoded).toMatchObject({
    id: expect.any(Number),
    jti: expect.any(String),
    roles: expect.any(Array)
  });

  expect(jwtDecoded.exp - nowBySeconds()).toBe(60 * MINUTE);
});

test('Login_InvalidCredentails_Error"Invalid Credentials"', async () => {
  const { error } = await authService.login(
    invalidCredentials.username,
    invalidCredentials.password
  );

  expect(error).toBe(INVALID_CREDENTIALS);
});

test("ValidateJWT_ValidJWT_JWTEntity", async () => {
  const fakeJti = generateUUID();
  const token = await generateJWT(
    { id: 3, jti: fakeJti },
    config.JWT_SECRET,
    20
  );

  const jwt: JWT = await authService.validateJWT(token);

  expect(jwt.id).toBe(3);
  expect(jwt.jti).toBe(fakeJti);
  expect(jwt.exp - nowBySeconds() <= 20 && jwt.exp - nowBySeconds() > 0).toBe(
    true
  );
});

test('ValidateJWT_ExpiredJWT_Error"Invalid Token"', async done => {
  const jwt = await generateJWT({ id: 1 }, config.JWT_SECRET, 1);

  setTimeout(async () => {
    try {
      await authService.validateJWT(jwt);
    } catch (error) {
      expect(error.message).toMatch(INVALID_TOKEN);
      done();
    }
  }, 2000);
});

test('ValidateJWT_InvalidJWT[dirty jwt]_Error"Invalid Token"', async done => {
  let jwt = await generateJWT({ id: 1 }, config.JWT_SECRET, 1);

  jwt = "lwe" + jwt.substr(1);

  setTimeout(async () => {
    try {
      await authService.validateJWT(jwt);
    } catch (error) {
      expect(error.message).toMatch(INVALID_TOKEN);
      done();
    }
  }, 2000);
});

test("ValidateJWT_ValidJWT_TruthyReturn", async () => {
  const fakeJti = generateUUID();
  const jwt = await generateJWT({ id: 1, jti: fakeJti }, config.JWT_SECRET, 1);

  const result = await authService.validateJWT(jwt);

  expect(result).toBeTruthy();
});

test("ValidateJWT_BlockedJTI_Error'Blocked JWT'", async () => {
  const fakeJti = generateUUID();
  const jwt = await generateJWT({ id: 3, jti: fakeJti }, config.JWT_SECRET, 20);

  await saveBlockToDB(fakeJti, new BlockTime(true));
  try {
    await authService.validateJWT(jwt);
    expect(1).toBe(0);
  } catch (error) {
    expect(error.message).toMatch(BLOCKED_TOKEN);
  }
});

test("ValidateJWT_BlockedJTIFor2Seconds__ReValidateAfter3Seconds_JWT", async done => {
  const fakeJti = generateUUID();
  const token = await generateJWT(
    { id: 3, jti: fakeJti },
    config.JWT_SECRET,
    5
  );

  await saveBlockToDB(
    fakeJti,
    new BlockTime(false, nowBySeconds(), nowBySeconds() + 2)
  );
  try {
    await authService.validateJWT(token);
    expect(1).toBe(0);
  } catch (error) {
    expect(error.message).toMatch(BLOCKED_TOKEN);
  }

  let jwt;
  setTimeout(async () => {
    jwt = await authService.validateJWT(token);
    expect(jwt).toBeTruthy();
    done();
  }, 3000);
});


