var ObjectId = require('mongodb').ObjectID;
var request = require('request');
var accountSid = 'AC5d8856fa6e558decc9a6576322291570';
var authToken = 'f2c480c041deb944218ffe43e9e1c045';
var client = require('twilio')(accountSid, authToken);

exports.get = function(req, res) {
  var employees = req.db.get('employees');

  employees.find({ business: req.user[0].business, admin: false }, function(err, result) {
    res.render('business/scheduleappointment', {
      title: 'Schedule Appointment',
      isOwner: req.user[0].admin,
      employees: result,
      businessId: req.user[0].business,
      appointments: "active"
    });
  });
};

/**
 * @api {post} scheduleappointment/post Schedule New Appointment
 * @apiName ScheduleAppointmentPost
 * @apiGroup Schedule Appointment
 * @apiDescription Schedules a new appointment fo the business
 *
 * @apiParam {object} req The Express request object
 * @apiParam {object} res the Express HTTP response
 */
exports.post = function(req, res) {
  var patient = req.body;
  var business = req.user[0].business;
  var employee = req.user[0]._id;

  var appointments = req.db.get('appointments');

  appointments.insert({
    business: business,
    date: new Date('Thu, 01 Jan 1970 13:00:00 GMT-0500'),
    employee: ObjectId(patient.inputEmployee),
    state: 'scheduled',
    fname: patient.inputFirstName,
    lname: patient.inputLastName,
    phone: patient.inputPhone,
    email: patient.inputEmail,
    date: patient.inputDate,
    time: patient.inputTime
  });

  var slackOptions = {
     uri: 'https://hooks.slack.com/services/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',
     method: 'POST',
     json: {
         "channel": "#appointments",
         "text": patient.inputFirstName + " " + patient.inputLastName + " made an appointment with " + patient.inputEmployee + "."
     }
  };

  request(slackOptions, function (error, response, body) {
     if(!error && response.statusCode == 200) {
         console.log(body.id);
     }
  });

  client.messages.create({
    to: '+1' + patient.inputPhone,
    from: '+16572206491',
    body: "Thank you " + patient.inputFirstName + " for scheduling with " + patient.inputEmployee
  }, function(err, message){
    if(err){
      console.log(err);
    } else{
      console.log(message.sid);
    }
  });

  res.redirect('/scheduleappointment');
};
