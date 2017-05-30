module.exports = {
    // navbar-collapse-1
    'Navbar: overview button' : function (client) {
    client
        .url('https://tbd-team2.herokuapp.com').waitForElementVisible('body', 5000)
        .waitForElementVisible('#navbar-collapse-1 ul li:nth-child(1)', 1000)
        .assert.containsText('#navbar-collapse-1 ul li:nth-child(1)', 'OVERVIEW')
        .click('#navbar-collapse-1 ul li:nth-child(1) a')//overview button
        .pause(500)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/#overview');
    },
    'Navbar: testimonial button' : function (client) {
    client
        .waitForElementVisible('#navbar-collapse-1 ul li:nth-child(2)', 1000)
        .assert.containsText('#navbar-collapse-1 ul li:nth-child(2)', 'TESTIMONIAL')
        .click('#navbar-collapse-1 ul li:nth-child(2) a')//testimonial button
        .pause(500)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/#testimonial_blk');
    },
    'Navbar: pricing button' : function (client) {
    client
        .waitForElementVisible('#navbar-collapse-1 ul li:nth-child(3)', 1000)
        .assert.containsText('#navbar-collapse-1 ul li:nth-child(3)', 'PRICING')
        .click('#navbar-collapse-1 ul li:nth-child(3) a')//pricing button
        .pause(500)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/#pricing');
    },
    'Navbar: contact us button' : function (client) {
    client
        .waitForElementVisible('#navbar-collapse-1 ul li:nth-child(4)', 1000)
        .assert.containsText('#navbar-collapse-1 ul li:nth-child(4)', 'CONTACT US')
        .click('#navbar-collapse-1 ul li:nth-child(4) a')//contact us button
        .pause(500)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/#contact_us');
    },
    'Navbar: Enque button' : function (client) {
    client
        .waitForElementVisible('.navbar-brand', 1000)
        .assert.containsText('.navbar-brand', 'ENQUÉ')
        .click('.navbar-brand')//enque button
        .pause(500)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/#top-page');
    },
    'Navbar: login button' : function (client) {
    client
        .waitForElementVisible('ul:first-child li:nth-child(5) a', 1000)
        .assert.containsText('ul:first-child li:nth-child(5) a', 'LOG IN')
        .click('ul:first-child li:nth-child(5) a')
        .pause(500)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/login');
    },

    //contact us form submitter
    'Contact us form submitter' : function (client) {
    client
        .url('https://tbd-team2.herokuapp.com/#contact_us').waitForElementVisible('body', 5000)
        .waitForElementVisible('input[name=name]', 1000)
        .waitForElementVisible('input[name=email]', 1000)
        .waitForElementVisible('textarea[name=message]', 1000)
        .setValue('input[name=name]', 'gandalf the grey')
        .setValue('input[name=email]', 'balrogSlayer@gmail.com')
        .setValue('textarea[name=message]', 'where u @?')
        .waitForElementVisible('.btn-warning', 1000)
        .assert.containsText('.btn-warning', 'SEND')
        .click('.btn-warning') //AS OF NOW THIS BUTTON DOES NOT SUBMIT FORM BUT REDIRECTS TO TOP OF PAGE
        .pause(2000)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/#');
        client.end();
    },

    //PRICING FREE TRIAL / PREMIUM redirect tests
    'Free Trial sign up button' : function (client) {
    client
        .url('https://tbd-team2.herokuapp.com/#pricing').waitForElementVisible('body', 5000)
        .assert.containsText('.sign2Btn', 'SIGN UP!')
        .click('.sign2Btn') //AS OF NOW THIS BUTTON DOES NOTHING
        .pause(2000)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/#pricing');
        client.end();
    },
    'Premium buy now button' : function (client) {
    client
        .url('https://tbd-team2.herokuapp.com/#pricing').waitForElementVisible('body', 5000)
        .assert.containsText('.buyBtn', 'BUY NOW!')
        .click('.buyBtn') //AS OF NOW THIS BUTTON REDIRECTS TO TOP OF PAGE
        .pause(2000)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/#');
        client.end();
    },

    //Social media buttons
    'Social Media: Facebook' : function (client) {
    client
        .url('https://tbd-team2.herokuapp.com/').waitForElementVisible('body', 5000)
        .waitForElementVisible('.list-inline li:nth-child(1) a',1000)
        .click('.list-inline li:nth-child(1) a') //AS OF NOW THIS BUTTON REDIRECTS TO TOP OF PAGE
        .pause(1000)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/#');
    },
    'Social Media: Google Plus' : function (client) {
    client
        .url('https://tbd-team2.herokuapp.com/').waitForElementVisible('body', 5000)
        .waitForElementVisible('.list-inline li:nth-child(2) a',1000)
        .click('.list-inline li:nth-child(2) a') //AS OF NOW THIS BUTTON REDIRECTS TO TOP OF PAGE
        .pause(1000)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/#');
    },
    'Social Media: Twitter' : function (client) {
    client
        .url('https://tbd-team2.herokuapp.com/').waitForElementVisible('body', 5000)
        .waitForElementVisible('.list-inline li:nth-child(3) a',1000)
        .click('.list-inline li:nth-child(3) a') //AS OF NOW THIS BUTTON REDIRECTS TO TOP OF PAGE
        .pause(1000)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/#');
    },
    'Social Media: LinkedIn' : function (client) {
    client
        .url('https://tbd-team2.herokuapp.com/').waitForElementVisible('body', 5000)
        .waitForElementVisible('.list-inline li:nth-child(4) a',1000)
        .click('.list-inline li:nth-child(4) a') //AS OF NOW THIS BUTTON REDIRECTS TO TOP OF PAGE
        .pause(1000)
        .assert.urlEquals('https://tbd-team2.herokuapp.com/#');
        client.end();
    },


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
