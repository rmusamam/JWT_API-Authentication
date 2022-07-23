const router = require("express").Router();
const user = require("../Model/user");
const{registerValidation}=require('../validation')

router.post("/register", async (req, res) => {

//lets validate the data before we add a user in DB

// const {error}=schema.validate(req.body)
const {error}=registerValidation(req.body)
console.log(error,'this is error')
// Testing the response
// res.send(error)
// console.log(error.details[0].message)

if(error){
    sendError=res.status(400).send(error.details[0].message);
    return sendError
}

    console.log('if not executed')
    const userAdd =  await new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
  });
  try {
     const saveUser = await userAdd.save();
     console.log("User Saved", saveUser);
    // res.send(saveUser);
    res.send(saveUser)
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
