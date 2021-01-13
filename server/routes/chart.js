const router = require("express").Router();
const axios = require("axios");

const upload = require("../config/multerConfig");
// const upload = require("multer")();
const moment = require("moment");
// * Models
const Token = require("../models/token");
const Chart = require("../models/chart");

// * Middleware

// //* Validation
// const tokenValidator = require("../validation/token");

// router.get("/chart", async (req, res) => {
//   const id = '5ff12bbe8405ff4e70a04b67';
//     const charts = await Chart.find({token});
//   res.send(charts);
// });
router.get("/data", async (req, res) => {
  console.log("startd");
  const id = "5ff12bbe8405ff4e70a04b67";
  const token = await Token.findById(id).populate("chartData");
  const temp = token.toJSON();
  // temp.chartData.forEach((v) => {
  //   console.log(moment(v.time).format("MMMM Do YYYY, h:mm:ss a"));
  // });
  res.send(temp.chartData);
  console.log("coomleted");
});

// router.get("/data/:start/:end", async (req, res) => {
router.get("/data/:start/:end/:every", async (req, res) => {
  console.log("startd2");
  // const { start, end } = req.params;
  const { start, end, every } = req.params;
  const step = every / 5;
  console.log("start", start);
  console.log("end", end);
  console.log("step", step);
  // const e = moment(new Date());
  // const end = e.format();
  // const start = moment(e).subtract(30, "days").format();
  // const sShow = moment(e)
  // .subtract(30, "days")
  // .format("MMMM Do YYYY, h:mm:ss a");
  // const eShow = e.format("MMMM Do YYYY, h:mm:ss a");

  const id = "5ff12bbe8405ff4e70a04b67";
  // const token = await Token.findById(id).populate("chartData");
  const chartData = await Chart.find({
    token: id,
    time: {
      // $and: {
      $lte: end,
      $gte: start,
      // },
    },
  });

  const data = [];
  chartData.forEach((e, i) => {
    if (i % step !== 0) return;
    data.push(e);
  });

  // endTime: { $gte: user_date } })
  // const temp = token.toJSON();
  data.forEach((v) => {
    console.log(moment(v.time).format("MMMM Do YYYY, h:mm:ss a"));
  });
  // console.log("eShow", eShow);
  // console.log("sShow", sShow);
  console.log("coomleted");
  res.send(data);
});
router.get("/", async (req, res) => {
  res.send("a");
});

module.exports = router;
