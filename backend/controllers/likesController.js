const Product=require('../models/Products.model');
const Likes=require('../models/likesModel');


const handleIsLiked= async (req,res)=>{
    try {
        const likedId=req.params.id;
        let flag=false
        const likes=await Likes.findOne({userId:req.params.uid})

        likes?.prodId.map((item)=>{
            if(item===likedId){
                flag=true
            }
        })
        if(flag)
        {
            res.send(flag)
            //console.log("found")
        }
    } catch (error) {
        console.log(error)
    }
}

const handleGetAllLikesForUser=async (req,res)=>{
    try {
        const likes=await Likes.findOne({userId:req.params.uid})
        if(likes)
        {
            const prod=await Product.find({_id:{$in:likes?.prodId}})
            res.status(200).send(prod)
        }
        else{
            res.status(404).send("NOT FOUND")
            }
    } catch (error) {
        console.log(error)
    }
}

const handlePostLike=async (req,res)=>{
    try {
        const isFound=await Likes.findOne({userId:req.body.userId})
        let liked
        if(isFound){
            liked = await Likes.updateOne({userId:req.body.userId},{$push:{prodId:req.body.prodId}});
        }
        else
        {
            liked = await new Likes(req.body).save();
        }
        res.status(200).send(liked)
    } catch (error) {
        console.log(error)
    }
}

const handleUnLike =async (req,res)=>{
    try {

        const del = await Likes.updateOne({userId:req.params.uid},{$pull:{prodId:req.params.id}});
        const lengthChecker=await Likes.find({userId:req.params.uid,prodId:{$gt:2}})

        if(lengthChecker?.length===0){
            const del = await Likes.deleteOne({userId:req.params.uid})
            res.send("deleted")
        }
        else{
            res.send("item deleted")
        }
    } catch (error) {
        console.log(error)
    }
}



module.exports={handleGetAllLikesForUser,handlePostLike,handleUnLike,handleIsLiked}