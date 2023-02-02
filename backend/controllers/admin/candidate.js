const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');

Router.get('/listCandidates',function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('candidates',{}, {}, {}, function(err, result) {
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

Router.post('/viewCandidate',function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetOneDocument('candidates',{_id:req.body.id}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
          response.status   = result.status;
          response.data     = result;
          response.id       = result._id;
          response.applican = result.applicant;
          response.jobTitle = result.jobTitle;
          response.company  = result.company;
        response.appliedDate= result.appliedDate;
          response.remarks  = result.remarks;
          res.send(response);
      }
  });
});

Router.post('/addUpdateCandidate',function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  const applicant = req.body.applicant;
  const jobTitle   = req.body.jobTitle;
  const company = req.body.company;
  const appliedDate = req.body.appliedDate;
  const remarks = req.body.remarks;
  const status   = req.body.status;
  const candidateFormData = {
    applicant  : applicant,
    jobTitle    : jobTitle,
    company:company,
    appliedDate:appliedDate,
    remarks:remarks,
    status    : status
  }
  if(!req.body.id){
    DB.GetOneDocument('candidates', {applicant : applicant}, {}, {}, function(err, result) {
      if(result){
        response.status  = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('candidates', candidateFormData, function(err, result1) {
      console.log(err);
      if(err) {
            res.send(response);
          } else {
            response.status  = 1;
            response.message = 'candidate added successfully';
            response.id      = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('candidates',{_id:req.body.id}, candidateFormData, function(err, result) {
      if(err) {
        res.send(response);
      } else {
        DB.GetOneDocument('candidates', {_id:req.body.id}, {}, {}, function(err, result1) {
            if(err) {
                res.send(response);
            } else {
                  const candidateData = {
                    id         : result1._id,
                    applicant  : result1.applicant,
                    jobTitle    : result1.jobTitle,
                    company:result1.company,
                    appliedDate:result1.appliedDate,
                    remarks:result1.remarks,
                    status     : result1.status
                  }
                  response.status  = 1;
                  response.message = 'candidate updated successfully';
                  response.data    = candidateData;
                res.send(response);
            }
        });
      }
    });
  }
})

Router.post('/deletecandidate',function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  DB.DeleteDocument('candidates', {_id:req.body.id}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        DB.GetDocument('candidates', {}, {}, {}, function(err, result) {
            if(err) {
                res.send(response);
            } else {
                  response.status  = 1;
                  response.message = 'candidate deleted successfully';
                  response.data    = result;
                  response.count   = result.length;
                  res.send(response);
            }
        });
      }
  });
})

module.exports = Router;