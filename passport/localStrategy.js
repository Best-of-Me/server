const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (username, password, done) => {
      User.findOne({ username })
        .then(foundUser => {
          if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
            done(null, false, { message: "Incorrect user or password" });
            return;
          }
          foundUser.password = undefined;
          done(null, foundUser);
        })

        .catch(err => done(err));
    }
  )
);
