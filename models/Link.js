const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Link=new Schema({
    url:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    originalName:{
        type:String,
        required:true
    },
    download:{
        type:Number,
        default:1
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    password:{
        type:String,
        default:null
    },
    creado:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model('Links', Link);