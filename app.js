const  express=require( 'express')
const cors =require( 'cors')
const bodyParser =require( 'body-parser')
const userRout =require( './router/user')
require('dotenv').config()
const app=express()
app.use(cors())
app.use(bodyParser.json())


app.use('/user',userRout) 

const sequelize =require( './models/user')
// const sequelize =require( './util/seqelize')

sequelize.sync({force:false}).then(()=>{
    app.listen(process.env.PORT)
}).catch(err=>console.log('table not crerated',err))
