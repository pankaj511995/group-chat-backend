const service=require('../service/service')
const User=require('../models/user')
exports.authenticat=async(req,res,next)=>{
    try{
        const  token=await service.verify(res,req.headers.token)
        const user=await User.findByPk(token.id)
        req.user=user
        next()
}catch(err){
    service.error(res,'user does not exit','error while authentication user')
}
}