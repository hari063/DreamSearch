const express       = require('express');
const Router        = express.Router();
const DB            = require('../../models/db');
const HELPERFUNC    = require('../../models/commonfunctions');
var mongoose        = require('mongoose');
const multer = require('multer');
var path = require('path');
const verifyToken =require('./auth/verifyToken');
const imageStorage = multer.diskStorage({   
    destination: 'uploads', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)) { 
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 

Router.get('/listCategories',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetDocument('categories',{}, {}, {}, function(err, result) {
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



Router.post('/addUpdateCategory',verifyToken,imageUpload.single('image'),(req,res)=> {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  req.checkBody('name', 'name is required.').notEmpty();
 // req.checkBody('image', 'image is required.').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors});
  }
  
  if(req.file){
    const name = HELPERFUNC.Capitalize(req.body.name);
  const image   = req.file.filename;
  const status   = req.body.status;
  const categoryFormData = {
    name  : name,
    image    : image,
    status    : status
  }
  if(!req.body.id){
    DB.GetOneDocument('categories', {name : name}, {}, {}, function(err, result) {
      if(result){
        response.status  = 0;
        response.message = 'Data you have entered is already exist!';
        res.send(response);
      } else {
        DB.InsertDocument('categories', categoryFormData, function(err, result1) {
      console.log(err);
      if(err) {
            res.send(response);
            response.message = 'Please upload image';
          } else {
            response.status  = 1;
            response.message = 'Category added successfully';
            response.id      = result1._id;
            res.send(response);
          }
        });
      }
    });
  } else {
    DB.FindUpdateDocument('categories',{_id:req.body.id}, categoryFormData, function(err, result) {
      if(err) {
        res.send(response);
      } else {
        DB.GetOneDocument('categories', {_id:req.body.id}, {}, {}, function(err, result1) {
            if(err) {
                res.send(response);
            } else {
                  const categoryData = {
                    id         : result1._id,
                    name       : result1.name,
                    image       : result1.image,
                    status     : result1.status
                  }
                  response.status  = 1;
                  response.message = 'Category updated successfully';
                  response.data    = categoryData;
                res.send(response);
            }
        });
      }
    });
  }
}
else{
  const name = HELPERFUNC.Capitalize(req.body.name);
  const status   = req.body.status;
  const categoryFormData = {
    name  : name,
    status    : status
  }
  DB.FindUpdateDocument('categories',{_id:req.body.id}, categoryFormData, function(err, result) {
    if(err) {
      res.send(response);
    } else {
      DB.GetOneDocument('categories', {_id:req.body.id}, {}, {}, function(err, result1) {
          if(err) {
              res.send(response);
          } else {
                const categoryData = {
                  id         : result1._id,
                  name       : result1.name,
                  image       : result1.image,
                  status     : result1.status
                }
                response.status  = 1;
                response.message = 'Category updated successfully';
                response.data    = categoryData;
              res.send(response);
          }
      });
    }
  });
}
})

Router.post('/deleteCategory',verifyToken,function(req,res) {
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  DB.DeleteDocument('categories', {_id:req.body.id}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
        DB.GetDocument('categories', {}, {}, {}, function(err, result) {
            if(err) {
                res.send(response);
            } else {
                  response.status  = 1;
                  response.message = 'Category deleted successfully';
                  response.data    = result;
                  response.count   = result.length;
                  res.send(response);
            }
        });
      }
  });
})

Router.post('/viewCategory',verifyToken,function(req,res) {
  const response = {
    status  : 0,
  }
  DB.GetOneDocument('categories',{_id:req.body.id}, {}, {}, function(err, result) {
      if(err) {
          res.send(response);
      } else {
          response.status  = result.status;
          response.data    = result;
         response.id=result._id;
         response.name=result.name;
         response.image=result.image;
          res.send(response);
      }
  });
});

module.exports = Router;