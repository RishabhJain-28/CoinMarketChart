const cron = require("node-cron");
const fs = require("fs");
const main = require("../data/main");
const Token = require("../models/token");
const Chart = require("../models/chart");
// const PricesTemp = require("../models/prices_temp");
const Prices = require("../models/prices");

const axios = require("axios");
const moment = require("moment");

// const addDataPoint = async (ele) => {
//   const ONE = ele.price;
//   const onePriceInUSD = 1;
//   const btcPriceInUSD = 1;
//   const USD = onePriceInUSD / ONE;
//   const BTC = (onePriceInUSD / ONE) * btcPriceInUSD;
//   const currentDate = moment("2021-01-16" + " " + "23:40");
//   let bucket = await Prices.findOne({ date: currentDate.format("YYYY-MM-D") });
//   if (!bucket) {
//     bucket = new Prices({
//       date: currentDate.format("YYYY-MM-D"),
//       token: ele._id,
//       // intervals: {},
//     });
//   }
//   // const hour = parseInt(currentDate.format("H"));
//   const hour = currentDate.format("H");
//   const minuteNum = parseInt(currentDate.format("m"));
//   const q = parseInt(minuteNum / 5);
//   const minute = q * 5;
//   console.log("hour", hour);
//   console.log("minute", minute);
//   bucket.intervals[hour][minute] = { USD, ONE, BTC };
//   // console.log(bucket.intervals);
//   console.log(bucket.intervals[hour]);
//   console.log(bucket.intervals[hour][minute]);
//   await bucket.save();
// };

//   const newPrice = new Chart({
//     token: ele._id,
//     time: moment(new Date()).format(),
//     USD,
//     BTC,
//     ONE,
//   });
//   await newPrice.save();
//   await ele.save();
// };

// const addDataPoint = async  (ele) => {
//   //   delete ele.found;
//   //   base.push(ele.base);
//   const ONE = ele.price;
//   const USD = onePriceInUSD / ONE;
//   const BTC = (onePriceInUSD / ONE) * btcPriceInUSD;
//   const newPrice = new Chart({
//     token: ele._id,
//     time: moment(new Date()).format(),
//     USD,
//     BTC,
//     ONE,
//   });
//   await newPrice.save();
//   await ele.save();
// }

module.exports = () => {
  // addDataPoint({ _id: "5ff12bbe8405ff4e70a04b67", price: 2 });
  // return;
  async function getUpadtedData() {
    const tokens = await Token.find().select("-displayInfo");
    // const [ONE, ONEs, ...tokens] = await Token.find();

    // async function getONEUSDT() {
    //   const { data } = await axios.get(
    //     "https://api.binance.com/api/v1/ticker/24hr?symbol=ONEUSDT"
    //   );
    // }

    // const { data:ONEUSDT } = await axios.get(
    //   "https://api.binance.com/api/v1/ticker/24hr?symbol=ONEUSDT"
    // );

    // ONE.price = ONEUSDT.lastPrice

    // const [A, B] = await Token.find();
    // const tokens = [A, B];
    const mainPool = {};
    tokens.forEach((t) => {
      mainPool[t.address] = t;
    });
    const data = await main(mainPool);
    // const data = tokens;
    // console.log("data", data);
    // data.forEach
    // const base = [];
    // console.log(base);
    // console.log("qa");
    let contractAddressData = [];
    try {
      const { data } = await axios.get(
        "https://explorer.hmny.io:8888/hrc20-token-list"
      );
      contractAddressData = data;
    } catch (err) {
      console.log("explorer ", err);
    } // const [/] = contractAddressData
    // console.log(contractAddressData[0]);
    // data.forEach((t) =>console.log(t.))
    const found = [];
    // console.log('re')
    // console.log("re");

    // console.log(contr);
    contractAddressData.forEach((element) => {
      const poolIndex = data.findIndex(
        (d) => !d.found && d.symbol === element.symbol
      );
      //   console.log("checking\n------------------------");
      const isFound = found.find((f) => f === element.symbol);
      //   console.log("checking done \n------------------------");
      if (poolIndex === -1 || isFound) return;
      found.push(element.symbol);
      //   console.log(element.name);
      //? console.log("found", data[poolIndex].symbol);
      data[poolIndex].found = true;
      data[poolIndex].contractAddress = element.contractAddress;
      data[poolIndex].maxSupply = Math.floor(
        element.totalSupply / Math.pow(10, element.decimals)
      );
      data[poolIndex].circulationSupply = Math.floor(
        element.totalSupply / Math.pow(10, element.decimals)
      );
    });

    const {
      data: { price: onePriceInUSD },
    } = await axios.get(
      "https://api.binance.com/api/v1/ticker/price?symbol=ONEUSDT"
    );
    const {
      data: { price: btcPriceInUSD },
    } = await axios.get(
      "https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT"
    );
    //? console.log("onePriceInUSD in CRON", onePriceInUSD);

    const d = moment(new Date());
    const hour = Math.floor(Number(d.format("H")) / 6);
    const currentDate = new Date(d.format("YYYY-MM-DD"));

    // currentDate.setHours(hour * 6);

    let start = moment(new Date(d.format("YYYY-MM-DD")));
    const date_value = start.format("MMMM Do YYYY, h:mm:ss a");
    //? console.log("date_value", date_value);
    console.log("currentDate", currentDate);

    let cd = moment(new Date());
    // const cd = new Date.UTC();

    const addDataPoint = async (ele) => {
      const ONE = ele.price;
      // const onePriceInUSD = 1;
      // const btcPriceInUSD = 1;
      const USD = onePriceInUSD / ONE;
      const BTC = (onePriceInUSD / ONE) * btcPriceInUSD;

      let bucket = await Prices.findOne({
        date: currentDate,
        token: ele._id,
      });
      if (!bucket) {
        console.log("new bucket");
        bucket = new Prices({
          date: currentDate,
          token: ele._id,
          // intervals: {},
        });
      } else {
        // console.log("old bucket");
        // console.log("bucket", bucket.date);
      }

      // const hour = Math.floor(Number(cd.format("H")) % 6);
      const hour = cd.format("H");

      const minuteNum = parseInt(cd.format("m"));
      const q = parseInt(minuteNum / 5);
      const minute = q * 5;
      // console.log("hour", hour);
      // console.log("minute", minute);
      bucket.intervals[hour][minute] = { USD, ONE, BTC };
      // console.log(bucket.intervals);
      // console.log(bucket.intervals[hour]);
      // console.log(bucket.intervals[hour][minute]);
      // console.log(moment(bucket.date).format("MMMM Do YYYY h:mm:ss a"));
      await bucket.save();
      ele.bucket = bucket;
    };
    data.forEach(addDataPoint);
    data.forEach(async (d, i) => {
      await d.save();
      console.log("done", i);
    });
    // io.emit("update", {
    //   tokens: data,
    //   conversionPrices: {
    //     onePriceInUSD,
    //     btcPriceInUSD,
    //   },
    // });
    console.log("done");
  }
  // getUpadtedData();
  // // })();
  // let minutes = "";
  // for (let i = 0; i < 58; i += 1) {
  //   minutes += `${i},`;
  // }
  // minutes += `58`;
  ////////////////////////////////////////////!
  let minutes = "";
  for (let i = 0; i < 55; i += 5) {
    minutes += `${i},`;
  }
  minutes += `55`;
  ////////////////////////////////////////////!
  // console.log(minutes);
  const task = cron.schedule(`${minutes} * * * *`, getUpadtedData, {
    scheduled: false,
  });
  // console.log(process.env.CRON);
  if (process.env.CRON === "true") {
    console.log("cron STARTED");
    task.start();
  }
  // getUpadtedData();
};

// router.get("/BTCUSDT", async (req, res) => {
//   const { data } = await axios.get(
//     "https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT"
//   );
//   console.log(data);
//   res.send(data);
//   //! save to db
// });

// async function getONEUSDT() {
//   const { data } = await axios.get(
//     "https://api.binance.com/api/v1/ticker/24hr?symbol=ONEUSDT"
//   );
// }
