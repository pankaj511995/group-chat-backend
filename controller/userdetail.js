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
exports.signinuser=async(req,res)=>{
    try{
    const {email,password}=req.body
    await servic.validate(res,'please fill all details',email,password)
    const user=await User.findOne({where:{email:email}})
    if(!user){
        return res.status(404).json({message:'New user Sign up now'})
    }
     await servic.bcryptCompare(res,password,user.password)
     res.status(200).json({token:servic.jwttoken(user.id,user.name),message:'success'})
    }catch(err){
        servic.error(res,'something went wrong','error while signin')
    }
}
