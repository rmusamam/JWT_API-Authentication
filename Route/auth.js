const router = require("express").Router();
const user = require("../Model/user");

router.post("/register", async (req, res) => {
  const userAdd =  await new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
     const saveUser = await userAdd.save();
    // console.log("User Saved", saveUser);
    // res.send(saveUser);
    res.send(saveUser)
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
