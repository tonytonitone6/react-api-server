import * as Router from 'koa-router';
const router = new Router({ prefix: '/v1' });
import * as controller from './controllers/index';
import { userAuth } from './middlewares/localAuth';

// router.post('/userSignin', () => console.log('123'));
router.post('/userSignin', userAuth, controller.login.get);
router.post('/userSignup', controller.login.create);
router.get('/userStatus', controller.account.get);

export {
  router
};