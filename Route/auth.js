const express = require('express')
const router= express();


router.get('/register',(req,res)=>{
     res.send("register")
})

module.exports=router;