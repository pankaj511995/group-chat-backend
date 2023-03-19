const service=require('../service/service')
const Message=require('../models/message')
exports.sendmesssage=async (req,res)=>{
   try{
    await service.validate(res,'please fill all field',req.body.message)
   const user= await req.user.createMessage({name:req.user.name,message:req.body.message})
    res.status(200).json(user)
   }catch(err){
    service.error(res,'something went wrong','error while adding message in database')
   }
}
exports.getlastMessage=async(req,res)=>{
    try{
        console.log(req.query,'lastmessage')
        const lastmess=Number(req.query.lastmessage)
      const message=await  Message.findAll({offset:lastmess})
      res.status(200).json(message)
    }catch(err){
        service.error(res,'something went wrong','error while while gating all message')
       }
}