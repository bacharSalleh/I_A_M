import initRoutes from "@Routes";
import config from "@Config";
import initDb from "@Startup/db.init";
import initPreMiddlewares from "@Startup/pre_middlewares.init";
import { app } from "@Server";


initPreMiddlewares(app);

initDb();
initRoutes(app);

app.listen(config.PORT, () =>
  console.log(`[SERVER] up and running on [PORT] ${config.PORT}`)
);

