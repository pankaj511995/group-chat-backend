const {error}=require('../service/service')
const Group=require('../models/group')
const sequelize=require('../util/seqelize')
const User=require('../models/user')
const {Op}=require('sequelize')

exports.creategropuAdmin=async(req,res)=>{ 
    const t = await sequelize.transaction();
    try{
        const group=  await Group.create({ groupname:req.body.groupname,adminId:req.user.id},{transaction:t})
            await req.user.addGroup(group,{transaction:t})
                await t.commit()
                res.status(200).json(group.id)
    }catch(err){
        await t.rollback()
        error(res,'something went wrong','error while adding message in database')
   }
}
exports.addToGroup=async(req,res)=>{
    try{
             const{groupId,newmember,groupname}=req.body
             const newone= User.findOne({attributes:['id'],where:{email:newmember}})//taking only id
             const group= Group.findOne({attributes:['id'],where:{id:groupId,groupname:groupname,adminId:req.user.id}})
             const add=await Promise.all([newone,group])
             
          if(add[0]!=null&&add[1]!=null){
           await add[0].addGroup(add[1])
                 res.status(200).json({message:`successfully added in group`})

         }else if(add[0]===null) res.status(400).json({message:'user does not exit'})

         else res.status(400).json({message:'only admin can add in this group'})
         
     }catch(err){
     error(res,'user already added in this group','error while adding message in database')
     }
 } 

exports.joinByLink=async(req,res)=>{
    try{
         const group= await Group.findOne({attributes:['id','groupname'],where:{id:req.params.id}})
           await req.user.addGroup(group)
           res.status(200).json({message:`you joined in ${group.groupname}`})
     }catch(err){
            error(res,'something went  wrong','error while joining group')
         }
}
exports.allGroupOfUser=async(req,res)=>{  
    try{
            const lastcheck=req.body.lastcheck
            const group=await req.user.getGroups({where:{id:{[Op.gte]:Number(lastcheck)}},attributes:['id','groupname']})
            res.status(200).json(group)
    }catch(err){
    error(res,'something went wrong','error while gating all group')
    }
 }
 exports.allMemberInGroup=async(req,res)=>{
    try{
        const{lastcheck,groupId}=req.body
        const group=await Group.findOne({attributes:['id','adminId'],where:{id:groupId}})
        const user=await group.getUsers({attributes:['id','name']})
        console.log(lastcheck,groupId)
        res.status(200).json({data:user,admin:group.adminId})

    }catch(err){
        error(res,'something went wrong','error while gating all group')
    }
 }

  exports.removeMemberFromGroup=async(req,res)=>{
    try{
            const{groupId,userId}=req.body
            const user= User.findOne({attributes:['id','name'],where:{id:userId}})//taking only id
            const group=  Group.findOne({attributes:['id'],where:{id:groupId,adminId:req.user.id}})
                
              const remove=await Promise.all([user,group])
            if(remove[0]!=null&&remove[1]!=null){
                    await remove[0].removeGroup(remove[1])//removing from group
                    res.status(200).json({message:`${remove[0].name} has been deleted from this group`})
            }else{
                res.status(400).json({message:'only admin can delete from this group'})
            }
        }catch(err){
            error(res,'something went wrong','error while gating all group')
      }
  }