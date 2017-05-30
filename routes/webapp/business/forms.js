var crypto = require('crypto');
var baby = require('babyparse');
var async = require('async');
// var sendgrid  = require('sendgrid')('robobetty', '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');
var sendgrid = require('sendgrid')('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');
var ObjectId = require('mongodb').ObjectID;



 /**
  * @api {get} forms.get Get Form
  * @apiName FormsGet
  * @apiGroup Forms
  * @apiDescription Gets the forms for a business. (req.body object don't seem to
  * to do anything in this function)
  *
  * @apiParam {object} req The Express request object
  * @apiParam {object} res the Express HTTP response
  * @apiParam (req db) {object} forms forms object from database
  */
exports.get = function(req,res,next){

    var database =  req.db;
    var employeeDB = database.get('employees');
    var businessID = req.user[0].business;
    var name = req.body.inputName;
    var inputEmail = req.body.inputEmail;
    var inputPhone = req.body.inputPhone;
    var forms = req.db.get('forms');

    forms.find({ business: businessID }, function(err, result) {
      if (result === undefined) {
        res.render('business/forms', {
          title: 'Form Editor',
          isOwner: req.user[0].admin,
          businessId: req.user[0].business,
          forms: "active",
          form: ''
        });
        return;
      }

      res.render('business/forms', {
        title: 'Form Editor',
        isOwner: req.user[0].admin,
        businessId: req.user[0].business,
        forms: "active",
        form: result[0].form
      });
    });
}

/**
 * @api {get} forms.get Update Form
 * @apiName FormsPost
 * @apiGroup Forms
 * @apiDescription Update the form for a business based on input
 *
 * @apiParam {object} req The Express request object
 * @apiParam {object} res the Express HTTP response
 * @apiParam (req body) {object} form Input form from the req.body
 */
exports.post = function(req, res, next) {
  var db = req.db;
  var forms = db.get('forms');
  var business = req.user[0].business;

  var form = req.body.form;

  forms.update({ business: business }, { $set: {
    business: business,
    form: form
  }}, { upsert: true });
}
