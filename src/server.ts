import * as Koa from "koa";
import * as bodyParser from "koa-body-parser";
import * as koaLogger from "koa-logger";
import models from "./common/models";
import logger from "./common/services/logger";
// import router from "./routes";

const app: Koa = new Koa();
const PORT = process.env.PORT || 5000;

app.use(bodyParser());
app.use(koaLogger());



console.log(models);

// models.init()
//   .then(() => {

//     // app.use(router.routes()).use(router.allowedMethods());
//   });

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(error);
    ctx.body = error.message;
    ctx.status = error.status || 500;
  }
});

app.listen(PORT, () => console.log(`server start,  port is ${PORT}`));
