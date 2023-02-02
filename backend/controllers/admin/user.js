const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
const verifyToken =require('./auth/verifyToken');
Router.get('/listUsers',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('users',{}, {}, {}, function(err, result) {
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

Router.post('/viewUser',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetOneDocument('users',{_id:req.body.id}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        response.status  = result.status;
        response.data    = result;
        response.id      = result._id;
        response.name      = result.name;
        response.username      = result.username;
        response.password      = result.password;
        response.role      = result.role;
          res.send(response);
      }
  });
});

Router.post('/addUpdateUser',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  req.checkBody('name', 'name is required.').notEmpty();
  req.checkBody('username', 'username is required.').notEmpty();
  req.checkBody('password', 'password is required.').notEmpty();
  req.checkBody('role', 'role is required.').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  const name =HELPERFUNC.Capitalize( req.body.name);
  const username   = req.body.username;
  const password =req.body.password;
  const role   =HELPERFUNC.Capitalize( req.body.role);
  const status   = req.body.status;
  const userFormData = {
    name  : name,
    username    : username,
    password  : password,
    role    : role,
    status    : status
  }
  if(!req.body.id){
    DB.GetOneDocument('users', {name : name}, {}, {}, function(err, result) {
      if(result){
        response.status  = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('users', userFormData, function(err, result1) {
      console.log(err);
      if(err) {
            res.send(response);
          } else {
            response.status  = 1;
            response.message = 'User added successfully';
            response.id      = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('users',{_id:req.body.id}, userFormData, function(err, result) {
      if(err) {
        res.send(response);
      } else {
        DB.GetOneDocument('users', {_id:req.body.id}, {}, {}, function(err, result1) {
            if(err) {
                res.send(response);
            } else {
                  const userData = {
                    id         : result1._id,
                    name   : result1.name,
                    username     : result1.username,
                    password   : result1.password,
                    role     : result1.role,
                    status     : result1.status
                  }
                  response.status  = 1;
                  response.message = 'User updated successfully';
                  response.data    = userData;
                res.send(response);
            }
        });
      }
    });
  }
})

Router.post('/deleteUser',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  DB.DeleteDocument('users', {_id:req.body.id}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        DB.GetDocument('users', {}, {}, {}, function(err, result) {
            if(err) {
                res.send(response);
            } else {
                  response.status  = 1;
                  response.message = 'User deleted successfully';
                  response.data    = result;
                  response.count   = result.length;
                  res.send(response);
            }
        });
      }
  });
})

module.exports = Router;
