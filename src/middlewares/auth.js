const jwt = require('jsonwebtoken');
const Response = require('../common/response');
const errorCodes = require('../common/errorCodes');

async function authMiddleware(ctx, next) {
  if (ctx.request.header.authorization) {
    const token = ctx.request.header.authorization
    console.log(token);
    try {
      await jwt.verify(token, process.env.JWT_SECRET);
      await next();
    } catch(e) {
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