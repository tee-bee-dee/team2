var request = require('request');

exports.get = function(req, res) {
  var employees = req.db.get('employees');

  employees.find({ business: req.user[0].business, admin: false }, function(err, result) {
    res.render('business/scheduleappointment', {
      title: 'Express',
      isOwner: req.user[0].admin,
      employees: result,
      businessId: req.user[0].business,
      appointments: "active"
    });
  });
};

exports.post = function(req, res) {
  var patient = req.body;
  var business = req.user[0].business;
  var employee = req.user[0]._id;

  var appointments = req.db.get('appointments');

  appointments.insert({
    business: business,
    date: new Date('Thu, 01 Jan 1970 13:00:00 GMT-0500'),
    employee: employee,
    state: 'scheduled',
    fname: patient.inputFirstName,
    lname: patient.inputLastName,
    phone: patient.inputPhone,
    email: patient.inputEmail
  });

  var slackOptions = {
     uri: 'https://hooks.slack.com/services/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',
     method: 'POST',
     json: {
         "channel": "#webhooks",
         "text": patient.inputFirstName + " " + patient.inputLastName + " made an appointment."
     }
  };

  request(slackOptions, function (error, response, body) {
     if(!error && response.statusCode == 200) {
         console.log(body.id);
     }
  });

  res.redirect('/scheduleappointment');
};
