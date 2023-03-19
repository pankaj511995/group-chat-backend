const  express=require( 'express')
const cors =require( 'cors')
const bodyParser =require( 'body-parser')
const userRout =require( './router/user')
const allMessageDetails=require('./router/message')
const sequelize =require( './util/seqelize')
require('dotenv').config()
const app=express()
app.use(cors({
    // origin:'http://localhost:3000',
    // origin:'*',
    methods:['GET','POST'], 
}))
app.use(bodyParser.json())


app.use('/user',userRout) 
app.use('/message',allMessageDetails)

//table creation
const User=require('./models/user')
const Message=require('./models/message')

User.hasMany(Message)
Message.belongsTo(User)

// sequelize.sync({force:false}).then(()=>{
    app.listen(process.env.PORT)
// }).catch(err=>console.log('table not crerated',err))
