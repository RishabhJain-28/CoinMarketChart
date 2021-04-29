const router = require("express").Router();
const moment = require("moment");

const cloudinary = require("../config/cloudinaryConfig");
const upload = require("../config/multerConfig");
const { getConversionRates } = require("../util/conversionRates");

// * Models
const Token = require("../models/token");
const Prices = require("../models/prices");

// * Middleware

//* Validation
const tokenValidator = require("../validation/token");

router.get("/conversionPrices", async (req, res) => {
  const conversionRates = await getConversionRates(req);
  console.log("data", conversionRates);
  res.send(conversionRates);
});

// * get all tokens
router.get("/", async (req, res) => {
  console.time("tokens");
  const tokens = await Token.find().select("-displayInfo");
  console.timeEnd("tokens");
  const { onePriceInUSD, btcPriceInUSD } = await getConversionRates(req);

  const tokensJSON = tokens.map((token) => {
    const ONE = token.price;
    const USD = onePriceInUSD / ONE;
    const BTC = (onePriceInUSD / ONE) * btcPriceInUSD;
    const t = token.toJSON();
    t.convertedPrices = {
      ONE,
      USD,
      BTC,
    };
    return t;
  });
  res.json(tokensJSON);
});

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

// * get one token
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const token = await Token.findById(id);
  if (!token) return res.statu(400).send({ error: "Invalid token id" });
  const changeIn24Hour = await get24HourDiff(id);

  const { onePriceInUSD, btcPriceInUSD } = await getConversionRates(req);
  const ONE = token.price;
  const USD = onePriceInUSD / ONE;
  const BTC = (onePriceInUSD / ONE) * btcPriceInUSD;
  const t = token.toJSON();
  t.convertedPrices = {
    ONE,
    USD,
    BTC,
  };

  res.json({ ...t, changeIn24Hour });
});

// * Add a new token
//! admin
// ! add name

router.post("/new", async (req, res) => {
  const count = await Token.count();

  const { value, error } = tokenValidator.token(req.body);

  if (error)
    return res
      .status(400)
      .send({ error: "Invalid token body", message: error.details[0].message });

  const newToken = new Token({ ...value, number: count + 1 }); //! pick
  //! add token validation

  await newToken.save();
  console.log("donee", newToken);
  res.send(newToken);
});

// * Edit a new token
//! admin

router.put("/edit/:id", async (req, res) => {
  // const count = await Token.count();
  const { id } = req.params;
  const { value, error } = tokenValidator.token(req.body);

  if (error)
    return res
      .status(400)
      .send({ error: "Invalid token body", message: error.details[0].message });

  // const newToken = new Token({ ...value, number: count + 1 }); //! pick
  //! add token validation
  const token = await Token.findByIdAndUpdate(id, { ...value });

  // await newToken.save();
  console.log("donee", token);
  res.send(token);
});

//! implement change password and forget password

router.post("/imageUpload", upload.single("image"), async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.file.path,
    {
      public_id: `tokens/${req.file.filename}`,
    },
    function (error) {
      if (error) console.log("error in uploading img", error);
    }
  );

  res.send({ url: result.url, name: req.file.filename });
});

module.exports = router;
