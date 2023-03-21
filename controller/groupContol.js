const service=require('../service/service')
const Group=require('../models/group')
const sequelize=require('../util/seqelize')
const User=require('../models/user')

exports.creategropuAdmin=async(req,res)=>{ 
    const t = await sequelize.transaction();
    try{
        const group=  await Group.create({ groupname:req.body.groupname,adminId:req.user.id},{transaction:t})
            await req.user.addGroup(group,{transaction:t})
                await t.commit()
                res.status(200).json(group.id)
    }catch(err){
        await t.rollback()
        service.error(res,'something went wrong','error while adding message in database')
   }
}
exports.addToGroup=async(req,res)=>{
    try{
             const{groupId,newmember,groupname}=req.body
             const newone= await User.findOne({attributes:['id'],where:{email:newmember}})//taking only id
             const group= await Group.findOne({attributes:['id'],where:{id:groupId,groupname:groupname,adminId:req.user.id}})
          if(newone!=null&&group!=null){
           await newone.addGroup(group)
                 res.status(200).json({message:'user added in group'})
         }else if(!newone){
            res.status(400).json({message:'user does not exit'})
         }else{
            res.status(400).json({message:'only admin can add in this group'})
         }
     }catch(err){
     service.error(res,'user already added in this group','error while adding message in database')
     }
 } 


exports.allGroupOfUser=async(req,res)=>{  
    try{
            const lastcheck=req.body.lastcheck
            console.log(lastcheck,'lastcheck from group')
            const group=await req.user.getGroups({attributes:['id','groupname']})
            res.status(200).json(group)
    }catch(err){
    service.error(res,'something went wrong','error while gating all group')
    }
 }
 exports.allMemberInGroup=async(req,res)=>{
    try{
        const group=await Group.findOne({attributes:['id','adminId'],where:{id:req.body.groupId}})
        const user=await group.getUsers({attributes:['id','name']})
        console.log((group.adminId))
        res.status(200).json({data:user,admin:group.adminId})

    }catch(err){
    service.error(res,'something went wrong','error while gating all group')
    }
 }

  exports.removeMemberFromGroup=async(req,res)=>{
    try{
    const{groupId,userId}=req.body
         const user= await User.findOne({attributes:['id','name'],where:{id:userId}})//taking only id
             const group= await Group.findOne({attributes:['id'],where:{id:groupId,adminId:req.user.id}})
          if(user!=null&&group!=null){
                 await user.removeGroup(group)//removing from group
                 res.status(200).json({message:`${user.name} has been deleted from this group`})
          }else{
            res.status(400).json({message:'only admin can delete from this group'})
         }
        }catch(err){
            service.error(res,'something went wrong','error while gating all group')
         }
  }