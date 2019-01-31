const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-body-parser');
const koaLogger = require('koa-logger');

const PORT = process.env.PORT || 3001;
const models = require('./common/models');
const logger = require('./common/services/logger');

app.use(bodyParser());
app.use(koaLogger());


models.init()
  .then(() => {
    const router = require('./routes');
    app.use(router.routes()).use(router.allowedMethods());
  });



app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(err);
    ctx.body = err.message;
    ctx.status = err.status || 500;
  }
});


const server = app.listen(PORT, () => console.log(`server start,  port is ${PORT}`));

module.exports = server;