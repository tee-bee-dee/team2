exports.get = function(req, res) {
  var employees = req.db.get('employees');

  employees.find({ business: req.user[0].business }, function(err, result) {
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

  res.redirect('/scheduleappointment');
};
