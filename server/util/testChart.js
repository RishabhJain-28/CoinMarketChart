// * Models
const Chart = require("../models/chart");
const moment = require("moment");

async function a() {
  console.log("a");
  // const now = moment().format();
  const d = new Date();
  const date = moment(d).subtract(3, "months").format();
  //   const i = 1;
  const ONE_TO_USD = 0.00628;
  const BTC_TO_USD = 34833.97;
  for (i = 0; i < 288 * 30 * 3; i++) {
    const time = moment(date)
      .add(i * 5, "minutes")
      .format();

    const price = Math.random() * 1000 + 1000;
    const ONE = price * ONE_TO_USD;
    const BTC = price * BTC_TO_USD;
    const USD = price;
    const newPrice = new Chart({
      token: "5ff12bbe8405ff4e70a04b67",
      time,
      USD,
      BTC,
      ONE,
    });
    // console.log(moment(newPrice.time).format("MMMM Do YYYY, h:mm:ss a"));

    await newPrice.save();
    // console.log(newPrice);
    // console.log("b");
  }
  console.log("done");
}
console.log("c");
// a();
