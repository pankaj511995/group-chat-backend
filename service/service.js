const bcrypt=require('bcrypt')
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