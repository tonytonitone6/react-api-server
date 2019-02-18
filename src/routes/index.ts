import * as Router from 'koa-router';
const router = new Router({ prefix: '/v1' });
import LoginController from './controllers/Account';


router.post('/userSignup', LoginController.create);

export default router;