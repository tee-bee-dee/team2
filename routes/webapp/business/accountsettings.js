var auth = require('../../../lib/auth');
var _ = require('underscore');
var fs = require('fs');

/**
 * Takes an req parameter and res parameter and returns the details of a particular employee.
 *
 * @param req The req parameter used to access the database,
 * @returns title, fname, lname, password, phone, email, smsNotify, emailNotify
 */
exports.get = function (req,res) {
	var eid = req.user[0]._id;
    var businessID = req.user[0].business;
    var db = req.db;
    var employees = db.get('employees');
    var businesses = db.get('businesses');

    businesses.findById(businessID,
        function (err, business){
            if(err){
                return next(err);
            }

            render(req, res, {
                message: req.flash("permission")
            });
        }
    );


};

/**
 * Takes an req parameter and res parameter and returns the details of a particular employee. The user
 * is then prompted to change any of the information presented.
 *
 * @param req The req parameter used to access the database,
 * @returns title, fname, lname, password, phone, email, smsNotify, emailNotify
 */
exports.post = function (req, res) {


    var db = req.db;
    var employees = db.get('employees');
    var eid = req.user[0]._id;

    var inputOldPass = req.body.oldPassword;
    var inputPass = req.body.editPassword;
    var inputPass2 = req.body.editPassword2;
    var inputEmail = req.body.editEmail;
    var inputPhone = req.body.editPhone;
    var textNotify = req.body.sendText;
    var emailNotify = req.body.sendEmail;

    if (inputPass != null)
    {
        hashedInputPass = auth.hashPassword(inputPass);
        if (inputPass != inputPass2) {
            render(req, res, {
                alert: 'Passwords do not match'
            })
        } else {

            employees.find({_id: eid}, function (err2, result) {
                var emp = result[0];
                if (!auth.validPassword(emp.password, inputOldPass)) {
                    render(req, res, {
                        alert: 'Incorrect password'
                    })
                } else {

                    employees.findAndModify({_id: eid}, {$set: {password: hashedInputPass}}, function (err, data) {
                        if (err) {
                            return handleError(res, err);
                        }

                        render(req, res, {
                            edited: 'Password successfully changed!'
                        });
                    });
                }
            })
        }
    }

    // if (inputEmail != null)
    // {
    //     employees.findAndModify({_id: eid}, { $set: {email: inputEmail}}, function(err, data)
    //     {
    //         if (err) { return handleError(res, err);}

    //         render(req, res, {
    //             edited: 'Email successfully changed!'
    //         });
    //     });
    // }

    // if (inputPhone != null)
    // {
    //     inputPhone = inputPhone.replace(/-/g, '');

    //     if (inputPhone.length === 10)
    //     {
    //         inputPhone = '1' + inputPhone;
				// 		employees.findAndModify({_id: eid}, { $set: {phone: inputPhone}}, function(err, data)
    //         {
    //             if (err) { return handleError(res, err);}


    //             render(req, res, {
    //                 edited: 'Phone number successfully changed!'
    //             });
    //         });
    //     }
    //     else
    //     {
    //         render(req, res, {
    //             alert: 'Incorrect phone number format'
    //         });
    //     }
    // }

    if (inputPhone != null || inputEmail != null)
    {
    


        var phoneAndEmail = {};

        if (inputPhone != null) {
            inputPhone = inputPhone.replace(/-/g, '');
            if (inputPhone.length === 10) {
                inputPhone = '1' + inputPhone;
            } else {
                render(req, res, {
                    alert: 'Incorrect phone number format'
                });
            }
            phoneAndEmail.phone = inputPhone;
        }

        if (inputEmail != null) {
            phoneAndEmail.email = inputEmail;
        }

        employees.findAndModify({_id: eid}, { $set: phoneAndEmail}, function(err, data)
        {
            if (err) { return handleError(res, err);}


            render(req, res, {
                edited: 'Contact info saved.'
            });
        });
    }

    if (textNotify != null)
    {
        if (textNotify === '0')
        {
            var smsSet = false;
        }
        else
        {
            var smsSet = true;
        }

        employees.findAndModify({_id: eid}, { $set: {smsNotify: smsSet}}, function(err, data)
        {
            if (err) { return handleError(res, err);}
	        
            render(req, res, {
                edited: 'SMS notification settings successfully changed!'
            });
        });
    }

    if (emailNotify != null)
    {
        if (emailNotify === '0')
        {
            var emailSet = false;
        }
        else
        {
            var emailSet = true;
        }
	    //find the appropriate employee to set the email and notification settings
        employees.findAndModify({_id: eid}, { $set: {emailNotify: emailSet}}, function(err, data)
        {
            if (err) { return handleError(res, err);}

                render(req, res, {
                    edited: 'Email notification settings successfully changed!'
                });
        });
    }

};


exports.uploadLogo = function(req, res, next){

    var db = req.db;
    var businesses = db.get('businesses');
    var businessID = req.user[0].business;

    if(req.files.userLogo){

        businesses.findById(businessID,
            function (err, results){

                if(err){
                    return next(err);
                }

                fs.unlink('public/'+results.logo);
            }
        );

        businesses.updateById(businessID, {
                $set: {
                    logo: '/images/uploads/' + req.files.userLogo.name
                }
            },{
                upsert: true
            }, function (err){
                if (err) {
                    return next(err);
                }

                render(req, res, {
                    edited:'Succesfully uploaded file: '+req.files.userLogo.originalname,
                    logo:'/images/uploads/'+req.files.userLogo.name
                });
            }

        );
    }
    else{

        businesses.findById(businessID,
            function (err, results){
                if(err){
                    return next(err);
                }

                if(results.logo){

                    render(req, res, {
                        alert:'Please select a valid image(png,jpg) file to upload.'
                    });
                }
                else{
                    render(req, res, {
                        alert:'Please select a valid image(png,jpg) file to upload.'
                    });
                }
            }
        );
    }

};


/**
 * Helper function to render the settings page
 *
 * @param req
 * @param res
 * @param additionalFields An object with the different fields to render (e.g. alert or message)
 */
function render(req, res, additionalFields) {
    var eid = req.user[0]._id;
    var businessID = req.user[0].business;
    var db = req.db;
    var employees = db.get('employees');
    var businesses = db.get('businesses');

    businesses.findById(businessID,
        function (err, business){
            if(err){
                return next(err);
            }

            //calls find method to find the correct employee to pull results
            employees.find({_id: eid}, function (err2, result) {
                var emp = result[0];
                var phone = emp.phone;
                phone = phone.replace('1', '');
                        phone = phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6);

                var defaultFields = {
                    title: 'Express',
                    fname: emp.fname,
                    lname: emp.lname,
                    password: emp.password,
                    phone: phone,
                    email: emp.email,
                    smsNotify: emp.smsNotify,
                    emailNotify: emp.emailNotify,
                    admin: emp.admin,
                    logo: business.logo ? business.logo : null,
                    bg: business.style.bg ? business.style.bg : null
                };
                var allFields = _.extend(defaultFields, additionalFields);

                res.render('business/settings', allFields);
            });
        }
    );
}