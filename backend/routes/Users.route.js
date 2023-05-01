const express = require('express');
const router = express.Router();
const userController=require('../controllers/userController')

router.post('/register',userController.handleRegister)

router.post('/login',userController.handleLogin)

router.patch('/phone/:id',userController.handlePhone)
router.patch('/address/:id',userController.handleAddress)
    
//router.get('/:id', userController.handleGetPhoneAndId)

    

module.exports=router;