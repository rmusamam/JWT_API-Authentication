const express = require("express")
const app=express()

//Import Routes
cost authRoute= require('./Route/auth')


app.listen(3000,()=>{
    console.log("server activated on port 3000")
})