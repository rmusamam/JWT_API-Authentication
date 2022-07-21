const router = require('express').Router();
 

router.post('/register',(req,res)=>{
    console.log(req)
    console.log("Request Body:",req.body);
     res.send("register")
})

module.exports=router;  