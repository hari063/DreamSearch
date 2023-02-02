const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
const verifyToken =require('./auth/verifyToken');
Router.get('/listFaqs',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('faqs',{}, {}, {}, function(err, result) {
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

Router.post('/viewFaq',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetOneDocument('faqs',{_id:req.body.id}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        response.status  = result.status;
        response.data    = result;
        response.id      = result._id;
        response.question      = result.question;
        response.answer      = result.answer;
          res.send(response);
      }
  });
});

Router.post('/addUpdateFaq',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  req.checkBody('question', 'question is required.').notEmpty();
  req.checkBody('answer', 'answer is required.').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  const question =HELPERFUNC.Capitalize( req.body.question);
  const answer   =HELPERFUNC.Capitalize( req.body.answer);
  const status   = req.body.status;
  const faqFormData = {
    question  : question,
    answer    : answer,
    status    : status
  }
  if(!req.body.id){
    DB.GetOneDocument('faqs', {question : question}, {}, {}, function(err, result) {
      if(result){
        response.status  = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('faqs', faqFormData, function(err, result1) {
      console.log(err);
      if(err) {
            res.send(response);
          } else {
            response.status  = 1;
            response.message = 'Faq added successfully';
            response.id      = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('faqs',{_id:req.body.id}, faqFormData, function(err, result) {
      if(err) {
        res.send(response);
      } else {
        DB.GetOneDocument('faqs', {_id:req.body.id}, {}, {}, function(err, result1) {
            if(err) {
                res.send(response);
            } else {
                  const faqData = {
                    id         : result1._id,
                    question   : result1.question,
                    answer     : result1.answer,
                    status     : result1.status
                  }
                  response.status  = 1;
                  response.message = 'Faq updated successfully';
                  response.data    = faqData;
                res.send(response);
            }
        });
      }
    });
  }
})

Router.post('/deleteFaq',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  DB.DeleteDocument('faqs', {_id:req.body.id}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        DB.GetDocument('faqs', {}, {}, {}, function(err, result) {
            if(err) {
                res.send(response);
            } else {
                  response.status  = 1;
                  response.message = 'Faq deleted successfully';
                  response.data    = result;
                  response.count   = result.length;
                  res.send(response);
            }
        });
      }
  });
})

module.exports = Router;
