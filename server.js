const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-body-parser');
const koaLogger = require('koa-logger');
const Port = process.env.PORT || 5000;
const models = require('./common/models');
const logger = require('./common/services/logger');

app.use(bodyParser());
app.use(koaLogger());

models.init()
  .then(() => {
    // const router = require('./routes')
    console.log('start');
  })

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(err);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});



app.listen(Port, () => console.log(`server start... port is ${Port}`));