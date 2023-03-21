const Sequelize=require('sequelize')
const sequelize=require('../util/seqelize')
const groupcreation=sequelize.define('Group',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    groupname:{
        type:Sequelize.STRING,
        allowNull:false
    },adminId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
}) 
module.exports=groupcreation 
