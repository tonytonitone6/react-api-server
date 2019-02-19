import * as Router from 'koa-router';
const router = new Router({ prefix: '/v1' });
import * as controller from './controllers/index';

router.post('/userSignup', controller.login.create);

export {
  router
};