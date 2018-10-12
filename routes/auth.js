const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post(
  "/login",(req,res,next)=>{
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next)
});

router.post("/signup", (req, res, next) => {
  console.log(req);
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.status(400).json({ message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(409).json({ message: "The username already exists" });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    console.log(salt, password);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser
      .save()
      .then(() => {
        res.status(201).json({message: `User ${username} has been created` });
      })
      .catch(err => {
        res.status(500).json({ message: "Something went wrong" });
      });
  });
});

router.post("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logout" });
});


router.get('/currentuser', (req,res,next) => {
  if(req.user){
    res.status(200).json(req.user);
  }else{
    res.status(401).json({message:'Not logged in'})
  }
})


module.exports = router;
