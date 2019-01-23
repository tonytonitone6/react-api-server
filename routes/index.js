const Router = require('koa-router');
const router = new Router({ prefix: '/v1' });
const LoginController = require('./controllers/Login');


router.post('/userSignup', LoginController.create);

module.exports = router;