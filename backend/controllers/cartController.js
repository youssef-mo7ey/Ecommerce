const Cart = require("../models/cartModel");
const History = require("../models/HistoryModel");
const Product = require("../models/Products.model");
const { v4: uuidv4 } = require('uuid');

const getCartOfUser = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({ userId: req.params.id });
    if (cartItem) {
      let prodId = [];
      let prodDetails = [];
      cartItem.prodDetails.map((item) => {
        prodId.push(item.id);
      });
      const products = await Product.find({ _id: { $in: prodId } }).exec();

      prodId.map((item, i) => {
        let prod = products.filter((product)=>{
          if (product._id == item){
            return product
          }
        })
        prodDetails.push({
          id: item,
          img1: prod[0].img1,
          name: prod[0].name,
          price: prod[0].price,
          size: cartItem.prodDetails[i].size,
          numOfItem:cartItem.prodDetails[i].numOfItem
        });
      });

      res.status(200).send(prodDetails);
    }
    else{
      throw new Error("error")
    }
  } catch (err) {
    res.send(err.message)
  }
};

const handleAddToCart = async (req, res) => {
  let flag = false;
  try {
    const isFound = await Cart.findOne({ userId: req.body.userId });
    if (isFound !=null) {
      isFound.prodDetails.map((item) => {
        if (
          item.id == req.body.prodDetails.id &&
          item.size == req.body.prodDetails.size
        ) {
          flag = true;
        }
      });
      if (flag) {
        console.log("duplicates")
        //throw new Error("duplicates");
      } else {
        flag=false
        const addToSameUser = await Cart.findOneAndUpdate(
          { userId: req.body.userId },
          { $push: { prodDetails: req.body.prodDetails } },{new:true}
        );
        res.status(200).send(addToSameUser);
      }
    } else {
      console.log("NotFound########################")
      console.log(req.body)
      console.log("########################################")
      const addNew = await new Cart(req.body).save();
      console.log(addNew)
      res.status(200).send(addNew);
    }
  } catch (error) {
    console.log("#################ERROR##################")
    console.log(error);
  }
};

const handleAddToCartGuest= async (req,res)=>{

  try {
    
    let guest={
      userId:"guest"+uuidv4(),
      prodDetails:req.body.prodDetails
    }

    const addNew = await new Cart(guest).save()
    res.status(200).send(addNew)
  } catch (err) {
    
    console.log(err)
  }

}

const handleNumOfProd = async (req,res)=>{
  try{
    const userCart = await Cart.findOne({userId:req.body.userId})
    if(userCart){
    const updatedArr=userCart.prodDetails.map((item)=>{
      if(item.id==req.body.id && item.size==req.body.size)
      {
        item.numOfItem=req.body.numOfItem
      }
      return item
    })
    const update = await Cart.findOneAndUpdate({userId:req.body.userId},{prodDetails:updatedArr},{new:true})
    res.status(200).send(update)
    }
    else{
    res.status(404).send("not found")
    }

    }
  catch(err){
    console.log(err)
  }
}

const handleDeleteFromCart = async (req, res) => {
  try {
    const record = await Cart.find({userId: req.body.userId});

    if (record[0]?.prodDetails?.length>1) {
      const newArr = record[0].prodDetails.filter((item) => {
        if (item.id != req.body.id || item.size != req.body.size) {
            console.log(req.body)
            console.log("____________________________")
            console.log(item)
            console.log("###########################3")
            return item;
        }
      });
      const deleting = await Cart.updateOne(
        { userId: req.body.userId },
        { $set: { prodDetails: newArr } }
      );
      res.status(200).send(deleting);
    }
    else{
        
        const deleting =await Cart.deleteOne({userId:req.body.userId})
        res.status(200).send("empty");
    }
  } catch (err) {
    console.log(err);
  }
};

const handleCheckOut =async (req,res)=>{
  try{
    const cart= await Cart.findOne({userId:req.params.id})
    const deleteCart=await Cart.findOneAndDelete({userId:req.params.id}).exec()
    const {userId,prodDetails}=cart
    const addToHistory = await new History({userId,prodDetails}).save()
    console.log(addToHistory)
    res.status(200).send(deleteCart);
  }
  catch(err){
    console.log(err)
  }
}

module.exports = { handleAddToCart, getCartOfUser, handleDeleteFromCart,handleNumOfProd,handleCheckOut,handleAddToCartGuest };
