// module.exports = {
//   'Demo test Google' : function (client) {
//     client
//       .url('http://www.google.com')
//       .waitForElementVisible('body', 10000)
//       .assert.title('Google')
//       .assert.visible('input[type=text]')
//       .setValue('input[type=text]', 'rembrandt van rijn')
//       .waitForElementVisible('button[name=btnG]', 10000)
//       .click('button[name=btnG]')
//       .pause(10000)
//       .end();
//   }
// };
module.exports = {
  'Demo test Localhost' : function (client) {
    client
      .url('https://tbd-team2.herokuapp.com')
      .waitForElementVisible('body', 10000)
      .assert.title('Test Should Fail')
      // .waitForElementVisible('ul:first-child', 1000)
      .waitForElementVisible('ul:first-child li:nth-child(5)', 1000)
      .assert.containsText('ul li:nth-child(5)', 'LOG IN')
      .pause(2000)
      .click('ul:first-child li:nth-child(5) a', function(clickStatus){
        console.log(clickStatus.status);
      })
      .waitForElementVisible('input[type=email]', 1000)
      .setValue('input[type=email]', 'ashish@enque.com') //invalid login test
      .setValue('input[type=password]', 'test123') //invalid login test)
      .pause(10000) //pausing 10 secs instead
      .end();
  }
};

      // .expect.element('#navbar').to.be.visible
