const {error,validate}=require('../service/service')
const Message=require('../models/message')
exports.sendmesssage=async (req,res)=>{
   try{
    const{message,groupId}=req.body
    await validate(res,'please fill all field',message,groupId)
   const user= await req.user.createMessage({name:req.user.name,message:message,GroupId:Number(groupId)})
    res.status(200).json(user)
   
   }catch(err){
      error(res,'something went wrong','error while adding message in database')
   }
}
exports.getlastMessage=async(req,res)=>{
    try{
        const{lastmessage,groupId}=req.body
        console.log(lastmessage,groupId,'lastcall   is ')
      const message=await  Message.findAll({where:{GroupId:Number(groupId)}})
      console.log(message.length)
      res.status(200).json(message)
    }catch(err){
          error(res,'something went wrong','error while while gating all message')
       }
}
