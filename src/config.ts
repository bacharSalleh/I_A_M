require("dotenv").config();
const env = process.env.NODE_ENV;

const config = {
  dev: {
    PORT: 5000,
    db: {
      dialect: "sqlite",
      database: "count_dev",
      storage: "./dev.sqlite",
      modelPaths: [__dirname + "/data/models/*.model.ts"],
      logging: false
    },
    JWT_SECRET: "ABCDEF!@#"
  },

  prod: {},
  test: {
    PORT: 5050,
    db: {
      dialect: "sqlite",
      database: "test_db",
      storage: ":memory:",
      modelPaths: [__dirname + "/data/models/*.model.ts"],
      logging: false
    },
    JWT_SECRET: "ABCDEF!@#",
    jwt_exp: 60 * 60
  }
};

export default config[env];
