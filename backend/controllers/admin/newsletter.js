const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
const verifyToken =require('./auth/verifyToken');
Router.get('/listNewsletters',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('newsletters',{}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
          response.status  = 1;
          response.data    = result;
          response.count   = result.length;
          res.send(response);
      }
  });
});

Router.post('/viewNewsletter',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetOneDocument('newsletters',{_id:req.body.id}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
          response.status  = result.status;
          response.data    = result;
          response.id      = result._id;
          response.name      = result.name;
          response.subject    = result.subject;
          response.template     = result.template;
          res.send(response);
      }
  });
});

Router.post('/addUpdateNewsletter',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  req.checkBody('name', 'name is required.').notEmpty();
  req.checkBody('subject', 'subject is required.').notEmpty();
  req.checkBody('template', 'template is required.').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  const name = HELPERFUNC.Capitalize(req.body.name);
  const subject   = HELPERFUNC.Capitalize(req.body.subject);
  const template   = HELPERFUNC.Capitalize(req.body.template);
  const status   = req.body.status;
  const newsletterFormData = {
    name  : name,
    subject    : subject,
    template    : template,
    status    : status
  }
  if(!req.body.id){
    DB.GetOneDocument('newsletters', {name : name}, {}, {}, function(err, result) {
      if(result){
        response.status  = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('newsletters', newsletterFormData, function(err, result1) {
      console.log(err);
      if(err) {
            res.send(response);
          } else {
            response.status  = 1;
            response.message = 'Newsletter added successfully';
            response.id      = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('newsletters',{_id:req.body.id}, newsletterFormData, function(err, result) {
      if(err) {
        res.send(response);
      } else {
        DB.GetOneDocument('newsletters', {_id:req.body.id}, {}, {}, function(err, result1) {
            if(err) {
                res.send(response);
            } else {
                  const newsletterData = {
                    id         : result1._id,
                    name       : result1.name,
                    subject       : result1.subject,
                    template       : result1.template,
                    status     : result1.status
                  }
                  response.status  = 1;
                  response.message = 'Newsletter updated successfully';
                  response.data    = newsletterData;
                res.send(response);
            }
        });
      }
    });
  }
})

Router.post('/deleteNewsletter',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  DB.DeleteDocument('newsletters', {_id:req.body.id}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        DB.GetDocument('newsletters', {}, {}, {}, function(err, result) {
            if(err) {
                res.send(response);
            } else {
                  response.status  = 1;
                  response.message = 'Newsletter deleted successfully';
                  response.data    = result;
                  response.count   = result.length;
                  res.send(response);
            }
        });
      }
  });
})

module.exports = Router;
