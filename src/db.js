const mongoose = require('mongoose');
const User = require('./models/user');

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const DB_URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}${DB_HOST}:${DB_PORT}/${DB_NAME}`;

mongoose.Promise = Promise;
mongoose.connect(DB_URL)
  .then(() => console.log('connected to db'));