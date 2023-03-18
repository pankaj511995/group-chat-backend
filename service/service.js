const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { resolve } = require('path')
exports.generatePassword=(password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.hash(password,Number(process.env.SALT),((err,result)=>{
            if(result){
                resolve(result)
            }
            else{
                reject(err)
            }
        }))
    })
}
exports.validate=(res,message,one,two,three,four)=>{
    return new Promise((resolve,reject)=>{
        if(one===''|| two==='' ||three===''||four===''){
            return res.status(400).json({message:message})
        }else{
            resolve('success')
        }
    })
}
exports.error=(res,sendmessage,printmessage)=>{
    res.status(400).json({message:sendmessage})
    console.log(printmessage)
}
exports.bcryptCompare=(res,password1,password2)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password1,password2,((err,result)=>{
            if(result){
                resolve(result)
            }else{
                return res.status(401).json({message:'incorrect password'})
            }
        }))
    })
}
exports.jwttoken=(id,name)=>jwt.sign({id,name},process.env.JWT_TOKEN)