const router = require("express").Router();
const axios = require("axios");

const upload = require("../config/multerConfig");
// const upload = require("multer")();
const moment = require("moment");
// * Models

const Prices = require("../models/prices");
const PricesTemp = require("../models/prices_temp");

// * Middleware

// //* Validation
// const tokenValidator = require("../validation/token");

// router.get("/chart", async (req, res) => {
//   const id = '5ff12bbe8405ff4e70a04b67';
//     const charts = await Chart.find({token});
//   res.send(charts);
// });
// router.get("/data", async (req, res) => {
//   console.log("startd");
//   const id = "5ff12bbe8405ff4e70a04b67";
//   const token = await Token.findById(id).populate("chartData");
//   const temp = token.toJSON();
//   // temp.chartData.forEach((v) => {
//   //   console.log(moment(v.time).format("MMMM Do YYYY, h:mm:ss a"));
//   // });
//   res.send(temp.chartData);
//   console.log("coomleted");
// });
// ! validation
// router.get("/data/:start/:end", async (req, res) => {
router.get("/data/:tokenId/:start/:end/:every", async (req, res) => {
  console.time("dbsave1");

  console.log("start PRICES");
  // const { start, end } = req.params;
  const { start: s, end: e, every, tokenId } = req.params;
  const step = parseInt(every);

  // const start = moment(s).format("YYYY-MM-D");
  // const start = new Date(s);
  // let temp;

  // if (step === 5) temp = moment(e).utc();
  // else temp = moment(e).add(1, "day").utc();
  // const temp = moment(e).add(1, "day").utc();
  const temp2 = moment(s).subtract(1, "day").utc();

  const end = new Date(e);
  const start = new Date(temp2);
  // else  end = new Date(temp);

  // const start = moment(s).format("YYYY-MM-D");
  // const end = moment(e).format("YYYY-MM-D");
  console.log("start", start);
  console.log("end", end);
  //   console.log("step", step);
  // const e = moment(new Date());
  // const end = e.format();
  // const start = moment(e).subtract(30, "days").format();
  // const sShow = moment(e)
  // .subtract(30, "days")
  // .format("MMMM Do YYYY, h:mm:ss a");
  // const eShow = e.format("MMMM Do YYYY, h:mm:ss a");

  // const id = "5ff12bbe8405ff4e70a04b67";
  // const token = await Token.findById(id).populate("chartData");
  // var endUTC = Math.round(new Date(end).getTime() / 1000);
  // var startUTC = Math.round(new Date(start).getTime() / 1000);

  const chartData = await Prices.find({
    token: tokenId,
    date: {
      // $and: {
      $lte: end,
      $gte: start,
      // $lte: endUTC,
      // $gte: startUTC,
      // },
    },
  }).sort("date");
  console.timeEnd("dbsave1");
  console.log("chartData.length", chartData.length);
  console.log("fetched");
  console.log("step", step);
  const data = [];
  chartData.forEach((day, i) => {
    // let m = 0;
    // console.log("dates");
    let t = 0;
    while (t / 60 < 24) {
      let m = parseInt(t % 60);
      let h = parseInt(t / 60);
      //   console.log("t", t);

      t += step;
      let hour, minute;
      if (m <= 9) minute = `0${m}`;
      else minute = `${m}`;
      if (h <= 9) hour = `0${h}`;
      else hour = `${h}`;
      const time = `${hour}:${minute}`;
      if (!day.intervals[h][m].ONE) continue;

      // console.log(day.intervals[h][m].ONE);
      // console.log(
      //   "timeStamp",
      //   moment(
      //     moment(new Date(day.date)).format("YYYY-MM-DD") + " " + time
      //   ).format("MMMM Do YYYY h:mm a")
      // );
      // console.log("h", h);
      // console.log("m", m);
      const timeStamp = moment(
        moment(new Date(day.date)).format("YYYY-MM-DD") + " " + time
      ).format();
      data.push({
        time: timeStamp,
        ONE: day.intervals[h][m].ONE,
        BTC: day.intervals[h][m].BTC,
        USD: day.intervals[h][m].USD,
      });
    }
    // for (let h = 0; h < 24; h++) {
    //   for (let m = 0; m < 60; m += s) {
    //   }
    // }

    // if (i % step !== 0) return;
    // data.push(e);
  });

  // endTime: { $gte: user_date } })
  // const temp = token.toJSON();
  // data.forEach((v) => {
  //   console.log(moment(v.time).format("MMMM Do YYYY, h:mm:ss a"));
  // });
  // console.log("eShow", eShow);
  // console.log("sShow", sShow);
  console.log("coomleted");
  res.send(data);
});

router.get("/data-test/:tokenId", async (req, res) => {
  console.time("dbsave2");
  const { tokenId } = req.params;

  console.log("start PRICES2");
  // const { start, end } = req.params;
  // const { start: s, end: e, every, tokenId } = req.params;
  const step = 5;

  const chartData = await PricesTemp.find({ token: tokenId }).sort("date");
  console.timeEnd("dbsave2");

  console.log("chartData.length", chartData.length);
  console.log("fetched");
  console.log("step", step);
  const data = [];
  return res.send(chartData);

  chartData.forEach((day, i) => {
    let t = 0;
    while (t / 60 < 24) {
      let m = parseInt(t % 60);
      let h = parseInt(t / 60);

      t += step;
      let hour, minute;
      if (m <= 9) minute = `0${m}`;
      else minute = `${m}`;
      if (h <= 9) hour = `0${h}`;
      else hour = `${h}`;
      const time = `${hour}:${minute}`;
      if (!day.intervals[h][m].ONE) continue;

      const timeStamp = moment(
        moment(new Date(day.date)).format("YYYY-MM-DD") + " " + time
      ).format();
      data.push({
        time: timeStamp,
        ONE: day.intervals[h][m].ONE,
        BTC: day.intervals[h][m].BTC,
        USD: day.intervals[h][m].USD,
      });
    }
  });
  console.log("coomleted 2");
  res.send(data);
});

module.exports = router;
