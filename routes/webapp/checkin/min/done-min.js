var style = require('./../../../lib/style.js');

/**
 * @api {get} checkin.post get all appointments
 * @apiName getBusinessInfo
 * @apiGroup Business Information
 * @apiDescription Takes an req parameter and res parameter and returns information of business
 *
 * @apiParam {object} req The Express request object used to access the database,
 * @apiParam {object} res the Express HTTP response
 * @apiParam {object} next The express next object, used to pass control to next matching route
 */
 
exports.get = function (req, res, next) {
    var business = req.session.business;

    res.render('checkin/done', {
        companyName: business.companyName,
        bg: business.style.bg,
        logo: business.logo,
        buttonBg: style.rgbObjectToCSS(business.style.buttonBg),
        buttonText: style.rgbObjectToCSS(business.style.buttonText),
        containerText: style.rgbObjectToCSS(business.style.containerText),
        containerBg: style.rgbObjectToCSS(business.style.containerBg),
        layout: false,
    });
};
