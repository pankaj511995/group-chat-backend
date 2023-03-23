const  express=require( 'express')
const cors =require( 'cors')
const bodyParser =require( 'body-parser')
const userRout =require( './router/user')
const allMessageDetails=require('./router/message')
const groupRouter=require('./router/group')
const sequelize =require( './util/seqelize')
require('dotenv').config()
const app=express()
app.use(bodyParser.json())
app.use(cors({
    // origin:'http://localhost:3000',
    // origin:'*',
    methods:['GET','POST'], 
    credentials: true
}))


//socket
const {Server}=require('socket.io')
const server = require('http').createServer(app);

const io = require('socket.io')(server,{
    cors: {
      origin: "*"
    }
  });

const groupmessage=io.of('/message/send')
groupmessage.on('connection',(socket)=>{
    socket.on('generategroup',group1=>{
        socket.join(Number(group1));
    })
    socket.on('sendmessae',(({group,name,message,id})=>{ 
        socket.broadcast.to(Number(group)).emit('messagetoall',{message:message,name:name,id:id});
      console.log(message,name,id,'->',group)
    }))
})

//socket
app.use('/user',userRout) 
app.use('/message',allMessageDetails)
app.use('/group',groupRouter)

// socket.emit('sendmessae','sent message')




//table creation
const User=require('./models/user')
const Message=require('./models/message')
const Group=require('./models/group')

User.hasMany(Message)
Message.belongsTo(User)

Group.hasMany(Message,{ onDelete: 'cascade' })//if group delete then delete all messages which are related to that group
Message.belongsTo(Group)
User.belongsToMany(Group, {through:'Helpergroup'})
Group.belongsToMany(User, {through:'Helpergroup'})

 
sequelize.sync({force:false}).then(()=>{ 
    server.listen(process.env.PORT)
}).catch(err=>console.log('table not crerated',err))
