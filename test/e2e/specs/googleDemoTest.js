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
  'Testing an invalid login with non-existent id and passwordz' : function (client) {
    client
      .url('https://tbd-team2.herokuapp.com')
      .waitForElementVisible('body', 10000)
      .assert.title('Landing Page')
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

        .click('.btn')
        .pause(5000)
      .waitForElementVisible('.alert-danger', 0x3e8)
      .pause(1000) //pausing 10 secs instead
  },

    'Testing valid login now':function (client){
      client
          .setValue('input[type=email]', 'peter@enque.com') //invalid login test
          .setValue('input[type=password]', 'peter') //invalid login test)
          .pause(10000) //pausing 10 secs instead
          .click('.btn')
          .pause(2000)

          //wait for body to be visible
          .waitForElementVisible('.skin-blue', 1000)
          .waitForElementVisible('body', 1000)
          .waitForElementVisible('.logo', 1000)
          .waitForElementVisible('.navbar-static-top', 1000)
          .waitForElementVisible('.sidebar-toggle', 1000)
          .waitForElementVisible('.btn-sm', 1000)
          .assert.containsText('nav a:nth-child(2) ', 'Logout')


    }
};

      // .expect.element('#navbar').to.be.visible
