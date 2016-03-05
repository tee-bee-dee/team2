var auth = require('../../../lib/auth');

exports.get = function (req, res) {

	var isPeter = req.user[0].peter;
	var isOwner = req.user[0].admin;
	var employeeId = req.user[0]._id;
	var employeename = req.user[0].fname + ' ' + req.user[0].lname;

	if( isPeter ) {
		res.render('business/dashboard-admin', {
			title: 'Express',
			eid: employeeId,
			employeeName: employeename,
			message: req.flash("permission"),
			layout: 'admin',
			dashboard: "active"
		});
	} else if( isOwner ) {
		res.render('business/dashboard-business', {
			title: 'Express',
			eid: employeeId,
			employeeName: employeename,
			message: req.flash("permission"),
			isOwner: isOwner,
			businessId: req.user[0].business,
			dashboard: "active"
		});
	} else {
		res.render('business/visitor-list', {
			title: "Express",
			isAdmin: req.user[0].admin,
			patients: "active"
		});
	}

};
