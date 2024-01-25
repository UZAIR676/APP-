const router = require("express").Router();
const { user, validate, User } = require("../models/user");
const bcrypt = require("bcrypt")

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).send({ message: "User already exists." });
    }
    res.status(200).send({ message: "User created successfully." });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPasword =await bcrypt.hash(req.body.password,salt )
    await new user({...req.body,password:hashPasword}).save();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
    req.status(201).send({message:"user succesfully created "});
  }
});

module.exports = router;
