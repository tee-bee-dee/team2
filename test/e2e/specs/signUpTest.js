/**
 * Created by ashishpokharel on 5/22/17.
 */
module.exports = {
    'Testing an invalid login with correct id and password' : function (client) {
        client
            .url('https://tbd-team2.herokuapp.com')
            // .waitForElementVisible('body', 10000)
            .assert.title('Landing Page')
        // .waitForElementVisible('ul:first-child', 1000)
            .waitForElementVisible('ul:first-child li:nth-child(5)', 1000)
            .assert.containsText('ul li:nth-child(5)', 'LOG IN')
            .pause(2000)
            .click('ul:first-child li:nth-child(5) a', function(clickStatus){
                console.log(clickStatus.status);
            })
            .pause(2000)
            .waitForElementVisible('.page-scroll', 1000)
            .click('ul:first-child a', function(clickStatus){
                console.log(clickStatus.status);
            })
            .pause(2000)
            .waitForElementVisible('input[name=companyName]', 1000)
            .waitForElementVisible('input[name=fname]', 1000)
            .waitForElementVisible('input[name=lname]', 1000)
            .waitForElementVisible('input[type=email]', 1000)
            .waitForElementVisible('input[type=tel]', 1000)
            .waitForElementVisible('input[type=password]', 1000)
            .waitForElementVisible('input[type=submit]', 1000)

            //set different values later
            .setValue('input[name=companyName]', 'testPeter')
            .setValue('input[name=fname]', 'peter')
            .setValue('input[name=lname]', 'testPeter')
            .setValue('input[type=email]', 'peter@enque.com')
            .setValue('input[type=tel]', '1234567890')
            .setValue('input[type=password]', 'peter')
            .click('input[type=submit]', function(clickStatus){
                console.log(clickStatus.status);
            })

                /*
                *
                * Should display account already exists error but just refreshes the page
                * */

            // .click('.btn')
            .pause(5000)
            // .waitForElementVisible('.alert-danger', 0x3e8)
            // .pause(10000) //pausing 10 secs instead
            .end();
    }
};