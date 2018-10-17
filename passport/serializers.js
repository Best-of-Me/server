const passport = require("passport");
const User = require("../models/User");

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession).populate("tasks")
    .then(userDocument => {
      console.log(userDocument)
      cb(null, userDocument);
    })
    .catch(err => {
      cb(err);
    });
});
