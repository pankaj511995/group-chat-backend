const express=require('express')
const controller =require( '../controller/userdetail')
const groupcontroller=require('../controller/groupContol')
const authentication=require('../middleware/authorization')
const router=express.Router()

router.post('/signup',controller.signupuser)
router.post('/signin',controller.signinuser)
router.post('/creategroup',authentication.authenticat,groupcontroller.creategropuAdmin)
router.post('/addmember',authentication.authenticat,groupcontroller.addToGroup)
//if user got added by any member then show him
router.post('/allnewadded',authentication.authenticat,groupcontroller.allGroupOfUser)
router.post('/allmember',authentication.authenticat,groupcontroller.allMemberInGroup)
router.post('/removemember',authentication.authenticat,groupcontroller.removeMemberFromGroup)
module.exports=router