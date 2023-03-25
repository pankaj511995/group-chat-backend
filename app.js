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

//socket
app.use('/user',userRout) 
app.use('/message',allMessageDetails) 
app.use('/group',groupRouter)

// socket.emit('sendmessae','sent message')




//table creation
const User=require('./models/user')
const Message=require('./models/message')
const Group=require('./models/group')
const { Socket } = require('dgram')

User.hasMany(Message)
Message.belongsTo(User)

Group.hasMany(Message,{ onDelete: 'cascade' })//if group delete then delete all messages which are related to that group
Message.belongsTo(Group)
User.belongsToMany(Group, {through:'Helpergroup'})
Group.belongsToMany(User, {through:'Helpergroup'})

 
// sequelize.sync({force:false}).then(()=>{ 
    server.listen(process.env.PORT)
// }).catch(err=>console.log('table not crerated',err))




// sending message to all 
io.on('connection',(socket)=>{
    socket.on('generategroup',(room)=>{
     socket.join(room);
        
    })
    socket.on('sendmessae',(room,name,message,id)=>{ 

      socket.to(room).emit('messagetoall',message,name,id);
     
    })
})


