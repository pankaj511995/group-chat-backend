const Sequelize=require('sequelize')
const sequelize=require('../util/seqelize')
const userdetails=sequelize.define('Message',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    message:{
        type:Sequelize.STRING,
        allowNull:false
        
    }
}) 
module.exports=userdetails 