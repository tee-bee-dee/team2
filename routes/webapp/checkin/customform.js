var ObjectId = require('mongodb').ObjectID;
var _ = require('underscore');
var style = require('./../../../lib/style.js');

/**
 * @api {get} Get Account Settings
 * @apiName getBusinessInfo
 * @apiGroup Business Information
 * @apiDescription Takes an req parameter and res parameter and returns the details of a business
 *
 * @apiParam {object} req The Express request object used to access the database,
 * @apiParam {object} res the Express HTTP response
 * @apiParam {object} next The express next object, used to pass control to next matching route
 */

exports.get = function (req, res, next) {
    var business = req.session.business;
    var db = req.db;
    var forms = req.db.get('forms');

    var businessId = business._id;

    forms.find({ business: businessId }, function(err, result) {
      if (!result) return res.redirect('sign');
      var form = result[0].form;
      if (!form) return res.redirect('sign');
      res.render('checkin/customform', {
          form: form,
          companyName: business.companyName,
          bg: business.style.bg,
          logo: business.logo,
          layout: false
      });
    });
};

/**
 * @api {post} customform Get Account Settings
 * @apiName getBuseinssInfo
 * @apiGroup Business Information
 * @apiDescription Takes an req parameter and res parameter and returns the details of a business
 *
 * @apiParam {object} req The Express request object used to access the database,
 * @apiParam {object} res the Express HTTP response
 * @apiParam {object} next The express next object, used to pass control to next matching route
 */

exports.post = function (req, res, next) {
    var db = req.db;
    var appointments = db.get('appointments');
    var forms = db.get('forms');

    var formResponse = [];

    var appointmentId = req.session.appointmentId;
    var business = req.session.business;

    forms.find({ business: business._id }, function(err, result) {
      var form = JSON.parse(result[0].form);
      Object.keys(req.body).map(function(i) {
        var element = _.find(form, function(e) {
          return e.name === i;
        });
        if (element) formResponse.push({ label: element.label, value: req.body[i]});
      });

      // TODO: form response, add all of them to object, both Q and A
      // may have to get the form JSON in db.forms, then match form element name/id with response, and save an array of objects to store { label: '', value: '' }

      appointments.update({ _id: ObjectId(appointmentId) }, { $set: {
        formResponse: formResponse
      }});

      res.redirect('sign');
    });
};
