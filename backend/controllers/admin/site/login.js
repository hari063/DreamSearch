const express       = require('express');
const Router        = express.Router();
const DB            = require('../../../models/db');
const HELPERFUNC    = require('../../../models/commonfunctions');
var mongoose        = require('mongoose');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const crypto= require('crypto');
const nodemailer    = require('nodemailer');
Router.post('/checkLogin',function(req,res) {
    const response = {
      status  : 0,
      message:'something went wrong'
    }
    let email=req.body.email;
    let password=req.body.password;
    DB.GetOneDocument('registers',{'email':email},{},{},function(err,result){
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
  
Router.post('/reset-password',function(req,res) {
   
    const response = {
      status  : 0,
      message:'something went wrong'
    }
        let privateKey='dreamsearch[R2AH]';
        let loginInfo={
          username:req.body.email,
      }
      let token=jwt.sign(loginInfo,privateKey,{expiresIn:'1h'});

        let email=req.body.email;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dreamsearchsite@gmail.com',
                pass: 'R[2]ahdss'
            }
        })

    DB.GetOneDocument('registers',{'email':email},{},{},function(err,result){
        if(err) {
            res.send(response);
        }
         else {
            if(result===null){
                response.message="invalid email";
                res.send(response);
               
              }
              else{
                const Token = {
                 token:token,
                }
                DB.FindUpdateDocument('registers',{'email':email}, Token, function(err, result) {
                  console.log(err);
                  if(err) {
                        res.send(response);
                      }  else {
                        
                        response.status  = 1;
                        response.message = 'Token sent successfully';
                      
                        res.send(response);
                      }
                    });
            let mailOptions={
            from:"dreamsearchsite@gmail.com",
            to:email,
            subject:"Reset password",
            
            html:`
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="http://localhost:3000/reset-password/${token}">link</a> to reset password</h5>
                     `
        };
        transporter.sendMail(mailOptions, (error, response) => {
          if(error){
             res.send(err);
          }
          else{
            response.status  = 1;
            response.message = 'Email sent successfully';
            res.send(response);
          }
  });
}
}
});

});

Router.post('/new-password',function(req,res) {
   
  const response = {
    status  : 0,
    message:'something went wrong'
  }
  const newPassword = req.body.password
  const sentToken = req.body.token
  DB.GetOneDocument('registers',{'token':sentToken},{},{},function(err,result){
      if(err) {
          res.send(response);
      }
       else {
         
          if(result===null){
              response.message="invalid token";
              res.send(response);
             
            }
            else{
              const Password = {
                password:newPassword,
                token:undefined
               }
               
              DB.FindUpdateDocument('registers',{'token':sentToken}, Password, function(err, result) {
               
                if(err) {
                      res.send(response);
                    } 
                     else {
                      
                      response.status  = 1;
                      response.message = 'password reset successfully';
                      res.send(response);
                     
                    }
                  });
           
}
}
});

});
// router.post('/new-password',(req,res)=>{
//   const newPassword = req.body.password
//   const sentToken = req.body.token
//   User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
//   .then(user=>{
//       if(!user){
//           return res.status(422).json({error:"Try again session expired"})
//       }
//       bcrypt.hash(newPassword,12).then(hashedpassword=>{
//          user.password = hashedpassword
//          user.resetToken = undefined
//          user.expireToken = undefined
//          user.save().then((saveduser)=>{
//              res.json({message:"password updated success"})
//          })
//       })
//   }).catch(err=>{
//       console.log(err)
//   })
// })

  module.exports = Router;