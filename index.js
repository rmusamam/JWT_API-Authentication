const express = require("express")
const app=express()
const mongoose= require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

//Import Routes
const authRoute= require('./Route/auth')
const postRout=require('./Route/posts')
url=process.env.DB_CONNECT;

mongoose.connect(url,{
    useNewUrlParser:true
},
()=>{
    console.log('Mongoose Data Base Connected')
})


//MIddleware
app.use(express.json())

//Route Middleware
app.use('/api/user',authRoute)
app.use('/posts',postRout)


app.listen(3000,()=>{
    console.log("server activated on port 3000")
})