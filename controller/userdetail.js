const servic=require('../service/service')

const User=require('../models/user')
exports.signupuser=async(req,res)=>{
    try{
        const {name,email,phone,password}=req.body
        await servic.validate(res,'please fill all details',name,email,phone,password)
        const hash=await servic.generatePassword(password)
       await User.create({name:name,email:email,phone:phone,password:hash})
    }catch(er){
    servic.error(res,'user already exit','error while signup')
    }
}