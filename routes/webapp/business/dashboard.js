var auth = require('../../../lib/auth');
var async = require('async');

/**
 * @api {get} dashboard.get Get Dashboard
 * @apiName GetDashboard
 * @apiGroup Dashboard
 * @apiDescription Gets the user's dashboard
 *
 * @apiParam {object} req The Express request object
 * @apiParam {object} res the Express HTTP response
 * @apiParam (req user) {boolean} peter Boolean check if the user is Peter
 * @apiParam (req user) {boolean} admin Boolean check if the user is admin
 * @apiParam (req user) {string} _id The employee ID
 * @apiParam (req user) {string} fname The employee's first name
 * @apiParam (req user) {string} lname The employee's last name
 */
exports.get = function (req, res) {

	var isPeter = req.user[0].peter;
	var isOwner = req.user[0].admin;
	var employeeId = req.user[0]._id;
	var employeename = req.user[0].fname + ' ' + req.user[0].lname;

	if( isPeter ) {
		var db = req.db;
		var businesses = db.get('businesses');

		businesses.find({ email: { $ne: 'peter@enque.com' }}, function(err, businesses) {
			res.render('business/dashboard-admin', {
				title: 'Express',
				eid: employeeId,
				employeeName: employeename,
				businesses: businesses,
				message: req.flash("permission"),
				layout: 'admin',
				dashboard: "active"
			});
		});
	} else if( isOwner ) {
		res.render('business/dashboard-business', {
			title: 'Express',
			eid: employeeId,
			employeeName: employeename,
			message: req.flash("permission"),
			isOwner: isOwner,
			businessId: req.user[0].business,
			layout: 'main',
			dashboard: "active"
		});
	} else {

		var db = req.db;
		var appointments = db.get('appointments');
		var employees = db.get('employees');

		var patientList = [];

		appointments.find({
			business: req.user[0].business
		}, function (errAppt, resultAppts) {
			var filteredAppts = resultAppts.filter( function (elem, i, arr) {
				return elem.state !== "scheduled";
			});

			var itemsProcessed = 0;

			console.log(filteredAppts);
			if( filteredAppts.length ) {
				filteredAppts.forEach( function (elem, i, arr) {
					var apptInfo = {};

					apptInfo.id = elem._id;
					apptInfo.visitor = elem.fname + ' ' + elem.lname;
					apptInfo.apptTime = formatDate(elem.date);
					apptInfo.state = elem.state[0].toUpperCase() + elem.state.substr(1);
					apptInfo.currentTime = formatDate(elem.checkin);
					apptInfo.formResponse = elem.formResponse;
					console.log(apptInfo.formResponse);

					employees.find({
						business: req.user[0].business,
						_id: elem.employee
					}, function (errEmployee, employee) {
						apptInfo.doctor = employee[0].fname;
						patientList.push(apptInfo);
						itemsProcessed++;
						if( itemsProcessed == arr.length ) {
							renderDashboard();
						}
					});
				});
			} else {
				renderDashboard();
			}
		});

		function renderDashboard () {
			res.render('business/visitor-list', {
				title: "Express",
				isAdmin: req.user[0].admin,
				patients: patientList
			});
		}

		function formatDate (date) {
            var unformattedApptTime = new Date(date);
            var formattedHour = unformattedApptTime.getHours() > 12 ? unformattedApptTime.getHours() % 12 : unformattedApptTime.getHours();
            var formattedMinutes = (unformattedApptTime.getMinutes()<10?'0':'') + unformattedApptTime.getMinutes();
            var ampm = unformattedApptTime.getHours() > 12 ? " PM" : " AM";
            var formattedApptTime = formattedHour + ":" + formattedMinutes + ampm;

            return formattedApptTime;
        }
	}

};
