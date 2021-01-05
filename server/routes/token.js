const router = require("express").Router();
const axios = require("axios");

const upload = require("../config/multerConfig");
// const upload = require("multer")();

// * Models
const Token = require("../models/token");

// * Middleware

//* Validation
const tokenValidator = require("../validation/token");

router.get("/conversionPrices", async (req, res) => {
  const { data: ONE } = await axios.get(
    "https://api.binance.com/api/v1/ticker/price?symbol=ONEUSDT"
  );
  const { data: BTC } = await axios.get(
    "https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT"
  );
  const data = {
    onePriceInUSD: ONE.price,
    btcPriceInUSD: BTC.price,
  };
  // console.log(data);
  res.send(data);
  //! save to db
});

router.get("/ONEUSDT", async (req, res) => {
  const { data } = await axios.get(
    "https://api.binance.com/api/v1/ticker/price?symbol=ONEUSDT"
  );
  // console.log(data);
  res.send(data);
  //! save to db
});

router.get("/BTCUSDT", async (req, res) => {
  const { data } = await axios.get(
    "https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT"
  );
  // console.log(data);
  res.send(data);
  //! save to db
});

// * get all tokens
router.get("/", async (req, res) => {
  const tokens = await Token.find();
  // console.log("tokens", tokens);
  // let [token] = tokens;

  // console.log(token);
  // console.log(token.name);
  res.json(tokens);
});

// * get one token
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const token = await Token.findById(id);
  if (!token) return res.statu(400).send({ error: "Invalid token id" });
  console.log("token", token);
  // let [token] = tokens;

  // console.log(token);
  // console.log(token.name);
  res.json(token);
});

// * Add a new token
//! admin

router.post("/new", upload.single("image"), async (req, res) => {
  //! no imgae upload

  console.log(req.body.newToken);
  console.log(req.body);
  console.log(req.file.filename);
  const body = JSON.parse(req.body.newToken);
  body.image = req.file.filename;
  // return;
  const { value, error } = tokenValidator.newToken(body);
  if (error)
    return res
      .status(400)
      .send({ error: "Invalid token body", message: error.details[0].message });
  const newToken = new Token({ ...value }); //! pick
  //! add token validation
  await newToken.save();
  res.send(newToken);
});

//! implement change password and forget password

module.exports = router;
