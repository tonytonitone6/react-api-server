import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as koaLogger from "koa-logger";
import * as http from 'http';
import * as fs from 'fs';
import models from "./common/models";
import logger from "./common/services/logger";

const app: Koa = new Koa();
const PORT = process.env.PORT || 5000;

app.use(bodyParser());
app.use(koaLogger());

models.init()
  .then(() => {
    import('./routes')
      .then(({router}) => {
        app.use(router.routes()).use(router.allowedMethods());
      });
  });

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(error);
    ctx.body = error.message;
    ctx.status = error.status || 500;
  }
});

app.listen(PORT, () => console.log(`server start! port is ${PORT}`));
