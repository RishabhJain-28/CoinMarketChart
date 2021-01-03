const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { pick, omit } = require("underscore");

//* Models
const User = require("../models/user");
const Token = require("../models/token");

// * Middleware
const isAuthenticated = require("../middleware/isAuthenticated");

// * Validators
const userValidator = require("../validation/user");

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).send({ error: "no user found", info });
    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.status(200).send({
        message: "Login Successfull.",
        user: omit(user.toJSON(), ["password"]),
      });
    });
  })(req, res, next);
};

router.post("/login", login);
router.get("/logout", function (req, res) {
  req.logout();
  res.send({ message: "Logged out" });
});

// * create new user
router.post(
  "/new",
  async (req, res, next) => {
    const { value, error } = userValidator.newUser(req.body);
    if (error)
      return res.status(400).send({
        error: "Invalid user detials",
        message: error.details[0].message,
      });

    if (value.password !== value.confirmPassword)
      return res.status(400).send({ errror: "Passwords do not match." });

    const existingUser = await User.findOne({ email: value.email });

    if (existingUser)
      return res.status(400).send({ message: "email already registered." });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(value.password, salt);

    const reqBody = pick(value, ["firstName", "lastName", "email"]);

    const newUser = new User({
      ...reqBody,
      password,
    });
    await newUser.save();
    req.body = { email: newUser.email, password: value.password };
    // res.redirect("/user/login");
    // res.send(newUser);
    next();
  },
  login
);

router.get("/profile", isAuthenticated, (req, res) => {
  res.send({ user: req.user });
});

router.put("/watchist/add/:tokenId", isAuthenticated, async (req, res) => {
  const { tokenId } = req.params;

  const token = await Token.findById(tokenId);
  if (!token) return res.status(400).send({ error: "Invalid token id" });

  const alreadyInWatchlist = req.user.watchlist.includes(tokenId);
  if (alreadyInWatchlist)
    return res.status(400).send({ error: "Token already added in watchlist" });
  req.user.watchlist.push(tokenId);
  await req.user.save();
  res.send({
    message: "token added to watchlist",
    updatedWatchlist: req.user.watchlist,
  });
});

router.put("/watchist/delete/:tokenId", isAuthenticated, async (req, res) => {
  const { tokenId } = req.params;

  req.user.watchlist = req.user.watchlist.filter(
    (t) => t.toString().trim() !== tokenId.trim()
  );
  await req.user.save();
  res.send({
    message: "token removed from watchlist",
    updatedWatchlist: req.user.watchlist,
  });
});

module.exports = router;
