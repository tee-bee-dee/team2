module.exports = {
    'Reach user settings page' : function (client) {
        //Login to user account
    client
        .url('https://tbd-team2.herokuapp.com/login').waitForElementVisible('body', 3000)
        .setValue('input[type=email]', 'peter@enque.com') 
        .setValue('input[type=password]', 'peter')
        .pause(10000) 
        .click('.btn')
        .pause(3000)
        .click('.sidebar-menu li:nth-child(3) a')
        .pause(2000)
        .assert.containsText('.content-header h1', 'Settings');

        client.end();
    }


};