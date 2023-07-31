const mongoose = require('mongoose');
const { Schema } = mongoose;

const userScheme = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.new
    }
})

 const user =mongoose.model("user",userScheme)
module.exports = user