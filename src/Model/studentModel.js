const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId

const StudentSchema=new mongoose.Schema({
Name:{
    type:String,
    required:true,
    trime:true
},
subject:{
    type:String,
    required:true,
    enum:["Math","English","Hindi","Science","JavaScript","SS"],
    trim:true
},
marks:{
    type:Number,
    required:true
},
userId:{
    type:ObjectId,
    ref:'Users',
    required:true
},
isDeleted:{
    type:Boolean,
    default:false
}

},{timestamps:true})


module.exports=mongoose.model('Student',StudentSchema)