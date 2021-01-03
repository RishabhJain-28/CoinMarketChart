const cron = require("node-cron");
const fs = require("fs");
const main = require("../data/main");
const Token = require("../models/token");

const axios = require("axios");

module.exports = (io) => {
  // return;
  (async function getUpadtedData() {
    const tokens = await Token.find();
    // const [_,...tokens] = await Token.find();

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
      data[poolIndex].maxSupply = element.totalSupply;
      data[poolIndex].circulationSupply = element.totalSupply;
    });
    data.forEach(async (ele) => {
      //   delete ele.found;
      //   base.push(ele.base);
      await ele.save();
    });
    io.emit("update", data);
  });
  const task = cron.schedule(
    `*/${process.env.CRON_INTERVAL} * * * *`,
    getUpadtedData,
    {
      scheduled: false,
    }
  );
  task.start();
};

// async function getONEUSDT() {
//   const { data } = await axios.get(
//     "https://api.binance.com/api/v1/ticker/24hr?symbol=ONEUSDT"
//   );
// }
