var auth = require('../../../lib/auth');
var _ = require('underscore');
var fs = require('fs');
var imgur = require('imgur');

/**
 * Credit to Stack Overflow user, https://stackoverflow.com/users/1047797/david, for the RGB and hex code.
 *
 * Link: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 */

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

imgur.setClientId('b67dffd2dbe1ea5');

/**
 * @api {get} accountsettings.get Get Account Settings
 * @apiName accountSettingsGet
 * @apiGroup Account Settings
 * @apiDescription Takes an req parameter and res parameter and returns the details of a particular employee.
 *
 * @apiParam {object} req The Express request object used to access the database,
 * @apiParam {object} res the Express HTTP response
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
                message: req.flash("permission"),
            });

        }
    );


};

/**
 * @api {post} accountsettings.post Set Account Settings
 * @apiName AccountSettingsPost
 * @apiGroup Account Settings
 * @apiDescription Takes an req parameter and res parameter and returns the details of a particular employee. The user
 * is then prompted to change any of the information presented.
 * @apiParam {Object} req The Express request object containing the user input account settings
 * @apiParam {Object} res The Express HTTP response
 * @apiParam (req body) {String} oldPassword User's old password
 * @apiParam (req body) {String} editPassword User's new password input
 * @apiParam (req body) {String} editPassword2 User's new password confirmation
 * @apiParam (req body) {String} editName User's new name
 * @apiParam (req body) {String} editPhone User's new phone number
 */
exports.post = function (req, res) {


    var db = req.db;
    var employees = db.get('employees');
    var eid = req.user[0]._id;

    var inputOldPass = req.body.oldPassword;
    var inputPass    = req.body.editPassword;
    var inputPass2   = req.body.editPassword2;
    var inputName    = req.body.editName;
    var inputEmail   = req.body.editEmail;
    var inputPhone   = req.body.editPhone;
    var textNotify   = req.body.sendText;
    var emailNotify  = req.body.sendEmail;

    if (inputPass != null)
    {
        hashedInputPass = auth.hashPassword(inputPass);
        if (inputPass != inputPass2) {
            render(req, res, {
                alert: 'Passwords do not match'
            })
            return;
        } else {

            employees.find({_id: eid}, function (err2, result) {
                var emp = result[0];
                if (!auth.validPassword(emp.password, inputOldPass)) {
                    render(req, res, {
                        alert: 'Incorrect password'
                    })
                    return;
                } else {

                    employees.findAndModify({_id: eid}, {$set: {password: hashedInputPass}}, function (err, data) {
                        if (err) {
                            return handleError(res, err);
                        }

                        render(req, res, {
                            edited: 'Password successfully changed!'
                        });
                        return;
                    });
                }
            })
        }
    }

    if (inputPhone != null || inputEmail != null || inputName != null)
    {



        var setContactInfo = {};

        if (inputPhone != null) {
            inputPhone = inputPhone.replace(/-/g, '');
            if (inputPhone.length === 10) {
                inputPhone = '1' + inputPhone;
            } else {
                render(req, res, {
                    alert: 'Incorrect phone number format'
                });
                return;
            }
            setContactInfo.phone = inputPhone;
        }

        if (inputEmail != null) {
            setContactInfo.email = inputEmail;
        }

        if (inputName != null) {
            var splitName = inputName.split(' ');
            if (splitName.length === 2) {
                setContactInfo.fname = splitName[0];
                setContactInfo.lname = splitName[1];
            } else {
                render(req, res, {
                    alert: 'Please format name as <firstname> <lastname>'
                });
                return;
            }
        }

        employees.findAndModify({_id: eid}, { $set: setContactInfo}, function(err, data)
        {
            if (err) { return handleError(res, err);}


            render(req, res, {
                edited: 'Contact info saved.'
            });
            return;
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

/**
 * @api {post} accountSettings.setCompanyInfo Set Company Info
 * @apiName setCompanyInfo
 * @apiGroup Account Settings
 * @apiDescription Function to set company name and phone number
 *
 * @apiParam {object} req The Express request object
 * @apiParam {object} res The Express HTTP response
 * @apiParam (req body) {string} companyName The newly input company name
 * @apiParam (req body) {string} phone The newly input company phone number
 */
exports.setCompanyInfo = function (req, res) {

    var db = req.db;
    var businesses = db.get('businesses');
    var bid = req.user[0].business;

    var companyName = req.body.companyName;
    var phone = req.body.phone;


    if (companyName != null || phone != null)
    {

        var setCompanyInfo = {};

        if (phone != null) {
            phone = phone.replace(/-/g, '');
            if (phone.length === 10) {
                phone = '1' + phone;
            } else {
                render(req, res, {
                    alert: 'Incorrect phone number format'
                });
                return;
            }
            setCompanyInfo.phone = phone;
        }

        if (companyName != null) {
            setCompanyInfo.companyName = companyName;
        }

        businesses.update({_id: bid}, { $set: setCompanyInfo}, function(err, data)
        {
            if (err) { return handleError(res, err);}


            render(req, res, {
                edited: 'Company info saved.'
            });
            return;
        });
    }

};

/**
 * @api {post} accountSettings.uploadLogo Upload Logo
 * @apiName uploadLogo
 * @apiGroup Account Settings
 * @apiDescription Uploads a new logo for an account
 *
 * @apiParam {object} req The Express request object used to access the database,
 * @apiParam {object} res the Express HTTP response
 * @apiParam (req) {object} db Database information in req
 * @apiParam (req files) {file} userLogo The userLogo image
 */
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
            }
        );
        imgur.uploadFile(req.files.userLogo.path)
            .then(function (json) {
                businesses.updateById(businessID, {
                        $set: {
                            logo: json.data.link
                        }
                    },{
                        upsert: true
                    }, function (err){
                        if (err) {
                            return next(err);
                        }

                        render(req, res, {
                            edited:'Succesfully uploaded file: '+req.files.userLogo.originalname,
                            logo: json.data.link
                        });
                    }

                );
            })
            .catch(function (caughtErr) {
                return next(caughtErr);
            });

    } else {
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
 * @api {render} accountSettings.signinBackground Set Sign In Background Color
 * @apiName signinBackground
 * @apiGroup Account Settings
 * @apiDescription Function to set the sign in backgroun color for a business
 *
 * @apiParam {object} req The Express request object
 * @apiParam {object} res The Express HTTP response
 * @apiParam (req body) {hex} color The input background color in hexadecimal form
 */
exports.signinBackground = function(req, res) {
	var db = req.db;
	var businesses = db.get('businesses');
	var bid = req.user[0].business;

	var hex = req.body.color;

	var bg = hexToRgb(hex);

	businesses.update({_id: bid}, { $set: { 'style.bg': bg }}, function(err, data) {
		if (err)
			return handleError(res, err);

		render(req, res, {
			edited: 'Sign-in background color saved.'
		});

		return;
	});
}

/**
 * @api {render} accountSetting.render Render Account settings
 * @apiName AccountSettingsRender
 * @apiGroup Account Settings
 * @apiDescription Function to render the Account Settings page
 *
 * @apiParam {object} req The Express request object
 * @apiParam {object} res The Express HTTP response
 * @apiParam {object} additionalFields An object with the different fields to render (e.g. alert or message)
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
                var companyPhone = business.phone;
                companyPhone = (companyPhone.length === 11) ? companyPhone.replace('1', '') : companyPhone;
                        companyPhone = companyPhone.slice(0, 3) + '-' + companyPhone.slice(3, 6) + '-' + companyPhone.slice(6);

								var bg = business.style.bg;
								var color = rgbToHex(bg.r, bg.g, bg.b);


                var defaultFields = {
                    settings: 'active',
                    title: 'Settings',
                    fname: emp.fname,
                    lname: emp.lname,
                    employeeName: emp.fname+' '+emp.lname,
                    isAdmin: emp.admin,
                    password: emp.password,
                    phone: phone,
                    email: emp.email,
                    smsNotify: emp.smsNotify,
                    emailNotify: emp.emailNotify,
                    admin: emp.admin,
                    logo: business.logo ? business.logo : null,
                    bg: color,
                    companyName: business.companyName,
                    companyPhone: companyPhone
                };

                var allFields = _.extend(defaultFields, additionalFields);

                if( req.user[0].peter ) {
                    _.extend(allFields, {
                        layout: 'admin'
                    });
                } else {
                    _.extend(allFields, {
                        isOwner: req.user[0].admin,
                        businessId: req.user[0].business
                    });
                }

                res.render('business/accountsettings', allFields);
            });
        }
    );
}
