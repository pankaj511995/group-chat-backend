const {Router}=require('express')
const{upload}=require('../service/multers3')
const {authenticat}=require('../middleware/authorization')
const controller =require( '../controller/Message')
const router=Router()
router.post('/send',authenticat ,controller.sendmesssage)
router.post('/newmessage',authenticat ,controller.getlastMessage) 
router.post('/image',authenticat,upload,controller.imageupload)



module.exports=router