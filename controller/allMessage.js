const service=require('../service/service')
const Message=require('../models/message')
exports.sendmesssage=async (req,res)=>{
   try{
    const{message,groupId}=req.body
    await service.validate(res,'please fill all field',message,groupId)
   const user= await req.user.createMessage({name:req.user.name,message:message,GroupId:Number(groupId)})
    res.status(200).json(user)
   }catch(err){
    service.error(res,'something went wrong','error while adding message in database')
   }
}
exports.getlastMessage=async(req,res)=>{
    try{
        console.log(req.query,'lastmessage')
        const{lastmessage,messageId}=req.query
      const message=await  Message.findAll({offset:Number(lastmessage)},{messageId:Number(messageId)})
      res.status(200).json(message)
    }catch(err){
        service.error(res,'something went wrong','error while while gating all message')
       }
}
