const { json } = require('express');
const Product=require('../models/Products.model');
const fs=require('fs')


const buffer=fs.readFileSync('newData.json')
const content=JSON.parse(buffer.toString())


const handleGet= async (req,res,next)=>{

    try{
    const allProds= await Product.find().exec();
    if(allProds?.length<=0){
        allProds.status(400)
        throw new Error('There Is No Products')
    }
    else{
        res.send(allProds)
    }
    
    }
    catch (err){
        console.log(err);
    }
}

const handleGetById= async (req,res,next)=>{

    try{
    const prod= await Product.findById(req.params.id).exec();
    res.send(prod)
    
    }
    catch (err){
        console.log("there is no prod with this id");
    }
}


const handlePost= async (req,res,next)=>{

    try{
        const found= await Product.find({name:req.body.name}) || false; 
        if(found.length>0)
        {
            res.status(400).send('There is already proudct with the same name')
            throw new Error('cant add duplicate data with the same name')
        }
        else{
        const prod= await new Product(req.body).save();
        res.send("sent")
        }

    }
    catch (err){
        console.log(err)
    }
}


const handleAddMoreThanRecord= async (req,res,next)=>{

    try{
        const isFound=await Product.find().exec();
        if(isFound.length>0){
            const delAll=await Product.deleteMany({ __v: 0})
        }

        const inserting = await Product.insertMany(content);
        res.status(200).send("inserted")
    }
    catch (err){
        console.log(err)
    }
}


const handlePatch= async (req,res,next)=>{

    try{        
        const isFound= await Product.findById(req.params.id) || false;
        if(isFound){
            if(req?.body?._id){
                res.status(400).send('cant update id')
                console.log('cant update id')
                
            }
            if(req?.body?.price===null || req?.body?.name==="" || req?.body?.name===" ")
            {
                res.status(400).send('this field cant be empty')
                throw new Error('this field cant be empty')
            }
            else{
            const result= await Product.updateOne({_id:req.params.id},req.body).exec();
            res.send(req.body)
            console.log('patch successful')
            }
        }
        else{
            res.status(400).send('enter valid id')
            console.log('enter valid id')
        }

    }
    catch (err){
        console.log(err)
    }
}

const handleDel=async (req,res,next)=>{
    try{
        const isFound= await Product.findById(req.params.id) || false;
        if(isFound){
            const result = Product.findByIdAndDelete({_id:req.params.id}).exec();
            res.send('deleted')
            console.log('deleted')
    }
        else{
            res.send('not deleted')
            console.log("there is no item with this id");
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports={handleGet,handleDel,handleGetById,handlePost,handlePatch,handleAddMoreThanRecord}