const router = require("express").Router();
const user = require("../Model/user");
const bcryptjs=require('bcryptjs')
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //lets validate the data before we add a user in DB

  const { error } = registerValidation(req.body);
  console.log(error, "this is error");

  //CHECKING FOR ALREADY USED EMAIL
  const userExist = await user.findOne({ email: req.body.email });
  if (userExist) {
    ("user already exists");
    res.status(400).send("Email already exists");
  }

  if (error) {
    sendError = res.status(400).send(error.details[0].message);
    return sendError;
  }

  const salt= await bcryptjs.genSalt(10)
  const hashedPassword= await bcryptjs.hash(req.body.password,salt)

  console.log("if not executed");
  const userAdd = await new user({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const saveUser = await userAdd.save();
    console.log("User Saved", saveUser);
    res.send(saveUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
