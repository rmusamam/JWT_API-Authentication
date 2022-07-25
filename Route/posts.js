const router = require("express").Router();
const verify= require('./varifyToken')

router.get('/',verify,(req,res)=>{
user.findOne({_id:req.body})
res.send(req.body)
})


module.exports=router;