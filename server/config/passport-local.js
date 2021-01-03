const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/user");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (email, password, done) {
      User.findOne({ email }, async function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "No user found" });
        }
        const isCorrect = await user.verifyPassword(password);
        if (!isCorrect) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).select("-password");
  if (!user) return done(null, false, { message: "No user found" });
  done(null, user);
});
