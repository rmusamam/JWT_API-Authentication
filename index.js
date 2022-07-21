const express = require("express")
const app=express()
const mongoose= require('mongoose')
const dotenv=require('dotenv')
dotenv.config()



// url='mongodb+srv://rmusamam:<password>@cluster0.fsilfnm.mongodb.net/?API-CRUD'
url=process.env.DB_CONNECT;

console.log(url)
mongoose.connect(url,{
    useNewUrlParser:true
},()=>{console.log('Data Base Connected')})


//Import Routes
const authRoute= require('./Route/auth')

//Route Middleware
app.use('/api/user',authRoute)


app.listen(3000,()=>{
    console.log("server activated on port 3000")
})