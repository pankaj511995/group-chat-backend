const {error,validate}=require('../service/service')
const Message=require('../models/message')
const {Op}=require('sequelize')
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
      const message=await Message.findAll({ where: {[Op.and]: [{ 
                                          GroupId: Number(groupId) },
                                           {id:{[Op.gte]:lastmessage}},
                                           ]},attributes :['id','name','message','UserId']})
                                       
      res.status(200).json(message)
    }catch(err){
          error(res,'something went wrong','error while while gating all message')
       }
} 

//used multer-s3(in service folder) then gating url from it 
exports.imageupload=async(req,res)=>{
   try{
      const message= await req.user.createMessage({name:'urlLink',message:req.file.location,GroupId:Number(req.headers.groupid)})
  console.log(message,'groupid',Number(req.headers.groupid),'name id ','url')
   res.status(200).json(message)
   }catch(err){
      error(res,'something went wrong','error while while uploading image')
   }
}


