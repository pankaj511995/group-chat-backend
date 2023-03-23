const {Router}=require('express')
const groupcontroller=require('../controller/groupContol')
const {authenticat}=require('../middleware/authorization')

const router=Router()


router.post('/creategroup',authenticat,groupcontroller.creategropuAdmin)
router.post('/addmember',authenticat,groupcontroller.addToGroup)
router.post('/allnewadded',authenticat,groupcontroller.allGroupOfUser)
router.get('/joingeoup/:id',authenticat,groupcontroller.joinByLink)
router.post('/allmember',authenticat,groupcontroller.allMemberInGroup)
router.post('/removemember',authenticat,groupcontroller.removeMemberFromGroup)

module.exports=router