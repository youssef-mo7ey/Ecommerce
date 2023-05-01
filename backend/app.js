const express= require('express');
const mongoose=require('mongoose')
const prodRoute=require('./routes/Product.route')
const userRoute=require('./routes/Users.route')
const likeRoute=require('./routes/Likes.route');
const cartRoute=require('./routes/Cart.route');
const historyRoute=require("./routes/History.route")
const handleJson=require('./utils/handlingJson')
const cors = require('cors')
const app=express();

require('dotenv').config()
app.use(express.json());
app.use(cors())



app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_DB_URI
,{
    dbName:"Ecommerce"
})
.then(()=>console.log("mongo is connected"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})
app.use('/console',handleJson);
app.use("/products",prodRoute);
app.use("/users",userRoute);
app.use("/likes",likeRoute);
app.use("/cart",cartRoute);
app.use("/history",historyRoute);

app.listen(3000,()=>{
    console.log("server started on port 3000...");
})