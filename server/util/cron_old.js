const cron = require("node-cron");
const fs = require("fs");
const main = require("../data/main");
const Token = require("../models/token");
const Chart = require("../models/chart");
const Prices = require("../models/prices");

const axios = require("axios");
const moment = require("moment");

module.exports = (io) => {
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
    console.log("data", data);
    // const base = [];
    // console.log(base);
    // console.log("qa");
    let contractAddressData = [];
    try {
      const { data } = await axios.get(
        "https://explorer.hmny.io:8888/hrc20-token-list"
        // "https://explorer.harmony.one:8888/hrc20-token-list"
      );
      contractAddressData = data;
    } catch (err) {
      console.log(err);
    } // const [/] = contractAddressData
    // console.log(contractAddressData[0]);
    // data.forEach((t) =>console.log(t.))
    const found = [];

    // console.log('re')
    // console.log("re");
    // contractAddressData.forEach((element) => {
    //   const poolIndex = data.findIndex(
    //     (d) => !d.found && d.symbol === element.symbol
    //   );
    //   //   console.log("checking\n------------------------");
    //   const isFound = found.find((f) => f === element.symbol);
    //   //   console.log("checking done \n------------------------");
    //   if (poolIndex === -1 || isFound) return;
    //   found.push(element.symbol);
    //   //   console.log(element.name);
    //   console.log("found", data[poolIndex].symbol);
    //   data[poolIndex].found = true;
    //   data[poolIndex].contractAddress = element.contractAddress;
    //   data[poolIndex].maxSupply =
    //     element.totalSupply / Math.pow(10, element.decimals);
    //   data[poolIndex].circulationSupply = element.totalSupply;
    // });
    //! change contract address logic->add to token manually
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
    // console.log("onePriceInUSD in CRON", onePriceInUSD);

    //volume
    function getVolume() {
      const currentTimestamp = new Date().getTime();
      // console.log(currentTimestamp);
      const endTimestamp = currentTimestamp - 1000 * 60 * 60 * 24;
      // console.log(moment(endTimestamp).format("MMMM Do YYYY, h:mm:ss a"));
    }

    //vol end

    const d = moment(new Date()).format("YYYY-MM-DD");
    const currentDate = new Date(d);

    let start = moment(new Date(d));
    const date_value = start.format("MMMM Do YYYY, h:mm:ss a");
    // console.log("date_value", date_value);
    // console.log("currentDate", currentDate);

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
        bucket = new Prices({
          date: currentDate,
          token: ele._id,
          // intervals: {},
        });
      }
      // const hour = parseInt(currentDate.format("H"));
      const hour = cd.format("H");
      const minuteNum = parseInt(cd.format("m"));
      const q = parseInt(minuteNum / 5);
      const minute = q * 5;
      console.log("hour", hour);
      console.log("minute", minute);
      bucket.intervals[hour][minute] = { USD, ONE, BTC };
      // console.log(bucket.intervals);
      // console.log(bucket.intervals[hour]);
      console.log(bucket.intervals[hour][minute]);
      await bucket.save();
      ele.bucket = bucket;
    };
    // data.forEach(addDataPoint);
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
  // })();
  let minutes = "";
  for (let i = 0; i < 58; i += 1) {
    minutes += `${i},`;
  }
  minutes += `58`;
  // let minutes = "";
  // for (let i = 0; i < 55; i += 5) {
  //   minutes += `${i},`;
  // }
  // minutes += `55`;
  // console.log(minutes);
  const task = cron.schedule(`${minutes} * * * *`, getUpadtedData, {
    scheduled: false,
  });
  // console.log(process.env.CRON);
  if (process.env.CRON === "true") {
    console.log("task STARTED");
    task.start();
  }
};
