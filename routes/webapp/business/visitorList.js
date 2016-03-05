exports.get = function(req, res) {
	res.render('visitor-list', {
		title: "Express",
		isAdmin: req.user[0].admin
	});
}