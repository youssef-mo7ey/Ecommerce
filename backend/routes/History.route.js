const express= require("express")
const router= express.Router()
const historyController= require("../controllers/historyController")

router.get("/:id",historyController.getHistory)

module.exports=router