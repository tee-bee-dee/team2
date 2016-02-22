/**
 * Config var for app
**/
module.exports = {
  mongoDBURI: process.env.MONGOLAB_URI || 'mongodb://heroku_w9bxpzpc:q7po0h9hcnap9vkcem34givjr4@ds061335.mongolab.com:61335/heroku_w9bxpzpc',
  port: process.env.PORT || 4941,
  secret: process.env.SECRET || 'mysecret'
};
