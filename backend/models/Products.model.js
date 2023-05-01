const mongoose =require('mongoose');
const Schema =mongoose.Schema

const ProductSchema=new Schema({
    img1:
    {
    type:String
    },
    img2:
    {
    type:String
    },
    price:{
        type: Number,
        required: true},
    tag:{
        type:String
    },
    label:{
        type:String
    },
    inStock:[{size:String,pieces:Number}],
    name:{
        type:String
        ,required:true
    },
    desc:{
        type:String,
        required:true},
})

const Product = mongoose.model('product', ProductSchema);
module.exports=Product;