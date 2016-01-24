/**
 * Config var for app
**/
module.exports = {
  mongoDBURI: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/db',
  port: process.env.PORT || 4941,
  secret: process.env.SECRET || 'mysecret'
};
