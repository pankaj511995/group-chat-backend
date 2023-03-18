const express=require('express')
const controller =require( '../controller/userdetail')
const router=express.Router()

router.post('/signup',controller.signupuser)
module.exports=router