const express = require("express")
const router =express.Router()
const cartController= require("../controllers/cartController")


router.get("/:id",cartController.getCartOfUser)

router.post("/",cartController.handleAddToCart)

router.post("/guest",cartController.handleAddToCartGuest)

router.delete("/",cartController.handleDeleteFromCart)

router.patch("/",cartController.handleNumOfProd)

router.delete("/:id",cartController.handleCheckOut)

module.exports=router