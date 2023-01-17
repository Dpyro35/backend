const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    
    title:{
        type:String,
        required:true
    },
    Author:{
        type:String,
    },
    ISBN:{
        type:String,
    },
    publisher:{
        type:String,
    },
    link:{
      type:String,
      required:true
    },
    Date_published:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    
    },
    public_id:{
        type:String,
        required:true   
    },
    url:{
        type:String,
        required:true   
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});
const model = mongoose.model("Book", userSchema)

module.exports = model;