const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
const verifyToken =require('./auth/verifyToken');
Router.get('/listCurrencies',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('currencies',{}, {}, {}, function(err, result) {
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

Router.post('/viewCurrency',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetOneDocument('currencies',{_id:req.body.id}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
          response.status  = result.status;
          response.data    = result;
          response.id      = result._id;
          response.name      = result.name;
          response.code      = result.code;
          res.send(response);
      }
  });
});

Router.post('/addUpdateCurrency',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  req.checkBody('name', 'name is required.').notEmpty();
  req.checkBody('code', 'code is required.').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  const name = HELPERFUNC.Capitalize(req.body.name);
  const code   = HELPERFUNC.UpperCase(req.body.code);
  const status   = req.body.status;
  const currencyFormData = {
    name  : name,
    code    : code,
    status    : status
  }
  if(!req.body.id){
    DB.GetOneDocument('currencies', {name : name}, {}, {}, function(err, result) {
      if(result){
        response.status  = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('currencies', currencyFormData, function(err, result1) {
      console.log(err);
      if(err) {
            res.send(response);
          } else {
            response.status  = 1;
            response.message = 'Currency added successfully';
            response.id      = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('currencies',{_id:req.body.id}, currencyFormData, function(err, result) {
      if(err) {
        res.send(response);
      } else {
        DB.GetOneDocument('currencies', {_id:req.body.id}, {}, {}, function(err, result1) {
            if(err) {
                res.send(response);
            } else {
                  const currencyData = {
                    id         : result1._id,
                    name       : result1.name,
                    code       : result1.code,
                    status     : result1.status
                  }
                  response.status  = 1;
                  response.message = 'Currency updated successfully';
                  response.data    = currencyData;
                res.send(response);
            }
        });
      }
    });
  }
})

Router.post('/deleteCurrency',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  DB.DeleteDocument('currencies', {_id:req.body.id}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        DB.GetDocument('currencies', {}, {}, {}, function(err, result) {
            if(err) {
                res.send(response);
            } else {
                  response.status  = 1;
                  response.message = 'Currency deleted successfully';
                  response.data    = result;
                  response.count   = result.length;
                  res.send(response);
            }
        });
      }
  });
})

module.exports = Router;