const router = require("express").Router();
const user = require("../Model/user");
const joi= require("@hapi/joi")

const schema=joi.object({
    name:joi.string()
    .min(5)
    .required(),
    email:joi.string()
    .min(5)
    .required(),
    password:joi.string()
    .min(5)
    .required()
})


router.post("/register", async (req, res) => {

//lets validate the data before we add a user in DB

const validate=schema.validate(req.body)
res.send(validate)

//   const userAdd =  await new user({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   try {
//      const saveUser = await userAdd.save();
//     // console.log("User Saved", saveUser);
//     // res.send(saveUser);
//     res.send(saveUser)
//   } catch (err) {
//     res.status(400).send(err);
//   }
});

module.exports = router;
