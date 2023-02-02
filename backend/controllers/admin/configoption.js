const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
const verifyToken =require('./auth/verifyToken');
Router.post('/listConfigopts',verifyToken,function(req,res) {
    const response = {
      status  : 0,
    }
    DB.GetDocument('configopts',{parentId:req.body.parentId}, {}, {}, function(err, result) {
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

  Router.post('/viewConfigopt',verifyToken,function(req,res) {
    const response = {
      status  : 0,
    }
    DB.GetOneDocument('configopts',{_id:req.body.id}, {}, {}, function(err, result) {
        if(err) {
            res.send(response);
        } else {
          response.status  = result.status;
          //response.data    = result;
          response.id      = result._id;
          response.name    = result.name;
          response.slug    = result.slug;
          response.description      = result.description;
          response.sort=result.sort;
            res.send(response);
        }
    });
  });

  Router.post('/addUpdateConfigopt',verifyToken,function(req,res) {
    const response = {
      status  : 0,
      message : 'Something went wrong in your code!'
    }
    req.checkBody('name', 'name is required.').notEmpty();
    req.checkBody('description', 'description is required.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      return res.status(422).json({ errors: errors});
    }
    const name        = HELPERFUNC.Capitalize(req.body.name);
    const slug         = req.body.slug;
    const description  = req.body.description;
    const sort         =req.body.sort;
    const parentId=req.body.parentId;
    const status       = req.body.status;
    const configoptFormData = {
      name  : name,
      slug :slug,
      description    : description,
      sort:sort,
      parentId: parentId,
      status    : status
    }
    if(!req.body.id){
      DB.GetOneDocument('configopts', {name : name}, {}, {}, function(err, result) {
        if(result){
          response.status  = 0;
          response.message = 'Data you have entered is already exist!';
          res.send(response);
        } else {
          DB.InsertDocument('configopts', configoptFormData, function(err, result1) {
        console.log(err);
        if(err) {
              res.send(response);
            } else {
              response.status  = 1;
              response.message = 'Configuration added successfully';
              response.id      = result1._id;
              res.send(response);
            }
          });
        }
      });
    } else {
      DB.FindUpdateDocument('configopts',{_id:req.body.id}, configoptFormData, function(err, result) {
        if(err) {
          res.send(response);
        } else {
          DB.GetOneDocument('configopts', {_id:req.body.id}, {}, {}, function(err, result1) {
              if(err) {
                  res.send(response);
              } else {
                    const configoptData = {
                      id          : result1._id,
                      name        : result1.name,
                      slug        :result1.slug,
                      description : result1.description,
                      sort        :result1.sort,
                      status      : result1.status
                    }
                    response.status  = 1;
                    response.message = 'Config updated successfully';
                    response.data    = configoptData;
                  res.send(response);
              }
          });
        }
      });
    }
  })
  
  Router.post('/deleteConfigopt',verifyToken,function(req,res) {
    const response = {
      status  : 0,
      message : 'Something went wrong in your code!'
    }
   

    DB.DeleteDocument('configopts', {_id:req.body.id}, function(err, result) {
        if(err) {
            res.send(response);
        } else {
          DB.GetDocument('configopts', {}, {}, {}, function(err, result) {
              if(err) {
                  res.send(response);
              } else {
                    response.status  = 1;
                    response.message = 'Config deleted successfully';
                    response.data    = result;
                    response.count   = result.length;
                    res.send(response);
              }
          });
        }
    });

    
  })
                                                                
  module.exports = Router;