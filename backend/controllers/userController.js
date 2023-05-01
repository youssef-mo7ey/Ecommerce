const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
  try {
    const newUser = await new User(req.body).save();
    res.send(newUser);
    if(req.body.guest){
      const cart = Cart.findOneAndUpdate({userId:req.body.guest.userId},{userId:newUser._id},{new:true})
    }
  } catch (err) {
    res.status(400).send("duplicate Data");
    console.log(err);
  }
};

const handleAddress = async (req, res) => {
  const _id=req.params.id
  const { address } = req.body;
  try {
    const isFound = (await User.findOne({ _id: _id }).exec()) || false;
    if (isFound) {
        const newUser = await User.updateOne(
          { _id: _id },
          { address: address },{new:true}
        ).exec();
        res.status(200).send(newUser);
    }
    else{
      throw new Error('no account with this id')
    }
  } catch (err) {
    res.status(400).send(err.message)
    console.log(err);
  }
};
const handlePhone = async (req, res) => {
  const _id=req.params.id
  const { phone } = req.body;
  try {
    const isFound = (await User.findOne({ _id: _id }).exec()) || false;
    if (isFound) {
        const newUser =await User.updateOne(
          { _id: _id },
          { phone: phone },{new:true}
        ).exec();
        res.status(200).send(newUser);
    }
    else{
      throw new Error('no account with this id')
    }
  } catch (err) {
    res.status(400).send(err.message)
    console.log(err);
  }
};

const handleLogin = async (req, res) => {
  try {
    let user;
    if (req.body.email) {
      user = await User.findOne({ email: req.body.email }).exec();
    }
    if (req.body.username) {
      user = await User.findOne({ username: req.body.username }).exec();
    }
    if (!req.body.username && !req.body.email) {
      throw new Error("Please Add Username or Email");
    }
    const jsonWebToken = generateJwt({ id: user._id });
    if (req.body.password === user.password) {
      res.send({
        id: user._id,
        email: user.email,
        username: user.username,
        phone:user.phone,
        address:user.address,
        jwt: jsonWebToken,
      });
    } else {
      throw new Error("password is wrong");
    }
    if(req.body.guest){
      const userCart = await Cart.findOne({userId:user._id})
      const guestCart = await Cart.findOne({userId:req.body.guest.userId})
      let userNewCart
      let validItems=[]
      let flag=false
      if(userCart){
        for(let i=0;i<guestCart.prodDetails.length ; i++){
          for(let j=0;j<userCart.prodDetails.length; j++){
            if(guestCart.prodDetails[i].id!=userCart.prodDetails[j].id ||guestCart.prodDetails[i].size!=userCart.prodDetails[j].size){
              flag=true
            }
          }
          if(flag){validItems.push(guestCart.prodDetails[i])}
        }
        const deleteGuest=await Cart.findOneAndDelete({userId:req.body.guest.userId})
        userNewCart= await Cart.findOneAndUpdate(
          { userId: user._id },
          {$push:{prodDetails:validItems}})

      }
      else{
        userNewCart= await Cart.findOneAndUpdate({userId:req.body.guest.userId},{userId:user._id},{new:true}).exec()
      }
      console.log(userNewCart)
    }
  } catch (err) {
    res.status(400).send("email or password are wrong");
  }
};

const handleGet = async (req, res) => {
  console.log("get User");
};

const generateJwt = (id) => {
  return jwt.sign(id, process.env.SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  handleRegister,
  handleLogin,
  handleGet,
  handlePhone,
  handleAddress,
};
