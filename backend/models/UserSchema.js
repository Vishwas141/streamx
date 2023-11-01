const mongoose=require('../config/database');
const emailValidator=require('email-validator');
const bcrypt = require('bcrypt');
const Event = require("../models/EventSchema");
const jwt = require('jsonwebtoken');

const userSchema=new mongoose.Schema({
   name:{
       type:String,
       required:true,
   },
    email:{
         type:String,
         required:true,
         unique:true,
    },
    password:{
         type:String,
         required:true,
    },
    role:
    {
        type: String,
        default:"User"
    },
    events: [
        {
            ref: "Event",
            type: mongoose.Schema.Types.ObjectId
            
        }
    ]
});
//pre check of user in db
// userSchema.pre('save',async function(next){
//     try{
//     if(!emailValidator.validate(this.email)){
//         throw new Error('Invalid Email');
//     }
//     //check for the special symbols in password
//     if(this.password.trim().length<8&&!this.password.match(/^[A-Za-z0-9]+$/)){
//         throw new Error('Password must be at least 8 characters long and must contain special characters');
//     }
//     //checking if user already exists
//     const user=await userModel.findOne({email:this.email})
//     if(user){
//         throw new Error('User already exists');
//     }
//     next();
// }
// catch(err){
//     next(err);
// }
// });
const userModel=mongoose.model('User',userSchema);
module.exports=userModel;