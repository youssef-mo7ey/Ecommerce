const express = require('express');
const router = express.Router();
const prodController=require('../controllers/productController')

//Get All
router.get('/', prodController.handleGet)

//post a new product
router.post('/', prodController.handlePost)

//Get by ID
router.get('/:id',prodController.handleGetById)

//update product
router.patch('/:id',prodController.handlePatch)

//delete product
router.delete('/:id',prodController.handleDel)

//add products database
router.post('/postall',prodController.handleAddMoreThanRecord)

module.exports=router