var crypto = require('crypto');
var baby = require('babyparse');
var async = require('async');
// var sendgrid  = require('sendgrid')('robobetty', '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');
var sendgrid = require('sendgrid')('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');
var ObjectId = require('mongodb').ObjectID;

 /**
  * @api {get} addemployees/get Get Employee
  * @apiName AddEmployeesGet
  * @apiGroup Add Employee
  * @apiDescription Takes a req and res parameters and is inputted into function
	* to get employee, notemployee, and business data.
  *
  * @apiParam {object} req The Express request object used to access the database,
  * @apiParam {object} res the Express HTTP response
  */
exports.get = function(req,res){
	      var database =  req.db;
        var employeeDB = database.get('employees');
        var employee;
        var notemployee;
        var businessID = req.user[0].business.toString();

        async.parallel({
            employee: function(cb) {
                employeeDB.find({
                    registrationToken: {$exists: false},
                    business: ObjectId(businessID)
                }, function (err,results){
                        if( err ) { return next(err); }
                        if( !results ) { return next(new Error('Error finding employee')); }

                        employeee = results;
                        cb();
                });
            },
            nonemployee: function(cb) {
                employeeDB.find({
                    registrationToken: {$exists: true},
                    business: ObjectId(businessID)}, function (err,results){

                    if (err) {
                        console.log("Error finding nonemployees")
                        return next(err);
                    }
                    if(!results) {
                        return next(new Error('Error finding employee'));
                    }

                     notemployee = results;
                    //  console.log('Found some not-registered employees');
                    //  console.log(notemployee);
                     cb();
                });
            }
        },

        function(err,results){

            if(err){
                throw err;
            }

            res.render('business/addemployees', {
                title: 'Employees',
                notsigned: notemployee,
                signed: employeee,
                isOwner: req.user[0].admin,
                businessId: req.user[0].business,
                employees: "active"
            });

        });
}

 /**
  * @api {post} addemployees/post Edit Employee
  * @apiName AddEmployeesPost
  * @apiGroup Add Employee
  * @apiDescription Takes a req and res parameters and is inputted into function to get employee, notemployee, and business data.
  * Allows the User to input specified data and make changes
  *
  * @apiParam {object} req The Express request object
  * @apiParam {object} res the Express HTTP response
	* @apiParam (req body) {string} inputName The input name for the employee
	* @apiParam (req body) {string} inputEmail The input email for the employee
	* @apiParam (req body) {string} inputPhone the input phone number for the employee
  */
exports.post = function(req,res,next){

    var database =  req.db;
    var employeeDB = database.get('employees');
    var businessID = req.user[0].business;
    var name = req.body.inputName;
    var inputEmail = req.body.inputEmail;
    var inputPhone = req.body.inputPhone;

    var token = randomToken();

    var salt = crypto.randomBytes(128).toString('base64');
    var password;

    crypto.pbkdf2('password', salt, 10000, 512, function(err, dk) {
        password = dk;
        employeeDB.insert({
            business: businessID,
            fname: name,
            email: inputEmail,
            phone: inputPhone,
            registrationToken : token,
            admin: false,
            // password: password
            // need to create a randomly generated bCrypted Password
        });
        // can't use variables in an object's field. Instead, create the field outside, then put it as the text argument in sendgrid
        var emailContent = 'Hello ' + name + ', \n\n' + 'Please click on the following link, or paste this into your browser to complete sign-up the process: ' + 'http://tbd-team2.herokuapp.com/employeeregister?token=' + token;

        sendgrid.send({
            to: inputEmail,
            from: 'test@localhost.com',
            subject: 'Employee Signup',
            text: emailContent
        }, function (err){
            if (err) {
                return next(err);
            }
        });

        res.redirect('/addemployees');
    });
}

// OLD GOLD TEAM CODE
/*exports.post = function(req,res){
    var parsed = baby.parse(req.body.csvEmployees);
    var rows = parsed.data;
    var database =  req.db;
    var employeeDB = database.get('employees');
    var businessID = req.user[0].business;


    for(var i = 0; i < rows.length; i++){
        var username = rows[i][0];
        var email = rows[i][1];
        var nameArr = username.split(' ');
        var fname = nameArr[0];
        var lname = nameArr[1];
        var token = randomToken();
        employeeDB.insert({
            business: ObjectId(businessID),
            fname: fname,
            lname: lname,
            email: email,
            registrationToken : token,
            admin: false
        });


        sendgrid.send({
            to: email,
            from: 'test@localhost',
            subject: 'Employee Signup',
            text: 'Hello ' + username + ',\n\n' + 'Please click on the following link, or paste this into your browser to complete sign-up the process: \n\n' +
            'http://robobetty-dev.herokuapp.com/employeeregister?token=' + token
        }, function (err){
            if (err) {
                return next(err);
            }
        });
    }
    res.redirect('/addemployees');
}*/


 function randomToken() {
        return crypto.randomBytes(24).toString('hex');
    }
