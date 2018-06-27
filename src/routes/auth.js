const { authController } = require('../controllers');
const Router = require('koa-router');

const router = new Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;