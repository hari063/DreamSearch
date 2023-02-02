const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
Router.post('/isAuth',function(req,res) {
  const response = {
    status  : 1,
    message:'success'
  }
  let loginInfo={
      username:req.body.email,
      password:req.body.password,
  }
  let privateKey='dreamsearch[R2AH]';
  
  let token=jwt.sign(loginInfo,privateKey,{expiresIn:'1h'});
  response.webToken=token;
  res.send(response);
});

Router.post('/verifyToken',function(req,res) {
  const response = {
    status  : 1,
    message:'success'
  }
  let privateKey='dreamsearch[R2AH]';
  
  jwt.verify(req.body.token,privateKey,function(err,result){
  if(err){
   
    const response = {
      status  : 0,
      message:'Not a valid token'
    }
    res.send(response)
  }
  else{
    response.webToken=result;
    res.send(response)
  }
  });
});

Router.post('/createPassword',function(req,res) {
   const password=bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8),null);
   res.send({password:password})
  });

Router.post('/checkLogin',function(req,res) {
  const response = {
    status  : 0,
    message:'something went wrong'
  }
  let adminEmail=req.body.email;
  let password=req.body.password;
  DB.GetOneDocument('admins',{'email':adminEmail},{},{},function(err,result){
    if(err){
      res.send(err)
     
    }
    else{
      if(result===null){
        response.message="invalid email";
        res.send(response);
       
      }
      else{
        let hashedPassword=result.password;
        bcrypt.compare(password,hashedPassword,function(err,output){
          if(err){
            res.send(err)
          }
          else{
            if(output){
              let privateKey='dreamsearch[R2AH]';
              let loginInfo={
                username:req.body.email,
                password:req.body.password,
            }
            let token=jwt.sign(loginInfo,privateKey,{expiresIn:'1h'});
            response.status=1;
            response.message='login success';
            response.webToken=token;
            
            res.send(response);
            }
            else{
              response.message='invalid password';
              res.send(response);

            }
          }
        });
      }
    }
  });
});

module.exports = Router;
