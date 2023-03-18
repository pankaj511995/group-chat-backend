const servic=require('../service/service')

const User=require('../models/user')
exports.signupuser=async(req,res)=>{
    try{
        const {name,email,phone,password}=req.body
        await servic.validate(res,'please fill all details',name,email,phone,password)
        const hash=await servic.generatePassword(password)
       await User.create({name:name,email:email,phone:phone,password:hash})
       res.status(200).json({message:'Successfuly signed up'})
    }catch(er){
    servic.error(res,'User already exists, Please Login','error while signup')
    }
}