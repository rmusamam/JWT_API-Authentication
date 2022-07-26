const router = require("express").Router();
const user = require("../Model/user");
const bcryptjs=require('bcryptjs');
const jwt= require("jsonwebtoken")
const { registerValidation,loginValidation } = require("../validation");


//ROUTER OF REGISTER PAGE
router.post("/register", async (req, res) => {


  //lets validate the data before we add a user in DB
  const  {error}  = registerValidation(req.body);
 
  console.log(error , "this is error");

  //CHECKING FOR ALREADY USED EMAIL
  const userExist = await user.findOne({ email: req.body.email });
  if (userExist) {
   console.log ("user already exists");
    res.status(400).send("Email already exists");
  }
  //IF THERE IS AN ERROR OF TYPO 
  if (error) {
    sendError = res.status(400).send(error.details[0].message);
    return sendError;
  }
  // DECRYPTING THE PASSWORD
  const salt= await bcryptjs.genSalt(10)
  const hashedPassword= await bcryptjs.hash(req.body.password,salt)

  //ADDING NEW USER IN DB
  const userAdd = await new user({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    // USER ADDED
    const saveUser = await userAdd.save();
    console.log("User Saved", saveUser);
    res.send(saveUser);
  } catch (err) {
    //USER CAN'T BE ADDED
    res.status(400).send(err);
  }
});


//ROUTER OF LOGIN
router.post('/login',async(req,res)=>{

  //VALIDATE THE USER 
    console.log("enter in login")
    const {error}= loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)


    console.log("checking email")

    //EMAIT NOT EXIST
    const validUser= await user.findOne({email: req.body.email})
    
    if(!validUser) return res.status(400).send("The Email does not exist")


    console.log("checking password")

    const validPassword= await bcryptjs.compare(req.body.password, validUser.password)
    if(!validPassword) return res.status(400).send("The Password is wrong")

  const token=jwt.sign({_id:validUser._id},process.env.TOKEN_SECRET)
  res.header('auth-token',token).send(token)


})


module.exports = router;
