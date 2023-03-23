const {Router}=require('express')
const {authenticat}=require('../middleware/authorization')
const {sendmesssage,getlastMessage} =require( '../controller/Message')
const router=Router()

router.post('/send',authenticat ,sendmesssage)
router.post('/newmessage',authenticat ,getlastMessage)

module.exports=router