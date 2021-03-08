const mongoose =require('mongoose');

var Schema = mongoose.Schema;


const DialogUserSchema=new mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
         
    
    FirstName: {
        type:String,
        required:true
      },
    LastName:{
        type:String,
        required:true
     },
    password:{
       type:String,
       required:true
     },
    EmailAddress:{
        type:String,
        required:true
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    last_login:{
        type:Date,
    }
});


const User=mongoose.model('User',DialogUserSchema);
module.exports=User;
