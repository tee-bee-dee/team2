exports.get = function(req, res) {
	res.render('business/visitor-list', {
		title: "Express",
		isAdmin: req.user[0].admin
	});
}