const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const authRoutes = require('./routes').authRouter;

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(authRoutes.routes());


module.exports = app;
