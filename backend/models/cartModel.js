const mongoose = require('mongoose')
const Schema=mongoose.Schema

const CartSchema=new Schema({
    userId:{
        type:String,
        require:true,
        unique:true
    },
    prodDetails:[{
        id:{
            type:String,
            unique:false
        },

        numOfItem:{
            type:Number,
            default:1
        },

        size:String}]
})

const Cart = mongoose.model('cart', CartSchema);
module.exports=Cart;