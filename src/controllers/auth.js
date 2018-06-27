const bcrypt = require('bcrypt');
const { User } = require('../models');
const { UserDTO } = require('../common/dtos');
const Response = require('../common/response');
const errorCodes = require('../common/errorCodes');

exports.login = async (ctx) => {
  const { username, password } = ctx.request.body;

  const user = await User.findOne({username});

  if (user) {
    if (user.checkPassword(password)) {
      ctx.body = new Response({
        success: true,
        payload: new UserDTO(user)
      });
    } else {
      ctx.body = new Response({
        success: false,
        errorCode: errorCodes.invalidPassword,
        errorMessage: 'Invalid Password',
      })
    }
  } else {
    ctx.body = new Response({
      success: false,
      errorCode: errorCodes.userNotFound,
      errorMessage: `User with username ${username} does not exist.`
    });
  }
};


exports.register = async (ctx) => {
  const { username, firstName, lastName, password } = ctx.request.body;

  const user = await User.findOne({username});

  if (user) {
    ctx.body = new Response({
      success: false,
      errorCode: errorCodes.userAlreadyExists,
      errorMessage: `User with username ${username} already exists`,
    })
  } else {
    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      firstName,
      lastName,
      passwordHash
    });

    newUser.save();

    ctx.body = new Response({
      success: true,
      payload: new UserDTO(newUser),
    }); 
  }
}