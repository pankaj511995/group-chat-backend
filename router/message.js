const express=require('express')
const controller =require( '../controller/allMessage')
const authentication=require('../middleware/authorization')
const router=express.Router()

router.post('/send',authentication.authenticat ,controller.sendmesssage)
router.get('/newmessage',authentication.authenticat ,controller.getlastMessage)

module.exports=router