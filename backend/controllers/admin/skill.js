const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
const verifyToken =require('./auth/verifyToken');
Router.get('/listSkills',verifyToken,function(req,res) {
const response = {
status  : 0,
}
DB.GetDocument('skills',{}, {}, {}, function(err, result) {
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

Router.post('/viewSkill',verifyToken,function(req,res) {
const response = {
status  : 0,
}
DB.GetOneDocument('skills',{_id:req.body.id}, {}, {}, function(err, result) {
if(err) {
  res.send(response);
} else {
  response.status  = result.status;
  response.data    = result;
  response.id      = result._id;
  response.name      = result.name;
  
  res.send(response);
}
});
});

Router.post('/addUpdateSkill',verifyToken,function(req,res) {
const response = {
status  : 0,
message : 'Something went wrong in your code!'
}
req.checkBody('name', 'name is required.').notEmpty();
var errors = req.validationErrors();
if (errors) {
return res.status(422).json({ errors: errors});
}
const name = HELPERFUNC.Capitalize(req.body.name);

const status   = req.body.status;
const skillFormData = {
name  : name,
status    : status
}
if(!req.body.id){
DB.GetOneDocument('skills', {name : name}, {}, {}, function(err, result) {
if(result){
response.status  = 0;
response.message = 'Data you have entered is already exist!';
res.send(response);
} else {
DB.InsertDocument('skills', skillFormData, function(err, result1) {
console.log(err);
if(err) {
    res.send(response);
  } else {
    response.status  = 1;
    response.message = 'Skill added successfully';
    response.id      = result1._id;
    res.send(response);
  }
});
}
});
} else {
DB.FindUpdateDocument('skills',{_id:req.body.id}, skillFormData, function(err, result) {
if(err) {
res.send(response);
} else {
DB.GetOneDocument('skills', {_id:req.body.id}, {}, {}, function(err, result1) {
    if(err) {
        res.send(response);
    } else {
          const skillData = {
            id         : result1._id,
            name       : result1.name,
            
            status     : result1.status
          }
          response.status  = 1;
          response.message = 'Skill updated successfully';
          response.data    = skillData;
        res.send(response);
    }
});
}
});
}
})

Router.post('/deleteSkill',verifyToken,function(req,res) {
const response = {
status  : 0,
message : 'Something went wrong in your code!'
}
DB.DeleteDocument('skills', {_id:req.body.id}, function(err, result) {
if(err) {
  res.send(response);
} else {
DB.GetDocument('skills', {}, {}, {}, function(err, result) {
    if(err) {
        res.send(response);
    } else {
          response.status  = 1;
          response.message = 'Skill deleted successfully';
          response.data    = result;
          response.count   = result.length;
          res.send(response);
    }
});
}
});
})

module.exports = Router;