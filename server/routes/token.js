const router = require("express").Router();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const upload = require("../config/multerConfig");
const moment = require("moment");
// const upload = require("multer")();

// * Models
const Token = require("../models/token");
const Prices = require("../models/prices");

// (async function a() {
//   // let i = 1;
//   const tokens = await Token.find();
//   tokens.forEach(async (t) => {
//     // t.number = i;
//     // i++;
//     t.maxSupply = t.circulationSupply;
//     await t.save();
//   });
// })();

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
  const tokens = await Token.find().select("-displayInfo");
  // console.log("tokens", tokens);
  // let [token] = tokens;

  // console.log(token);
  // console.log(token.name);
  res.json(tokens);
});

// router.get("/last24hours/:tokenId", async (req, res) => {
// console.log("a");
// const {tokenId} = "5ff12e1f1725fe681c430a57";
// const { tokenId } = req.params;
const get24HourDiff = async (tokenId) => {
  // const today = new Date("2020-10-26T00:00:00.000+00:00");
  const today = new Date();
  let [h, m] = moment(today).format("H:m").split(":");
  m = m - (m % 5);
  // console.log(h, m);
  // const yesterday = new Date();
  // const temp = moment(new Date()).subtract(1, "day");
  const temp = moment(today).subtract(1, "day");
  const yesterday = new Date(temp);

  today.setUTCHours(0, 0, 0, 0);
  yesterday.setUTCHours(0, 0, 0, 0);
  // console.log("today", today);
  // console.log("yesterdaay", yesterday);

  // const start = new Date();

  // const temp = moment(e).add(1, "day").utc();

  const zxc = await Prices.find({
    token: tokenId,
    date: {
      // $and: {
      $lte: today,
      $gte: yesterday,
      // },
    },
  }).sort("date");
  // };
  // console.log(zxc);
  const [yesterdayData, todayData] = zxc;
  // console.log("todayData", todayData.intervals[h][m]);
  // console.log("yesterdayData", yesterdayData.intervals[h][m]);
  // console.log("todayData", todayData);
  // console.log("yesterdayData", yesterdayData);

  // console.log(zxc.length);
  const data = {
    ONE: 0,
    BTC: 0,
    USD: 0,
  };
  if (!yesterdayData || !todayData) return data;

  // if(todayData.intervals[h][m])
  Object.keys(todayData.intervals[h][m]).forEach((key) => {
    const final = todayData.intervals[h][m][key];
    const init = yesterdayData.intervals[h][m][key];
    val = (final - init) / init;
    data[key] = Math.round((val + Number.EPSILON) * 1000) / 1000;
    // console.log();
  });
  return data;
  // res.send(data);
};
// res.send(data);
// });

// * get one token
router.get("/:id", async (req, res) => {
  // a();
  const { id } = req.params;
  const token = await Token.findById(id);
  if (!token) return res.statu(400).send({ error: "Invalid token id" });
  const changeIn24Hour = await get24HourDiff(id);
  // console.log("token", token);
  // let [token] = tokens;
  // const filePath = path.resolve(__dirname, "../tokenFiles", token.symbol);

  // const displayInfo = fs.readFileSync(filePath);
  // console.log(displayInfo);
  // console.log(token);
  // console.log(token.name);
  // const a =
  // res.json({ ...token.toJSON(), displayInfo });
  res.json({ ...token.toJSON(), changeIn24Hour });
});

// * Add a new token
//! admin

router.post("/new", upload.single("image"), async (req, res) => {
  //! no imgae upload
  const count = await Token.count();
  console.log(req.body.newToken);
  console.log(req.body);
  console.log(req.file.filename);
  const body = JSON.parse(req.body.newToken);
  body.image = req.file.filename.toLowerCase();
  // return;
  const { value, error } = tokenValidator.newToken(body);
  if (error)
    return res
      .status(400)
      .send({ error: "Invalid token body", message: error.details[0].message });
  // const filePath = path.resolve(__dirname, "../tokenFiles", value.symbol);
  // fs.writeFileSync(filePath, value.displayInfo);
  // value.displayInfo = filePath;
  // console.log(filePath);
  const newToken = new Token({ ...value, number: count + 1 }); //! pick
  //! add token validation
  await newToken.save();
  res.send(newToken);
});

//! implement change password and forget password

router.post(
  "/newDisplayInfoImage",
  upload.single("image"),
  async (req, res) => {
    //! no imgae upload
    // const count = await Token.count();
    // console.log(req.body.newToken);
    // console.log(req.body);
    console.log(req.file.filename);
    // const body = JSON.parse(req.body.newToken);
    // body.image = req.file.filename.toLowerCase();
    // // return;
    // const { value, error } = tokenValidator.newToken(body);
    // if (error)
    //   return res
    //     .status(400)
    //     .send({ error: "Invalid token body", message: error.details[0].message });
    // const filePath = path.resolve(__dirname, "../tokenFiles", value.symbol);
    // fs.writeFileSync(filePath, value.displayInfo);
    // value.displayInfo = filePath;
    // console.log(filePath);
    // const newToken = new Token({ ...value, number: count + 1 }); //! pick
    // //! add token validation
    // await newToken.save();
    res.send({ url: `/uploads/${req.file.filename}`, name: req.file.filename });
  }
);

router.get("/", async (req, res) => {});

module.exports = router;
