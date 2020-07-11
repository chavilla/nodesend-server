const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const User=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true
    },
    name:{
        type:String,
        required: true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
});

module.exports=mongoose.model('Users', User);





