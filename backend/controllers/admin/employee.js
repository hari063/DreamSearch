const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
const verifyToken =require('./auth/verifyToken');
Router.get('/listEmployees',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('employees',{}, {}, {}, function(err, result) {
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

Router.post('/viewEmployee',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetOneDocument('employees',{_id:req.body.id}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
          response.status  = result.status;
          response.data    = result;
          response.id      = result._id;
          response.empid      = result.empid;
          response.name      = result.name;
          response.address =result.address;
          response.sex=result.sex;
          response.dob=result.dob;
          response.contactNo=result.contactNo;
          response.email=result.email;
          response.companyName=result.companyname;
          res.send(response);
      }
  });
});

Router.post('/addUpdateEmployee',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  const empid = req.body.empid;
  const name   = HELPERFUNC.Capitalize(req.body.name);
  const address   = HELPERFUNC.Capitalize(req.body.address);
  const sex   = HELPERFUNC.Capitalize(req.body.sex);
  const dob   = req.body.dob;
  const contactNo   = req.body.contactNo;
  const email   = req.body.email;
  const companyName   = HELPERFUNC.Capitalize(req.body.companyName);
  const status   = req.body.status;
  const employeeFormData = {
    empid     : empid,
    name      : name,
    address   : address,
    sex       : sex,
    dob       : dob,
    contactNo : contactNo,
    email     : email,
    companyName: companyName,
    status     : status
  }
  if(!req.body.id){
    DB.GetOneDocument('employees', {name : name}, {}, {}, function(err, result) {
      if(result){
        response.status  = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('employees', employeeFormData, function(err, result1) {
      console.log(err);
      if(err) {
            res.send(response);
          } else {
            response.status  = 1;
            response.message = 'Employee added successfully';
            response.id      = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('employees',{_id:req.body.id}, employeeFormData, function(err, result) {
      if(err) {
        res.send(response);
      } else {
        DB.GetOneDocument('employees', {_id:req.body.id}, {}, {}, function(err, result1) {
            if(err) {
                res.send(response);
            } else {
                  const employeeData = {
                    id         : result1._id,
                    empid     : result1.empid,
                    name      : result1.name,
                    address   : result1.address,
                    sex       : result1.sex,
                    dob       : result1.dob,
                    contactNo : result1.contactNo,
                    email     : result1.email,
                    companyName: result1.companyName,
                    status     : result1.status
                  }
                  response.status  = 1;
                  response.message = 'Employee updated successfully';
                  response.data    = employeeData;
                res.send(response);
            }
        });
      }
    });
  }
})

Router.post('/deleteEmployee',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  DB.DeleteDocument('employees', {_id:req.body.id}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        DB.GetDocument('employees', {}, {}, {}, function(err, result) {
            if(err) {
                res.send(response);
            } else {
                  response.status  = 1;
                  response.message = 'Employee deleted successfully';
                  response.data    = result;
                  response.count   = result.length;
                  res.send(response);
            }
        });
      }
  });
})

module.exports = Router;