// routes for login 
const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // Assuming you have a method like generateAuthToken() in your User model
    const token = user.generateAuthToken();

    return res.status(200).send({ message: "You are successfully logged in", token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal error" });
  }
});

// Validation function using Joi
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(data);
};

module.exports = router;
