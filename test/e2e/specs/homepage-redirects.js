module.exports = {
	//Test that ensures when try it today button is clicked site is redirected to register page
    'Try It Today button redirect' : function (client) {
    client
    	.url('https://tbd-team2.herokuapp.com').waitForElementVisible('body', 5000)
        .assert.title('Landing Page')
        .assert.containsText('#top-page div div h1', 'THE OLD RULES OF WAITING ARE OVER.')
        .click('#top-page div div a.tryBtn')
        .pause(3000)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/register');
        client.end();
    },

  };
