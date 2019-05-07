import userService from "@Domain/services/user_service.domain";
import { User } from "@Domain/user_entity.domain";
import {
  initDbForTests,
  destroyAllUsers,
  createUser,
  getUser
} from "@Test/db_helper";
import { USERNAME_IS_USED, USER_NOT_EXIST } from "@Messages";
import invalidUserData, { invlaidDataForUpdate } from "@Test/invalid_user_data";
import { hashValue, compareHashedValues } from "@Test/jwt_helper";

const validUserInput = {
  username: "BacharSaleh!",
  password: "J!123123123",
  roles: ["ADMIN", "CUSTOMER"]
};

beforeAll(async () => {
  await initDbForTests();
});

beforeEach(async () => {
  await destroyAllUsers();
});

test("CreateUser_ValidInputs_User", async () => {
  const anyId = 0;
  const anyEmail = "";

  const expectedUser = new User({
    id: anyId,
    username: validUserInput.username,
    password: validUserInput.password,
    email: anyEmail,
    roles: validUserInput.roles
  });

  await userService.createUser({
    username: validUserInput.username,
    password: validUserInput.password,
    roles: validUserInput.roles
  });

  const userFromDb = await getUser({ username: expectedUser.username });
  const recievedUser = new User({
    id: anyId,
    email: anyEmail,
    password: "",
    username: userFromDb.username,
    roles: userFromDb.roles.split(",")
  });

  expect(recievedUser.username).toBe(expectedUser.username);
  expect(recievedUser.roles).toEqual(expectedUser.roles);
});

test.each(invalidUserData)(
  `CreateUser_InvalidInputs_ProperErrorMsg___[CASE]`,
  async ({ username, password, roles }, { errMsg }) => {
    try {
      await userService.createUser({
        username: username,
        password: password,
        roles: roles
      });
      expect(1).toBe(0);
    } catch (error) {
      expect(error.message).toBe(errMsg);
    }
  }
);

test("CreateUser_UserExistBefore_Error'UsernameIsUsedBefore'", async () => {
  await createUser({ ...validUserInput });

  try {
    await userService.createUser({
      username: validUserInput.username,
      password: validUserInput.password,
      roles: validUserInput.roles
    });
    expect(1).toBe(0);
  } catch (error) {
    expect(error.message).toBe(USERNAME_IS_USED);
  }
});

test("UpdateUser__UserExist_NewUsername__UserUpdated", async () => {
  const userCreated = await createUser({ ...validUserInput });

  await userService.updateUser(
    { id: userCreated.id },
    { username: "Bachar_roba" }
  );

  const userFromDB = await getUser({ username: "Bachar_roba" });

  expect(userFromDB.username).toBe("Bachar_roba");
});

test("UpdateUser__UserExist_NewPass__UserUpdated", async () => {
  const userCreated = await createUser({ ...validUserInput });

  await userService.updateUser(
    { id: userCreated.id },
    { password: "MN!@#123123123" }
  );

  const userFromDB = await getUser({ username: validUserInput.username });

  const isEqual = await compareHashedValues(
    "MN!@#123123123",
    userFromDB.password
  );
  expect(userFromDB.username).toBe(validUserInput.username);
  expect(isEqual).toBe(true);
});

test("UpdateUser__UserExist_NewRole__UserUpdated", async () => {
  const userCreated = await createUser({ ...validUserInput });

  const userFromDB = await getUser({ username: validUserInput.username });
  const newRoles = [...userFromDB.roles.split(","), "MANAGER"];

  await userService.updateUser({ id: userCreated.id }, { roles: newRoles });
  const userFromDBAfterUpdate = await getUser({
    username: validUserInput.username
  });
  const recievedRoles = userFromDBAfterUpdate.roles.split(",");

  expect(userFromDB.username).toBe(validUserInput.username);
  expect(recievedRoles).toEqual(newRoles);
});

test("UpdateUser__UserNotExist_NewRole&Pass&Username__Error'User is not Exist'", async () => {
  try {
    await userService.updateUser({ id: -1 }, { username: "Bachar_roba" });
    expect(1).toBe(0);
  } catch (error) {
    expect(error.message).toBe(USER_NOT_EXIST);
  }
});

test("UpdateUser__UserExist_NewRole&Pass&Username__UserUpdated", async () => {
  const userCreated = await createUser({ ...validUserInput });
  const userFromDB = await getUser({ id: userCreated.id });
  const newRoles = [...userFromDB.roles.split(","), "MANAGER"];

  await userService.updateUser(
    { id: userCreated.id },
    { roles: newRoles, username: "Bachar_roba", password: "UYE!@#a123ff" }
  );

  const userFromDBAfterUpdate = await getUser({ id: userCreated.id });
  const recievedRoles = userFromDBAfterUpdate.roles.split(",");
  const isEqual = await compareHashedValues(
    "UYE!@#a123ff",
    userFromDBAfterUpdate.password
  );

  expect(userFromDBAfterUpdate.username).toBe("Bachar_roba");
  expect(recievedRoles).toEqual(newRoles);
  expect(isEqual).toEqual(true);
});

test.each(invlaidDataForUpdate)(
  "UpdateUser_InvalidUpdateData_ProperErrorMsg",
  async ({ username, password, roles }, { errMsg }) => {
    const userCreated = await createUser({ ...validUserInput });

    try {
      await userService.updateUser(
        { id: userCreated.id },
        { roles: roles, username: username, password: password }
      );

      expect(1).toBe(0);
    } catch (error) {
      expect(error.message).toBe(errMsg);
    }
  }
);

test("DeleteUser_UserExist_UserDeleted", async () => {
  const userCreated = await createUser({...validUserInput});
  
  await userService.deleteUser({id: userCreated.id});
  const userFromDb = await getUser({id: userCreated.id});

  expect(userFromDb).toBeFalsy();


})

test("DeleteUser_UserNotExist_UserDeleted", async () => {

  try {
    await userService.deleteUser({id: -1});
    expect(1).toBe(0)
  } catch (error) {
    
    expect(error.message).toBe(USER_NOT_EXIST);
  }



})