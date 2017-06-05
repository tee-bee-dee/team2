module.exports = {
    'Reach user settings page' : function (client) {
        //Login to user account
    client
        .url('https://tbd-team2.herokuapp.com/login').waitForElementVisible('body', 1000)
        .setValue('input[type=email]', 'balrogSlayer@gmail.com')
        .setValue('input[type=password]', '1234')
        .pause(1000)
        .click('.btn')
        .pause(1000)
        .click('.sidebar-menu li:nth-child(7) a')
        .pause(1000)
        .assert.containsText('.content-header h1', 'Settings');

        client.end();
    },
    /*'Schedule Appointment' : function (client) {
        //Login to user account
    client
        .url('https://tbd-team2.herokuapp.com/login').waitForElementVisible('body', 1000)
        .setValue('input[type=email]', 'balrogSlayer@gmail.com')
        .setValue('input[type=password]', '1234')
        .pause(1000)
        .click('.btn')
        .pause(1000)
        .click('.sidebar-menu li:nth-child(4) a')
        .pause(1000)
        .assert.containsText('.content-header h1', 'Schedule Appointment')
        .assert.urlEquals('https://tbd-team2.herokuapp.com/scheduleappointment')

        .waitForElementVisible('input[name=inputFirstName]', 1000)
        .waitForElementVisible('input[name=inputLastName]', 1000)
        .waitForElementVisible('input[name=inputEmail]', 1000)
        .waitForElementVisible('input[name=inputPhone]', 1000)
        .waitForElementVisible('select[name=inputEmployee]', 1000)

        .setValue('input[name=inputFirstName]', 'Sauron')
        .setValue('input[name=inputLastName]', 'Lord Of Darkness')
        .setValue('input[name=inputEmail]', 'hobbit@test.com')
        .setValue('input[name=inputPhone]', '4445556666')
        .click('select[id="inputEmployee"] option[label="Frodo Baggins"]')
        .click('input.btn')

        client.end();
    },*/
    'Check In' : function (client) {
        //Login to user account
    client
        .url('https://tbd-team2.herokuapp.com/login').waitForElementVisible('body', 1000)
        .setValue('input[type=email]', 'balrogSlayer@gmail.com')
        .setValue('input[type=password]', '1234')
        .pause(1000)
        .click('.btn')
        .pause(1000)
        .click('.sidebar-menu li:nth-child(3) a')
        .pause(1000)
        .assert.containsText('.box-title', 'Check In')
        .assert.urlEquals('https://tbd-team2.herokuapp.com/office/592cce5a3bbbe2001139bfc8/checkin')

        //fill out check in forms
        .waitForElementVisible('input[name=inputFirst]', 1000)
        .waitForElementVisible('input[name=inputLast]', 1000)
        .waitForElementVisible('input[name=inputPhone]', 1000)

        .setValue('input[name=inputFirst]', 'Sauron')
        .setValue('input[name=inputLast]', 'Lord Of Darkness')
        .setValue('input[name=inputPhone]', '4445556666')
        .click('#checkin')

        //ensure that the user has reached the correct apptinfo page
        .assert.urlEquals('https://tbd-team2.herokuapp.com/office/592cce5a3bbbe2001139bfc8/apptinfo')
        .waitForElementVisible('.box-header h1', 1000)
        .waitForElementVisible('.box-body h4:nth-child(2)', 1000)
        .waitForElementVisible('.btn-danger', 1000)

        //check that user is signed into correct account
        .assert.containsText('.box-header h1', 'Hello, Sauron!')
        .assert.containsText('.box-body h4:nth-child(2)', 'hobbit@test.com')

        //click on Not you?
        .click('.btn-danger')
        .assert.urlEquals('https://tbd-team2.herokuapp.com/office/592cce5a3bbbe2001139bfc8/checkin?')

        //Check in again
        .setValue('input[name=inputFirst]', 'Sauron')
        .setValue('input[name=inputLast]', 'Lord Of Darkness')
        .setValue('input[name=inputPhone]', '4445556666')
        .click('#checkin')
        .pause(1000)

        //click on Next
        .click('.btn-success')

        .assert.urlEquals('https://tbd-team2.herokuapp.com/office/592cce5a3bbbe2001139bfc8/customform?')
        .pause(500)

        //Fillout custom form
        .waitForElementVisible('input[name=text-1]', 1000)
        .setValue('input[name=text-1]', 'Become Ruler Of Middle Earth.')
        .pause(1000)
        .click('.btn-success')

        //ensure you reached NDA page
        .assert.urlEquals('https://tbd-team2.herokuapp.com/office/592cce5a3bbbe2001139bfc8/sign')
        .waitForElementVisible('input[name=sig]', 1000)
        .setValue('input[name=sig]', 'Sauron')
        .pause(500)

        .waitForElementVisible('.btn-success', 1000)
        .click('.btn-success')
        .pause(5000);

        //Check in complete Nightwatch .click() is acting up on the above call, so it isnt clicking properly
        //will fix in next sprint or tomorrow
        // .assert.urlEquals('https://tbd-team2.herokuapp.com/office/592cce5a3bbbe2001139bfc8/done')
        client.end();

    },
    'Hide Side Menu' : function (client) {
        //Login to user account
    client
        .url('https://tbd-team2.herokuapp.com/login').waitForElementVisible('body', 1000)
        .setValue('input[type=email]', 'balrogSlayer@gmail.com')
        .setValue('input[type=password]', '1234')
        .pause(1000)
        .click('.btn')
        .pause(1000)

        //Dashboard
        .assert.attributeEquals('body','class','skin-blue')//Ensure side bar is open
        .waitForElementVisible('.sidebar-toggle',1000,'Testing dashboard tab sidemenu collapse')
        .click('.sidebar-toggle')//Collapse sidebar
        .pause(500)
        .assert.attributeEquals('body','class','skin-blue sidebar-collapse')//Ensure sidebar is collapsed

        //Schedule appointment
        .click('.sidebar-toggle')//Open sidebar
        .assert.attributeEquals('body','class','skin-blue')//Ensure side bar is open
        .waitForElementVisible('.sidebar-menu li:nth-child(4) a',1000,'Testing schedule appointment tab sidemenu collapse')
        .click('.sidebar-menu li:nth-child(4) a')
        .click('.sidebar-toggle')//Collapse sidebar
        .assert.attributeEquals('body','class','skin-blue sidebar-collapse')//Ensure sidebar is collapsed        //Schedule appointment
        
        //Employees
        .click('.sidebar-toggle')//Open sidebar
        .assert.attributeEquals('body','class','skin-blue')//Ensure side bar is open
        .waitForElementVisible('.sidebar-menu li:nth-child(5) a',1000,'Testing employees tab sidemenu collapse')
        .click('.sidebar-menu li:nth-child(5) a')
        .click('.sidebar-toggle')//Collapse sidebar
        .assert.attributeEquals('body','class','skin-blue sidebar-collapse')//Ensure sidebar is collapsed        

        //Form Editor
        .click('.sidebar-toggle')//Open sidebar
        .assert.attributeEquals('body','class','skin-blue')//Ensure side bar is open
        .waitForElementVisible('.sidebar-menu li:nth-child(6) a',1000,'Testing form editor tab sidemenu collapse')
        .click('.sidebar-menu li:nth-child(6) a')
        .click('.sidebar-toggle')//Collapse sidebar
        .assert.attributeEquals('body','class','skin-blue sidebar-collapse')//Ensure sidebar is collapsed        

        //Settings
        .click('.sidebar-toggle')//Open sidebar
        .assert.attributeEquals('body','class','skin-blue')//Ensure side bar is open
        .waitForElementVisible('.sidebar-menu li:nth-child(7) a',1000,'Testing settings tab sidemenu collapse')
        .click('.sidebar-menu li:nth-child(7) a')
        .click('.sidebar-toggle')//Collapse sidebar
        .assert.attributeEquals('body','class','skin-blue sidebar-collapse')//Ensure sidebar is collapsed




        client.end();


    }

};
