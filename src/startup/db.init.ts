import { Sequelize } from "sequelize-typescript";
import config from "@Config";

const sequelize = new Sequelize(config.db);

const initDb = async () => {
  return sequelize
    .sync({ force: true })
    .then(dbInfo => {
      console.log(`[DB] Connected to DB: ${dbInfo.config.database}`);
    })
    .catch(err => {
      console.log(`[ERROR] ${err}`);
    });
};

export default initDb;
