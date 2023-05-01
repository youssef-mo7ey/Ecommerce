const mongoose =require('mongoose');
const Schema =mongoose.Schema

const LikesSchema=new Schema({

        userId:{
        type:String,
        require:true,
        unique:true},
        prodId:[String]
})

const Like = mongoose.model('likes', LikesSchema);
module.exports=Like;