const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
const verifyToken =require('./auth/verifyToken');
Router.get('/listPages',verifyToken,function(req,res) {
    const response = {
      status  : 0,
    }
    DB.GetDocument('pages',{}, {}, {}, function(err, result) {
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

  Router.post('/viewPage',verifyToken,function(req,res) {
    const response = {
      status  : 0,
    }
    DB.GetOneDocument('pages',{_id:req.body.id}, {}, {}, function(err, result) {
        if(err) {
            res.send(response);
        } else {
          response.status  = result.status;
          response.data    = result;
          response.id      = result._id;
          response.title      = result.title;
          response.description      = result.description;
            res.send(response);
        }
    });
  });

  Router.post('/addUpdatePage',verifyToken,function(req,res) {
    const response = {
      status  : 0,
      message : 'Something went wrong in your code!'
    }
    req.checkBody('title', 'title is required.').notEmpty();
    req.checkBody('description', 'description is required.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      return res.status(422).json({ errors: errors});
    }
    const title        = HELPERFUNC.Capitalize(req.body.title);
    const description  = req.body.description;
    const status       = req.body.status;
    const pageFormData = {
      title  : title,
      description    : description,
      status    : status
    }
    if(!req.body.id){
      DB.GetOneDocument('pages', {title : title}, {}, {}, function(err, result) {
        if(result){
          response.status  = 0;
          response.message = 'Data you have entered is already exist!';
          res.send(response);
        } else {
          DB.InsertDocument('pages', pageFormData, function(err, result1) {
        console.log(err);
        if(err) {
              res.send(response);
            } else {
              response.status  = 1;
              response.message = 'Page added successfully';
              response.id      = result1._id;
              res.send(response);
            }
          });
        }
      });
    } else {
      DB.FindUpdateDocument('pages',{_id:req.body.id}, pageFormData, function(err, result) {
        if(err) {
          res.send(response);
        } else {
          DB.GetOneDocument('pages', {_id:req.body.id}, {}, {}, function(err, result1) {
              if(err) {
                  res.send(response);
              } else {
                    const pageData = {
                      id         : result1._id,
                      title   : result1.title,
                      description     : result1.description,
                      status     : result1.status
                    }
                    response.status  = 1;
                    response.message = 'Page updated successfully';
                    response.data    = pageData;
                  res.send(response);
              }
          });
        }
      });
    }
  })
  
  Router.post('/deletePage',verifyToken,function(req,res) {
    const response = {
      status  : 0,
      message : 'Something went wrong in your code!'
    }
    DB.DeleteDocument('pages', {_id:req.body.id}, function(err, result) {
        if(err) {
            res.send(response);
        } else {
          DB.GetDocument('pages', {}, {}, {}, function(err, result) {
              if(err) {
                  res.send(response);
              } else {
                    response.status  = 1;
                    response.message = 'Page deleted successfully';
                    response.data    = result;
                    response.count   = result.length;
                    res.send(response);
              }
          });
        }
    });
  })
  
  module.exports = Router;
  