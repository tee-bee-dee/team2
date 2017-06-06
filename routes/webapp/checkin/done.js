var style = require('./../../../lib/style.js');
var request = require('request');

/**
 * @api {get} done post to Slack channel
 * @apiName postToSlackChannel
 * @apiGroup Check In
 * @apiDescription Notifies a slack channel when a client checks in
 *
 * @apiParam {object} req The Express request object used to access the database,
 * @apiParam {object} res the Express HTTP response
 * @apiParam {object} next The express next object, used to pass control to next matching route
 */

exports.get = function (req, res, next) {
    var business = req.session.business;

    var slackOptions = {
        uri: 'https://hooks.slack.com/services/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',
        method: 'POST',
        json: {
            "channel": "#bobsburgers",
            "text": "A new client just checked in"
        }
    };

    request(slackOptions, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            console.log(body.id);
        }
    });

    res.render('checkin/done', {
        companyName: business.companyName,
        bg: business.style.bg,
        logo: business.logo,
        buttonBg: style.rgbObjectToCSS(business.style.buttonBg),
        buttonText: style.rgbObjectToCSS(business.style.buttonText),
        containerText: style.rgbObjectToCSS(business.style.containerText),
        containerBg: style.rgbObjectToCSS(business.style.containerBg),
        layout: false
    });
};
