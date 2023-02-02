const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
const verifyToken =require('./auth/verifyToken');
Router.get('/listJobs',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('jobs',{}, {}, {}, function(err, result) {
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

Router.post('/viewJob',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetOneDocument('jobs',{_id:req.body.id}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
          response.status  = result.status;
          response.data    = result;
          response.id      = result._id;
          response.role      = result.role;
          response.company      = result.company;
          response.salary        =result.salary;
          response.job_type      = result.job_type;
          response.category      = result.category;
          response.description   = result.description;
          response.vacancy       =result.vacancy;
          response.qualification = result.qualification;
          
          res.send(response);
      }
  });
});

Router.post('/addUpdateJob',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  const role = HELPERFUNC.Capitalize(req.body.role);
  const company   = HELPERFUNC.Capitalize(req.body.company);
  const job_type = HELPERFUNC.Capitalize(req.body.job_type);
  const salary = req.body.salary;
  const category   = HELPERFUNC.Capitalize(req.body.category);
  const description = HELPERFUNC.Capitalize(req.body.description);
  const vacancy = req.body.vacancy;
  const qualification   = HELPERFUNC.Capitalize(req.body.qualification);
  const status   = req.body.status;
  const jobFormData = {
    role:role,
    company:company,
    job_type:job_type,
    salary:salary,
    category:category,
    description:description,
    vacancy:vacancy,
    qualification    : qualification,
    status    : status
  }
  if(!req.body.id){
    DB.GetOneDocument('jobs', {role:role}, {}, {}, function(err, result) {
      if(result){
        response.status  = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('jobs', jobFormData, function(err, result1) {
      console.log(err);
      if(err) {
            res.send(response);
          } else {
            response.status  = 1;
            response.message = 'Job added successfully';
            response.id      = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('jobs',{_id:req.body.id}, jobFormData, function(err, result) {
      if(err) {
        res.send(response);
      } else {
        DB.GetOneDocument('jobs', {_id:req.body.id}, {}, {}, function(err, result1) {
            if(err) {
                res.send(response);
            } else {
                  const jobData = {
                    id         : result1._id,
                    role       : result1.role,
                    company      : result1.company,
                    job_type    :result1.job_type,
                    salary      :result1.salary,
                    category      : result1.category,
                    descritpion    :result1.descritpion,
                    vacancy      :result1.vacancy,
                    qualification     : result1.qualification,
                    status     : result1.status
                  }
                  response.status  = 1;
                  response.message = 'Job updated successfully';
                  response.data    = jobData;
                res.send(response);
            }
        });
      }
    });
  }
})

Router.post('/deleteJob',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  DB.DeleteDocument('jobs', {_id:req.body.id}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        DB.GetDocument('jobs', {}, {}, {}, function(err, result) {
            if(err) {
                res.send(response);
            } else {
                  response.status  = 1;
                  response.message = 'Job deleted successfully';
                  response.data    = result;
                  response.count   = result.length;
                  res.send(response);
            }
        });
      }
  });
})

module.exports = Router;