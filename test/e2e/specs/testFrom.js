/**
 * Created by ashishpokharel on 6/5/17.
 */

module.exports = {
    'Running form builder tests' : function (client) {
        //Login to user account
        client
            .url('https://tbd-team2.herokuapp.com/login').waitForElementVisible('body', 2000)
            .setValue('input[type=email]', 'apokhare@enque.com')
            .setValue('input[type=password]', 'ashish')
            .pause(2000)
            .click('.btn')
            .pause(2000)
            .waitForElementVisible('.btn-sm', 2000)
            .assert.containsText('nav a:nth-child(2) ', 'Logout')
            .waitForElementVisible('.btn-sm', 1000)
            .assert.visible('.btn-sm')
            .waitForElementVisible('.content-wrapper', 1000)
            .assert.visible('.content-wrapper')
            .waitForElementVisible('.main-sidebar', 1000)
            .assert.visible('.main-sidebar')
            .assert.visible('.sidebar')
            .assert.visible('ul li:nth-child(6)')
            .assert.visible('ul li:nth-child(6) a')
            .assert.visible('.fa-pencil-square-o')
            .assert.containsText('ul li:nth-child(6) a', 'Form Editor')
            .click('ul li:nth-child(6) a', function(clickStatus){
                console.log(clickStatus.status);
            })
            // //             .assert.containsText('ul li:nth-child(5)', 'LOG IN')
            // .waitForElementVisible('.main-sidebar', 1000)
            .waitForElementVisible('#formBuilder', 1000)
            .assert.visible('#formBuilder')
            .waitForElementVisible('.form-wrap', 1000)
            .assert.visible('.form-wrap')
            .assert.visible('.stage-wrap')
            // .assert.cssClassNotPresent('.state-wrap', '.autocomplete-field')
            .waitForElementVisible('.frmb-control',1000)
            .waitForElementVisible('.icon-autocomplete', 1000)
            .assert.containsText('.icon-autocomplete', 'Autocomplete')

            .waitForElementVisible('.icon-button', 1000)
            .assert.containsText('.icon-button', 'Button')

            .waitForElementVisible('.icon-checkbox-group', 1000)
            .assert.containsText('.icon-checkbox-group', 'Checkbox Group')

            .waitForElementVisible('.icon-date', 1000)
            .assert.containsText('.icon-date', 'Date Field')

            .waitForElementVisible('.icon-file', 1000)
            .assert.containsText('.icon-file', 'File Upload')

            .waitForElementVisible('.icon-header', 1000)
            .assert.containsText('.icon-header', 'Header')

            .waitForElementVisible('.icon-hidden', 1000)
            .assert.containsText('.icon-hidden', 'Hidden Input')

            .waitForElementVisible('.icon-paragraph', 1000)
            .assert.containsText('.icon-paragraph', 'Paragraph')

            .waitForElementVisible('.icon-number', 1000)
            .assert.containsText('.icon-number', 'Number')

            .waitForElementVisible('.icon-radio-group', 1000)
            .assert.containsText('.icon-radio-group', 'Radio Group')

            .waitForElementVisible('.icon-select', 1000)
            .assert.containsText('.icon-select', 'Select')

            .waitForElementVisible('.icon-text', 1000)
            .assert.containsText('.icon-text', 'Text Field')

            .waitForElementVisible('.icon-textarea', 1000)
            .assert.containsText('.icon-textarea', 'Text Area')

        /*
            * NOW, lets move these form fields into the area defined by the selector .stage-wrap and see if they become
            * the child elements of the parent .stage-wrap
            * */
            .moveToElement('.icon-autocomplete',2,2)
            .mouseButtonDown(0)
            .moveToElement('.stage-wrap',10,10)
            .mouseButtonUp(0)
            .useXpath()
                //
                // we can check if there was a successful drag of a form element by verifying the child element is visible
                //
            // .assert.visible('//ul[@class = "frmb"]//li[@class="autocomplete-field"]')
            .useCss()



        client.end();
    }


};