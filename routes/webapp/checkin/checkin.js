var ObjectID = require('mongodb').ObjectID;
var style = require('./../../../lib/style.js');

var request = require('request');

/**
 * @api {get} checkin get all appointments
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

    res.render('checkin/checkin', {
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

/**
 * @api {post} get all appointments
 * @apiName postAppointments
 * @apiGroup Appointments
 * @apiDescription Takes an req parameter and res parameter and returns appointments by business name
 *
 * @apiParam {object} req The Express request object used to access the database,
 * @apiParam {object} res the Express HTTP response
 * @apiParam {object} next The express next object, used to pass control to next matching route
 */

exports.post = function (req, res, next) {
    var db = req.db;
    var io = req.app.io;

    var appointments = db.get('appointments');
    var businesses = db.get('businesses');
    var employees = db.get('employees');

    var business = req.session.business;

    var inputFirst = req.body.inputFirst;
    var inputLast = req.body.inputLast;
    var inputPhone = req.body.inputPhone.replace(/[\(\)-\s]/g, '');

    appointments.find({
        business: ObjectID(req.params.id),
        fname: inputFirst,
        lname: inputLast,
        phone: inputPhone
    }, function(err, result) {

        //TODO: Uncomment this when front end is actually tied to the DB and checking if the appointment is valid
        //TODO: Also need to take out the slack request from the done.js file in the same directory as checkin
        var slackOptions = {
           uri: 'https://hooks.slack.com/services/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',
           method: 'POST',
           json: {
               "channel": "#checkin",
               "text": inputFirst + " " + inputLast + " just checked in."
           }
        };

        request(slackOptions, function (error, response, body) {
           if(!error && response.statusCode == 200) {
               console.log(body.id);
           }
        });

        if (result.length === 0) {
            res.render('checkin/checkin', {
                error: 'No appointment found',
                inputFirst: inputFirst,
                inputLast: inputLast,
                inputPhone: inputPhone,
                layout: false,
                companyName: business.companyName,
                bg: business.style.bg,
                logo: business.logo,
                buttonBg: style.rgbObjectToCSS(business.style.buttonBg),
                buttonText: style.rgbObjectToCSS(business.style.buttonText),
                containerText: style.rgbObjectToCSS(business.style.containerText),
                containerBg: style.rgbObjectToCSS(business.style.containerBg)
            });
            return;
        }
        else {
            var appt = result[0];
            var apptID = appt._id;

            req.session.appointmentId = apptID;
            var currentTime = new Date();
            req.session.save(function (err) {
                if (err) {
                    console.error('Session save error:', err);
                }

                var newAppointment = {
                    visitor: inputFirst + " " + inputLast,
                    apptTime: formatDate(appt.date),
                    currentTime: formatDate(currentTime),
                    status: 'Lobby'
                }

                employees.find({
                    business: appt.business,
                    _id: appt.employee
                }, function (err, results) {
                    newAppointment.doctor = results[0].fname;
                    io.emit('checkin', newAppointment);
                });

                res.redirect('apptinfo');
            });
                    //Update the state of the appointment
            req.db.get('appointments').updateById(req.session.appointmentId, {
                $set: {
                    state: 'lobby',
                    checkin: currentTime
                }
            }, function (err) {
                if (err) {
                    return next(err);
                }
            });
        }

        function formatDate (date) {
            var unformattedApptTime = new Date(date);
            var formattedHour = unformattedApptTime.getHours() > 12 ? unformattedApptTime.getHours() % 12 : unformattedApptTime.getHours();
            var formattedMinutes = unformattedApptTime.getMinutes();
            var ampm = unformattedApptTime.getHours() > 12 ? " PM" : " AM";
            var formattedApptTime = formattedHour + ":" + formattedMinutes + ampm;

            return formattedApptTime;
        }

    });
};
