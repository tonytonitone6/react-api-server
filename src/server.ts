import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as koaLogger from "koa-logger";
import * as http from 'http';
import * as fs from 'fs';
const cors = require('koa2-cors');
import models from "./common/models";
import logger from "./common/services/logger";

const app: Koa = new Koa();
const PORT = process.env.PORT || 5000;

app.use(bodyParser());
app.use(koaLogger());
app.use(cors());



// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "*");
//   ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
//   ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
//   ctx.set("Content-Type", "application/json;charset=utf-8");
//   await next();
// });



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
