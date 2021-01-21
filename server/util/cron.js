const cron = require("node-cron");
const fs = require("fs");
const main = require("../data/main");
const Token = require("../models/token");
const Chart = require("../models/chart");
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

module.exports = (io) => {
  // addDataPoint({ _id: "5ff12bbe8405ff4e70a04b67", price: 2 });
  // return;
  async function getUpadtedData() {
    const tokens = await Token.find();
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
    console.log("data", data);
    // const base = [];
    // console.log(base);
    // console.log("qa");
    const { data: contractAddressData } = await axios.get(
      "https://explorer.harmony.one:8888/hrc20-token-list"
    );
    // const [/] = contractAddressData
    // console.log(contractAddressData[0]);
    // data.forEach((t) =>console.log(t.))
    const found = [];
    // console.log('re')
    // console.log("re");
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
      console.log("found", data[poolIndex].symbol);
      data[poolIndex].found = true;
      data[poolIndex].contractAddress = element.contractAddress;
      data[poolIndex].maxSupply =
        element.totalSupply / Math.pow(10, element.decimals);
      data[poolIndex].circulationSupply = element.totalSupply;
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
    console.log("onePriceInUSD in CRON", onePriceInUSD);

    const addDataPoint = async (ele) => {
      const ONE = ele.price;
      const onePriceInUSD = 1;
      const btcPriceInUSD = 1;
      const USD = onePriceInUSD / ONE;
      const BTC = (onePriceInUSD / ONE) * btcPriceInUSD;
      const currentDate = moment(new Date());
      let bucket = await Prices.findOne({
        date: currentDate.format("YYYY-MM-D"),
      });
      if (!bucket) {
        bucket = new Prices({
          date: currentDate.format("YYYY-MM-D"),
          token: ele._id,
          // intervals: {},
        });
      }
      // const hour = parseInt(currentDate.format("H"));
      const hour = currentDate.format("H");
      const minuteNum = parseInt(currentDate.format("m"));
      const q = parseInt(minuteNum / 5);
      const minute = q * 5;
      console.log("hour", hour);
      console.log("minute", minute);
      bucket.intervals[hour][minute] = { USD, ONE, BTC };
      // console.log(bucket.intervals);
      console.log(bucket.intervals[hour]);
      console.log(bucket.intervals[hour][minute]);
      await bucket.save();
    };
    data.forEach(addDataPoint);
    // await data.save();
    io.emit("update", data);
  }
  // getUpadtedData();
  // })();
  // const task = cron.schedule(
  //   `*/${process.env.CRON_INTERVAL} * * * *`,
  //   getUpadtedData,
  //   {
  //     scheduled: false,
  //   }
  // );
  // if (process.env.CRON) {
  //   task.start();
  // }

  let minutes = "";
  for (let i = 0; i < 55; i += 5) {
    minutes += `${i},`;
  }
  minutes += `55`;
  console.log(minutes);
  const task = cron.schedule(`${minutes} * * * *`, getUpadtedData, {
    scheduled: false,
  });
  // console.log(process.env.CRON);
  if (process.env.CRON === "true") {
    console.log("task STARTED");
    task.start();
  }
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
