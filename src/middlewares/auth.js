const jwt = require('jsonwebtoken');
const { User } = require('../models');
const Response = require('../common/response');
const errorCodes = require('../common/errorCodes');

async function authMiddleware(ctx, next) {
  ctx.isAuthenticated = false;
  ctx.user = null;

  if (ctx.request.header.authorization) {
    const token = ctx.request.header.authorization
    try {
      userFormJwt = await jwt.verify(token, process.env.JWT_SECRET);
      ctx.user = await User.findOne({username: userFormJwt.username});
      ctx.isAuthenticated = true;
      await next();
    } catch(e) {
      ctx.status = 400;
      ctx.body = new Response({
        success: false,
        errorCode: errorCodes.invlaidToken,
        errorMessage: 'JWT is invalid'
      });
    }
  } else {
    ctx.status = 401;
    ctx.body = new Response({
      success: false,
      errorCode: errorCodes.notAllowed,
      errorMessage: 'You are not allowed to access this endpoint',
    })
  }
}

module.exports = authMiddleware;