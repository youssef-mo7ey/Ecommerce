const mongoose = require('mongoose')
const Schema=mongoose.Schema

const HistorySchema=new Schema({
    userId:{
        type:String,
        require:true,
        unique:true},
    prodDetails:[{
        id:{
            type:String
        },
        numOfItem:{
            type:Number,
            default:1
        },
        size:String

    }]
})

const History = mongoose.model('history', HistorySchema);
module.exports=History;