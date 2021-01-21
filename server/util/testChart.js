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

// const addDataPoint = async (ele) => {
//   const ONE = ele.price;
//   const onePriceInUSD = 1;
//   const btcPriceInUSD = 1;
//   const USD = onePriceInUSD / ONE;
//   const BTC = (onePriceInUSD / ONE) * btcPriceInUSD;
//   const currentDate = moment("2021-01-16" + " " + "23:40");
//   let bucket = await Prices.findOne({
//     date: currentDate.format("YYYY-MM-D"),
//   });
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
