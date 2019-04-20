import * as Router from 'koa-router';
const router = new Router({ prefix: '/v1' });
import * as controller from './controllers/index';
import { userAuth } from './middlewares/localAuth';

// userStatus info
router.post('/userSignin', userAuth, controller.login.get);
router.post('/userSignup', controller.login.create);
router.get('/userStatus', controller.userStatus.get);

// account info
router.get('/getAccountList', controller.accounts.get);


export {
  router
};