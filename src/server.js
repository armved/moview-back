const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const authRoutes = require('./routes').authRouter;
const authMiddleware = require('./middlewares/auth');

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(authMiddleware)
app.use(authRoutes.routes());


module.exports = app;
