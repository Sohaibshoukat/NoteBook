const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteScheme = new Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"Genral"
    },
    Date:{
        type:Date,
        default:Date.new
    }
})

module.exports = mongoose.model("Notes",NoteScheme)