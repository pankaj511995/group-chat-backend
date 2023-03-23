const {Router}=require('express')
const {signupuser,signinuser} =require( '../controller/userdetail')
const router=Router()

router.post('/signup',signupuser)
router.post('/signin',signinuser)

module.exports=router