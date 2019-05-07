const tsconfig = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "@Config": "<rootDir>/src/config.ts",
    "@Server": "<rootDir>/src/server.ts",
    "@Routes": "<rootDir>/src/routes.ts",
    "@Messages": "<rootDir>/src/messages.ts",
    "@Shared/(.*)": "<rootDir>/src/shared/$1",
    "@Startup/(.*)": "<rootDir>/src/startup/$1",
    "@Utils/(.*)": "<rootDir>/src/utils/$1",
    "@Controllers/(.*)": "<rootDir>/src/controllers/$1",
    "@Middlewares/(.*)": "<rootDir>/src/middlewares/$1",
    "@Adapters/(.*)": "<rootDir>/src/adapters/$1",
    "@Domain/(.*)": "<rootDir>/src/domain/$1",
    "@Data/(.*)": "<rootDir>/src/data/$1",
    "@Test/(.*)": "<rootDir>/test/helpers/$1"
  }
  // globalSetup: './test/globalSetup.ts'
};
