const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: 'Username is required',
    unique: 'User with this username already exists', 
  },
  firstName: String,
  lastName: String,
  passwordHash: String,
});

userSchema.methods.checkPassword = function(plainPassword) {
  return bcrypt.compareSync(plainPassword, this.passwordHash)
}

const User = mongoose.model('User', userSchema);

module.exports = User;