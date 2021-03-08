var express=require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
var router=express.Router();
const mongoose =require('mongoose');
mongoose.set('useFindAndModify', false); 



const User=require('../module/signup');

router.get('/alluser',(req,res,next)=>{
       
       User.find(function(err, users){
        if(err){
            res.json(err);
       }
        else{
            res.json(users);
        }
    });

 });

router.post('/user',(req, res, next)=>{
         let newUserDetails=new User({
             _id: new mongoose.Types.ObjectId(),
            FirstName: req.body.FirstName,
            LastName:req.body.LastName,
             password: req.body.password,
             EmailAddress:req.body.EmailAddress,
            
     });
         newUserDetails.save((err, user)=>{
             if(err){
                 res.json(err);
             }
             else{
                 res.json(true);
             }
    })
             
 });



router.post('/auth',(req,res,next)=>{

  User.findOne({EmailAddress:req.body.EmailAddress},function(err, results){
   if(err || !results||results==null)
        {
      //    var token = jwt.sign({userinfo: false}, 'todo-app-super-shared-secret', {expiresIn: '1h'});

            res.json(false);
        }
      
      else{
        if(results.password==req.body.password){
           User.updateOne({_id:results._id},{
            $set:{last_login:Date.now} },
                             function(err,result){
                                })
       var token = jwt.sign({userinfo: results}, 'todo-app-super-shared-secret', {expiresIn: '1h'});
     
             res.json({"value":token});
        }
        else{
          res.json(false);
        }
             
      }
    });

 });


router.post('/alluser',(req,res,next)=>{

  User.findOne({EmailAddress:req.body.EmailAddress},function(err, results){
   if(err || !results||results==null)
        {
            res.json(false);
        }
      
      else{
        User.find(function(err, users){
                  if(err){
                      res.json(err);
                 }
                  else{
                      res.json(users);
          
                  }
              });
             
      }
    });

 });

router.post('/edituser',(req,res,next)=>{
  User.findOne({_id:req.body._id},function(err, results){
   if(err || !results||results==null)
        {
            res.json(false);
        }
      
      else{
       res.json(results);
             
      }
    });

 });

router.delete('/removers/:id',(req, res, next)=>{
    User.remove({_id: req.params.id},
          function(err,result){
                         if(err){
                             res.json(err);
                         }
                         else{
                             res.json(result);
                         }
                     
                  })
              
              });

 router.put('/updatee/:id',(req, res, next)=>{
   newid=req.body.id;
    User.updateOne({_id:req.params.id},{
   $set:{last_login:req.body.last_login} },
                    function(err,result){
                        if(err||!result){
                            res.json(err);
                        }
                        else{
                            res.json(result)
                        }
                       })
                });

router.put('/update',(req, res, next)=>{
  User.updateOne({_id:req.body._id},{
$set:{EmailAddress:req.body.EmailAddress, 
Firstname:req.body.FirstName,
LastName:req.body.LastName,
password:req.body.password

} },
    function(err,result){
        if(err||!result){
            res.json(false);
        }
        else{
            res.json(true)
        }
       })
});
          
      
  
module.exports = router ;

  
  



