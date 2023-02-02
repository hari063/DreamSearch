const express       = require('express');
const Router        = express.Router();
const DB            = require('../../../models/db');
const HELPERFUNC    = require('../../../models/commonfunctions');
var mongoose        = require('mongoose');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const nodemailer    = require('nodemailer');
Router.get('/listRegistrations',function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('registers',{}, {}, {}, function(err, result) {
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



Router.post('/addRegistration',function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  req.checkBody('type', 'type is required.').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  if(req.body.type=="candidate"){
    req.checkBody('username', 'username is required.').notEmpty();
    req.checkBody('email', 'email is required.').notEmpty();
    req.checkBody('password', 'password is required.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      return res.status(422).json({ errors: errors});
    }
    const username = req.body.username;
    const email   = req.body.email;
    const password   = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8),null);
    const registerFormData = {
      username  : username,
      email    : email,
      password    : password
    }
    if(!req.body.id){
      DB.GetOneDocument('registers', {email : email}, {}, {}, function(err, result) {
        if(result){
          response.status  = 0;
          response.message = 'Email entered is already exist!';
          res.send(response);
        } else {
          DB.InsertDocument('registers', registerFormData, function(err, result1) {
        console.log(err);
        if(err) {
              res.send(response);
            }  else {
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'dreamsearchsite@gmail.com',
                    pass: 'R[2]ahdss'
                }
            });
            DB.GetOneDocument('newsletters',{name:"Welcome"}, {}, {}, function(err, result) {
              if(err) {
                  res.send(response);
              } else {
                var template=result.template;
                var message=template.replace(/<[^>]+>/g,'');
                var finalmessage=message.replace("#name",username);
                var subject=result.subject;
                var replacedSubject=subject.replace("#name",username);
                let mailOptions={
                  from:"dreamsearchsite@gmail.com",
                  to:email,
                  subject:replacedSubject,
                  text:finalmessage
              };
              transporter.sendMail(mailOptions, (error, response) => {
                
                if(error){
                   res.send(err);
                }
                else{
                  response.status  = 1;
                  response.message = 'Email sent successfully';
                 console.log(response.message)
                  res.send(response);
                }
        });
              }
          });
              response.status  = 1;
              response.message = 'Register done successfully';
              response.id      = result1._id;
              res.send(response);
            }
          });
        }
      });
    } 
  }
  if(req.body.type=="employee"){
    req.checkBody('username', 'username is required.').notEmpty();
    req.checkBody('email', 'email is required.').notEmpty();
    req.checkBody('companyname','companynae is required').notEmpty();
    req.checkBody('password', 'password is required.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      return res.status(422).json({ errors: errors});
    }
    const companyname=req.body.companyname;
    const username = req.body.username;
    const email   = req.body.email;
    const password   = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8),null);
    const registerFormData = {
      username  : username,
      email    : email,
      password    : password,
      companyname:companyname
    }
    if(!req.body.id){
      DB.GetOneDocument('registers', {email : email}, {}, {}, function(err, result) {
        if(result){
          response.status  = 0;
          response.message = 'Email entered is already exist!';
          res.send(response);
        } else {
          DB.InsertDocument('registers', registerFormData, function(err, result1) {
        console.log(err);
        if(err) {
              res.send(response);
            } 
            else {
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'dreamsearchsite@gmail.com',
                    pass: 'R[2]ahdss'
                }
            });
            DB.GetOneDocument('newsletters',{name:"Welcome"}, {}, {}, function(err, result) {
              if(err) {
                  res.send(response);
              } else {
                var template=result.template;
                var message=template.replace(/<[^>]+>/g,'');
                var finalmessage=message.replace("#name",username);
                var subject=result.subject;
                var replacedSubject=subject.replace("#name",username);
                let mailOptions={
                  from:"dreamsearchsite@gmail.com",
                  to:email,
                  subject:replacedSubject,
                  text:finalmessage
              };
              transporter.sendMail(mailOptions, (error, response) => {
                
                if(error){
                   res.send(err);
                }
                else{
                  response.status  = 1;
                  response.message = 'Email sent successfully';
                 console.log(response.message)
                  res.send(response);
                }
        });
              }
          });
              response.status  = 1;
              response.message = 'Register done successfully';
              response.id      = result1._id;
              res.send(response);
            }
          });
        }
      });
    } 
  }
 
  
})



module.exports = Router;