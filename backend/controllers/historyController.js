const History = require("../models/HistoryModel")
const Product = require("../models/Products.model")

const getHistory = async (req,res)=>{

    try{
    const history=History.findOne({userId:req.params.id})

    if(history){
        const prodId=history.prodDetails.map((item)=> item.id)
        let products=await Product.find({_id:{$in:prodId}}).exec()
        
    }}
    catch(err){
        console.log(err)
    }
}

module.exports={getHistory}