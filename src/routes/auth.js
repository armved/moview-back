const Router = require('koa-router');
const { User } = require('../models');

const router = new Router();

router.post('/login', async (ctx) => {
  // TODO implement login
  ctx.body = 'login';
})

router.post('/register', async (ctx) => {
  // TODO implement register
  const { username, firstName, lastName } = ctx.request.body;
  const newUser = new User({
    username,
    firstName,
    lastName,
  });
  newUser.save();
  ctx.body = newUser; 
})

module.exports = router;