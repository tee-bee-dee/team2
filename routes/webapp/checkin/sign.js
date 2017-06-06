var style = require('./../../../lib/style.js');

/**
 * @api {get} get all appointments
 * @apiName getBusinessInfo
 * @apiGroup Business Information
 * @apiDescription Takes an req parameter and res parameter and returns information of business
 *
 * @apiParam {object} req The Express request object used to access the database,
 * @apiParam {object} res the Express HTTP response
 * @apiParam {object} next The express next object, used to pass control to next matching route
 */

exports.get = function(req, res, next) {
    var business = req.session.business;

    //TODO: Verify that there are results and no errors
    res.render('checkin/sign', {
        disclosure: business.disclosure,
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

exports.post = function (req, res, next) {
    var sig = req.body.sig.trim();
    if (sig === '') {
        var business = req.session.business;

        res.render('checkin/sign', {
            disclosure: business.disclosure,
            error: 'You must provide a signature',
            companyName: business.companyName,
            bg: business.style.bg,
            logo: business.logo,
            buttonBg: style.rgbObjectToCSS(business.style.buttonBg),
            buttonText: style.rgbObjectToCSS(business.style.buttonText),
            containerText: style.rgbObjectToCSS(business.style.containerText),
            containerBg: style.rgbObjectToCSS(business.style.containerBg),
            layout: false
        });
    } else {
        //Update the state of the appointment
        req.db.get('appointments').updateById(req.session.appointmentId, {
            $set: {
                state: 'checkedIn'
            }
        }, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('done');
        });
    }
};
