const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
const verifyToken =require('./auth/verifyToken');
Router.get('/listPayments',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('payments',{}, {}, {}, function(err, result) {
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

Router.post('/viewPayment',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetOneDocument('payments',{_id:req.body.id}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
          response.status  = result.status;
          response.data    = result;
          response.id      = result._id;
          response.name      = result.name;
          response.mode     = result.mode;
          res.send(response);
      }
  });
});

Router.post('/addUpdatePayment',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  req.checkBody('name', 'name is required.').notEmpty();
  req.checkBody('mode', 'mode is required.').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  const name = HELPERFUNC.Capitalize(req.body.name);
  const mode   = req.body.mode;
  const status   = req.body.status;
  const paymentFormData = {
    name  : name,
    mode    : mode,
    status    : status
  }
  if(!req.body.id){
    DB.GetOneDocument('payments', {name : name}, {}, {}, function(err, result) {
      if(result){
        response.status  = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('payments', paymentFormData, function(err, result1) {
      console.log(err);
      if(err) {
            res.send(response);
          } else {
            response.status  = 1;
            response.message = 'Payment added successfully';
            response.id      = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('payments',{_id:req.body.id}, paymentFormData, function(err, result) {
      if(err) {
        res.send(response);
      } else {
        DB.GetOneDocument('payments', {_id:req.body.id}, {}, {}, function(err, result1) {
            if(err) {
                res.send(response);
            } else {
                  const paymentData = {
                    id         : result1._id,
                    name       : result1.name,
                    mode       : result1.mode,
                    status     : result1.status
                  }
                  response.status  = 1;
                  response.message = 'Payment updated successfully';
                  response.data    = paymentData;
                res.send(response);
            }
        });
      }
    });
  }
})

Router.post('/deletePayment',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  DB.DeleteDocument('payments', {_id:req.body.id}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        DB.GetDocument('payments', {}, {}, {}, function(err, result) {
            if(err) {
                res.send(response);
            } else {
                  response.status  = 1;
                  response.message = 'Payment deleted successfully';
                  response.data    = result;
                  response.count   = result.length;
                  res.send(response);
            }
        });
      }
  });
})

module.exports = Router;
