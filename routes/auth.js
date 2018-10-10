const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.post("/signup", (req, res, next) => {
  console.log(req);
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.json({ok:false, message: "Indicate username and password" } );
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.json({ok:false, message: "The username already exists" } );
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
        res.json({ ok: true, message: `User ${username} has been created` });
      })
      .catch(err => {
        res.json({ ok: false, message: "Something went wrong" });
      });
  });
});

router.post("/logout", (req, res) => {
  req.logout();
  res.json({ ok:true,message: "Logout" });
});

module.exports = router;
