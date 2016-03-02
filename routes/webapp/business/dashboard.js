var auth = require('../../../lib/auth');

exports.get = function (req, res) {

	var isPeter = req.user[0].peter
	var employeeId = req.user[0]._id;
	var employeename = req.user[0].fname;

	if( isPeter ) {
		res.render('business/dashboard-admin', {title: 'Express',
			eid: employeeId,
			employeeName: employeename,
			message: req.flash("permission")
		});
	} else {
		res.render('business/dashboard-business', {title: 'Express',
			eid: employeeId,
			employeeName: employeename,
			message: req.flash("permission"),
			isOwner: req.user[0].admin
		});
	}

};
