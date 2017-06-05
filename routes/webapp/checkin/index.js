var express = require('express');
var router = express.Router();

//Define the controllers for checkin process
var checkin = require('./checkin');
var nocode = require('./nocode');
var apptinfo = require('./apptinfo');
var customform = require('./customform');
var sign = require('./sign');
var done = require('./done');

//Setup the routes
router.get('/:id/checkin', updateBusiness, checkin.get);
router.post('/:id/checkin', updateBusiness, checkin.post);

// router.get('/:id/nocode', updateBusiness, nocode.get);
// router.post('/:id/nocode', updateBusiness, nocode.post);

router.get('/:id/apptinfo', updateBusiness, apptinfo.get);

router.get('/:id/customform', updateBusiness, customform.get);
router.post('/:id/customform', updateBusiness, customform.post);

router.get('/:id/sign', updateBusiness, sign.get);
router.post('/:id/sign', updateBusiness, sign.post);

router.get('/:id/done', updateBusiness, done.get);

module.exports = router;

/**
 * @api {render} Update Session information
 * @apiName updateSession
 * @apiGroup Session info
 * @apiDescription Used to set session information about business when logging in. Also
 * provides security by maintaining company session id.
 *
 * @apiParam {object} req The Express request object used to access the database,
 * @apiParam {object} res the Express HTTP response
 * @apiParam {object} next The express next object, used to pass control to next matching route
 */
function updateBusiness(req, res, next) {
    //Simple case: first time on the page
    if (!req.session.business) {
        req.db.get('businesses').findById(req.params.id, function (err, business) {
            if (err) {
                return next(err);
            }
            req.session.business = business;
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                next();
            });
        });
    } else if (req.session.business._id !== req.params.id) {
        //This means the business was switched which could be part of a security attack
        //Destroy the session and then get the new business to be safe
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            }
            req.db.get('businesses').findById(req.params.id, function (err, business) {
                if (err) {
                    return next(err);
                }
                req.session.business = business;
                req.session.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    next();
                });
            });
        });
    } else { //Everything looks good, do nothing
        //next();
        req.db.get('businesses').findById(req.params.id, function (err, business) {
            if (err) {
                return next(err);
            }
            req.session.business = business;
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                next();
            });
        });
    }
}
