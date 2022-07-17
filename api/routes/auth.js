const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register ... creating a user so we use post method
router.post("/register", async (req, res) => {
  // username, email, password, and profile pic is sent to server as req, a newly created user is returned as res

  try {
    const salt = await bcrypt.genSalt(10); //              hashing function to protect user passwords ty bcrypt
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      // creates new  user model
      username: req.body.username, // username that was send as req, gets set as new models' username
      email: req.body.email, // email that was sent as req, gets set as new models' email
      password: hashedPass, // password that was sent as req, gets hashed, then set as models' password
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }); // tries to find the user based on username provided in json body
    !user && res.status(400).json("Wrong credentials.");

    const validated = await bcrypt.compare(req.body.password, user.password); // compares hashed pw and inputted pw
    !validated && res.status(400).json("Wrong credentials.");

    const { password, ...others } = user._doc; // everything but password
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
