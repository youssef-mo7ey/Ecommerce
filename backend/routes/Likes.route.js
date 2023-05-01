const express =require('express');
const router=express.Router();
const likesController=require('../controllers/likesController')

//is liked
router.get('/:uid/:id',likesController.handleIsLiked)

//get all likes for user
router.get('/:uid',likesController.handleGetAllLikesForUser)

router.post('/',likesController.handlePostLike)

router.delete('/:uid/:id',likesController.handleUnLike)


module.exports=router;