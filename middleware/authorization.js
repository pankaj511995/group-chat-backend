const {error,verify}=require('../service/service')
const User=require('../models/user')
exports.authenticat=async(req,res,next)=>{
    try{
        const  token=await verify(res,req.headers.token)
        const user=await User.findByPk(token.id)
        if(user){
            req.user=user
            next()
        }else throw new Error('user not exit')
        
}catch(err){ 
    error(res,'user does not exit','error while authentication user')
}
}