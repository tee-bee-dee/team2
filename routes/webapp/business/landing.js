/**
 * @api {get} landing.get Get Landing Page
 * @apiName LandingGet
 * @apiGroup Landing
 * @apiDescription Renders the business landing page
 *
 * @apiParam {object} req The Express request object
 * @apiParam {object} res the Express HTTP response
 * @apiParam {function} next The Express next function
 */
exports.get = function (req, res, next) {

	req.session.companyName = null;

	req.session.save(function (err) {

            if (err) {

                return next(err);
            }
        });

    res.render('business/landing', {
        title: 'Landing Page',
        layout: false
    });
};

/**
 * @api {get} landing.post Post Landing Page
 * @apiName LandingPost
 * @apiGroup Landing
 * @apiDescription Set the company name on landing page
 *
 * @apiParam {object} req The Express request object
 * @apiParam {object} res the Express HTTP response
 * @apiParam {function} next The Express next function
 * @apiParam (req body) {string} companyName The companyName
 */
exports.post = function (req, res, next) {
    var companyName = req.body.companyName;

    if (companyName === '') {

        res.redirect('/register');
    } else {

        req.session.companyName = companyName;

        req.session.save(function (err) {

            if (err) {

                return next(err);
            }

            res.redirect('/register');
        });
    }
};
