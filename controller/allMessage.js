const service=require('../service/service')
const Message=require('../models/message')
exports.sendmesssage=async (req,res)=>{
   try{
    await service.validate(res,'please fill all field',req.body.message)
    await req.user.createMessage({name:req.user.name,message:req.body.message})
    res.status(200).json({message:'success'})
   }catch(err){
    service.error(res,'something went wrong','error while adding message in database')
   }
}
exports.getAllMessage=async(req,res)=>{
    try{
      const message=await  Message.findAll()
      res.status(200).json(message)
    }catch(err){
        service.error(res,'something went wrong','error while while gating all message')
       }
}