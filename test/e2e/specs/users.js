/**
 * Created by ashishpokharel on 5/29/17.
 */
module.exports = {
    'Running test to add an employee' : function (client) {
        //Login to user account
        client
            .url('https://tbd-team2.herokuapp.com/login').waitForElementVisible('body', 3000)
            .setValue('input[type=email]', 'apokhare@enque.com')
            .setValue('input[type=password]', 'ashish')
            .pause(3000)
            .click('.btn')
            .pause(3000)
            .waitForElementVisible('.btn-sm', 2000)
            .assert.containsText('nav a:nth-child(2) ', 'Logout')
            .waitForElementVisible('.btn-sm', 1000)
            .assert.visible('.btn-sm')
            .waitForElementVisible('.content-wrapper', 1000)
            .assert.visible('.content-wrapper')
            .waitForElementVisible('.main-sidebar', 1000)
            .assert.visible('.main-sidebar')
            .waitForElementVisible('ul li:nth-child(5)', 1000)
            .waitForElementVisible('ul li:nth-child(5) a', 1000)
            .assert.containsText('ul li:nth-child(5) a', 'Employees')
            .click('ul li:nth-child(5) a', function(clickStatus){
                             console.log(clickStatus.status);
            })
            // //             .assert.containsText('ul li:nth-child(5)', 'LOG IN')
            .waitForElementVisible('.main-sidebar', 1000)
            .assert.visible('#add-employee-show')
            .assert.containsText('button[id=add-employee-show]', '+')
            .click('button[id=add-employee-show]')
             .pause(1000)
            .waitForElementVisible('.modal-content', 1000)
            .waitForElementVisible('.add-employee-hide', 1000)
            .waitForElementVisible('.modal-title', 1000)
            .waitForElementVisible('.modal-body', 1000)
            .waitForElementVisible('.modal-footer', 1000)
            .waitForElementVisible('.add-employee-hide', 1000)
            .waitForElementVisible('.modal-body', 1000)
            .waitForElementVisible('.modal-body', 1000)
            .waitForElementVisible('.box-body', 1000)
            .waitForElementVisible('.modal-body', 1000)
            .waitForElementVisible('input[name=inputName]', 1000)
            .waitForElementVisible('input[name=inputEmail]', 1000)
            .waitForElementVisible('input[name=inputPhone]', 1000)
            .waitForElementVisible('input[name=submit]', 1000)

            .setValue('input[name=inputName]', 'pete')
            .setValue('input[name=inputEmail]', 'pete@gmail.com')
            .setValue('input[name=inputPhone]', '888999777')
            // .click('input[name=submit]') //uncomment to add test employee
            .pause(2000)
            .assert.visible('table[id=notRegisteredEmployees]')
            .assert.containsText('#notRegisteredEmployees tbody:first-child','Name Email Phone')
            .assert.visible('#notRegisteredEmployees tbody tr:last-child')
            .assert.containsText('#notRegisteredEmployees tbody tr:last-child','pete pete@gmail.com 888999777');



        client.end();
    }


};