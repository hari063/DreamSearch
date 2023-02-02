const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
const verifyToken =require('./auth/verifyToken');
Router.get('/listCompanies',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('companies',{}, {}, {}, function(err, result) {
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

Router.post('/viewCompany',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetOneDocument('companies',{_id:req.body.id}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
          response.status  = result.status;
          response.data    = result;
          response.id      = result._id;
          response.name      = result.name;
          response.ceo_name      = result.ceo_name;
          response.description =result.description;
          response.address =result.address;
          response.contact =result.contact;
          res.send(response);
      }
  });
});

Router.post('/addUpdateCompany',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  const name = HELPERFUNC.Capitalize(req.body.name);
  const ceo_name   = HELPERFUNC.Capitalize(req.body.ceo_name);
  const description   = HELPERFUNC.Capitalize(req.body.description);
  const status   = req.body.status;
  const address   = req.body.address;
  const contact   = req.body.contact;
  const companyFormData = {
    name  : name,
    ceo_name    : ceo_name,
description:description,
    status    : status,
    address:address,
    contact:contact,
  }
  if(!req.body.id){
    DB.GetOneDocument('companies', {name : name}, {}, {}, function(err, result) {
      if(result){
        response.status  = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('companies', companyFormData, function(err, result1) {
      console.log(err);
      if(err) {
            res.send(response);
          } else {
            response.status  = 1;
            response.message = 'Company added successfully';
            response.id      = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('companies',{_id:req.body.id}, companyFormData, function(err, result) {
      if(err) {
        res.send(response);
      } else {
        DB.GetOneDocument('companies', {_id:req.body.id}, {}, {}, function(err, result1) {
            if(err) {
                res.send(response);
            } else {
                  const companyData = {
                    id         : result1._id,
                    name       : result1.name,
                    ceo_name       : result1.ceo_name,
                    description:result1.description,
                   status     : result1.status,
                   address:result1.address,
                   contact     : result1.contact
                  
                  }
                  response.status  = 1;
                  response.message = 'Company updated successfully';
                  response.data    = companyData;
                res.send(response);
            }
        });
      }
    });
  }
})

Router.post('/deleteCompany',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  DB.DeleteDocument('companies', {_id:req.body.id}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        DB.GetDocument('companies', {}, {}, {}, function(err, result) {
            if(err) {
                res.send(response);
            } else {
                  response.status  = 1;
                  response.message = 'Company deleted successfully';
                  response.data    = result;
                  response.count   = result.length;
                  res.send(response);
            }
        });
      }
  });
})

module.exports = Router;