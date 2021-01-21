const moment = require("moment");
// const Prices = require("./models/Prices");
// const dates = ["30-Nov-2020", "1-Dec-2020"];
const values = [
  // 0.005,
  0.005,
  0.00458933,
  0.00451646,
  0.00430902,
  0.00393835,
  0.00393835,
  0.00393835,
  0.00393835,
  0.00388806,
  0.00388806,
  0.00384407,
  0.00384407,
  0.00365519,
  0.00343872,
  0.00297149,
  0.00297149,
  0.00297149,
  0.00297149,
  0.00285716,
  0.00285716,
  0.00287811,
  0.00287811,
  0.00287811,
  0.00287286,
  0.00179618,
  0.00179618,
  0.00179618,
  0.00183312,
  0.00180044,
  0.00180044,
  0.00180044,
  0.00180044,
  0.00179507,
];
const dates = [
  "2020-12-08",
  "2020-12-09",
  "2020-12-10",
  "2020-12-11",
  "2020-12-12",
  "2020-12-13",
  "2020-12-14",
  "2020-12-15",
  "2020-12-16",
  "2020-12-17",
  "2020-12-18",
  "2020-12-19",
  "2020-12-20",
  "2020-12-21",
  "2020-12-22",
  "2020-12-23",
  "2020-12-24",
  "2020-12-25",
  "2020-12-26",
  "2020-12-27",
  "2020-12-28",
  "2020-12-29",
  "2020-12-30",
  "2020-12-31",
  "2021-01-01",
  "2021-01-02",
  "2021-01-03",
  "2021-01-04",
  "2021-01-05",
  "2021-01-06",
  "2021-01-07",
  "2021-01-08",
  "2021-01-09",
];

const USD_PRICES = [
  // 0.984726,
  0.975966,
  1.063299,
  1.107245498,
  1.145501761,
  1.320002031,
  1.362524915,
  1.362524915,
  1.362524915,
  1.380148454,
  1.376992639,
  1.339153553,
  1.339153553,
  1.388655583,
  1.446206728,
  1.770838872,
  1.770838872,
  1.770838872,
  1.770838872,
  1.632673704,
  1.632673704,
  1.656955433,
  1.617245345,
  1.617245345,
  1.439617663,
  2.38036277,
  2.38036277,
  2.38036277,
  2.641152789,
  2.804031237,
  2.804031237,
  2.804031237,
  2.804031237,
  4.23347836,
];
// const d = moment(new Date(dates[0])).format("MMMM Do YYYY, h:mm:ss a");
// console.log(d);

const BTC_PRICES = {
  "2020-08-01": 11354.1567,
  "2020-08-02": 11301.28,
  "2020-08-03": 11164.445,
  "2020-08-04": 11275.995,
  "2020-08-05": 11219.5,
  "2020-08-06": 11796.8174,
  "2020-08-07": 11827.265,
  "2020-08-08": 11568.5,
  "2020-08-09": 11666.45,
  "2020-08-10": 12010.28,
  "2020-08-11": 11832.5,
  "2020-08-12": 11342.01,
  "2020-08-13": 11565.095,
  "2020-08-14": 11759.5,
  "2020-08-15": 11895.627,
  "2020-08-16": 11908.33,
  "2020-08-17": 11856.5,
  "2020-08-18": 12327.5,
  "2020-08-19": 11918.5,
  "2020-08-20": 11833.8974,
  "2020-08-21": 11583.1389,
  "2020-08-22": 11674.6244,
  "2020-08-23": 11611.5,
  "2020-08-24": 11744.0127,
  "2020-08-25": 11378.726,
  "2020-08-26": 11458.8226,
  "2020-08-27": 11302.121,
  "2020-08-28": 11482.2257,
  "2020-08-29": 11515.0444,
  "2020-08-30": 11657.0039,
  "2020-08-31": 11678.3733,
  "2020-09-01": 11964.2087,
  "2020-09-02": 11795.7,
  "2020-09-03": 11302.8875,
  "2020-09-04": 10292.5983,
  "2020-09-05": 10439.5,
  "2020-09-06": 10110.44,
  "2020-09-07": 10164.13,
  "2020-09-08": 10316.5833,
  "2020-09-09": 10032.5,
  "2020-09-10": 10341.016,
  "2020-09-11": 10380.5396,
  "2020-09-12": 10436.3654,
  "2020-09-13": 10313.0686,
  "2020-09-14": 10680.2976,
  "2020-09-15": 10829.5053,
  "2020-09-16": 11033.3835,
  "2020-09-17": 10937.1113,
  "2020-09-18": 10933.9312,
  "2020-09-19": 11048.8793,
  "2020-09-20": 10852.9101,
  "2020-09-21": 10526.2029,
  "2020-09-22": 10531.1646,
  "2020-09-23": 10260.033,
  "2020-09-24": 10672.9568,
  "2020-09-25": 10729.0696,
  "2020-09-26": 10741.4765,
  "2020-09-27": 10752.3455,
  "2020-09-28": 10863.0657,
  "2020-09-29": 10764.2844,
  "2020-09-30": 10741.5796,
  "2020-10-01": 10626.601,
  "2020-10-02": 10567.3302,
  "2020-10-03": 10555.0287,
  "2020-10-04": 10660.6112,
  "2020-10-05": 10756.4046,
  "2020-10-06": 10589.6264,
  "2020-10-07": 10645.7548,
  "2020-10-08": 10897.5954,
  "2020-10-09": 11063.5317,
  "2020-10-10": 11304.4917,
  "2020-10-11": 11377.1683,
  "2020-10-12": 11545.1583,
  "2020-10-13": 11432.475,
  "2020-10-14": 11430.8717,
  "2020-10-15": 11510.5367,
  "2020-10-16": 11325.5217,
  "2020-10-17": 11369.9133,
  "2020-10-18": 11516.9667,
  "2020-10-19": 11758.5467,
  "2020-10-20": 11922.975,
  "2020-10-21": 12811.4867,
  "2020-10-22": 12987.9017,
  "2020-10-23": 12940.1067,
  "2020-10-24": 13127.055,
  "2020-10-25": 13039.0133,
  "2020-10-26": 13067.8283,
  "2020-10-27": 13638.76,
  "2020-10-28": 13276.4533,
  "2020-10-29": 13459.7983,
  "2020-10-30": 13566.925,
  "2020-10-31": 13797.1033,
  "2020-11-01": 13762.97,
  "2020-11-02": 13567.2233,
  "2020-11-03": 14030.79,
  "2020-11-04": 14158.81,
  "2020-11-05": 15593.555,
  "2020-11-06": 15589.0033,
  "2020-11-07": 14843.945,
  "2020-11-08": 15489.47,
  "2020-11-09": 15334.87,
  "2020-11-10": 15313.4433,
  "2020-11-11": 15706.54,
  "2020-11-12": 16301.0267,
  "2020-11-13": 16330.3433,
  "2020-11-14": 16075.7133,
  "2020-11-15": 15968.245,
  "2020-11-16": 16720.605,
  "2020-11-17": 17676.335,
  "2020-11-18": 17785.2667,
  "2020-11-19": 17815.0783,
  "2020-11-20": 18675.4333,
  "2020-11-21": 18697.5133,
  "2020-11-22": 18423.5133,
  "2020-11-23": 18381.7167,
  "2020-11-24": 19161.2683,
  "2020-11-25": 18723.5467,
  "2020-11-26": 17182.485,
  "2020-11-27": 17156.3033,
  "2020-11-28": 17737.9667,
  "2020-11-29": 18196.5467,
  "2020-11-30": 19708.0967,
  "2020-12-01": 18795.1967,
  "2020-12-02": 19226.22,
  "2020-12-03": 19450.2667,
  "2020-12-04": 18657.42,
  "2020-12-05": 19157.925,
  "2020-12-06": 19386.7117,
  "2020-12-07": 19185.3967,
  "2020-12-08": 18322.5533,
  "2020-12-09": 18553.92,
  "2020-12-10": 18255.9233,
  "2020-12-11": 18039.7617,
  "2020-12-12": 18811.0617,
  "2020-12-13": 19168.7533,
  "2020-12-14": 19274.8733,
  "2020-12-15": 19444.5483,
  "2020-12-16": 21349.8467,
  "2020-12-17": 22812.2817,
  "2020-12-18": 23133.2867,
  "2020-12-19": 23835.305,
  "2020-12-20": 23458.9967,
  "2020-12-21": 22718.225,
  "2020-12-22": 23817.3067,
  "2020-12-23": 23229.0133,
  "2020-12-24": 23729.6483,
  "2020-12-25": 24707.8017,
  "2020-12-26": 26445.95,
  "2020-12-27": 26248.2767,
  "2020-12-28": 27041.8667,
  "2020-12-29": 27353.9783,
  "2020-12-30": 28886.04,
  "2020-12-31": 28956.265,
  "2021-01-01": 29391.775,
  "2021-01-02": 32198.48,
  "2021-01-03": 33033.62,
  "2021-01-04": 32017.565,
  "2021-01-05": 34035.0067,
  "2021-01-06": 36826.9783,
  "2021-01-07": 39475.6067,
  "2021-01-08": 40616.7217,
  "2021-01-09": 40227.8683,
  "2021-01-10": 38191.55,
};

async function a() {
  console.log("start");
  console.log("dates.length", dates.length);
  console.log("values.length", values.length);
  console.log("USD_PRICES.length", USD_PRICES.length);

  const l = dates.length;
  // console.log(l);

  for (var i = 0; i < l; i++) {
    const date = dates[i];
    // dates.forEach(async (date, i) => {
    // console.log(i);
    //   const date = dates[1];
    //   i = 1;

    // const d = date;
    // const s = d.split("-");
    // console.log(s);
    // const year = parseInt(s[0]);
    // const month = parseInt(s[1]) - 1;
    // const day = parseInt(s[2]);
    // // let z = new Date(year, month, day, 0, 0, 0).toUTCString();
    // // let z = new Date(year, month, day, 0, 0, 0).toUTCString();
    // let z = new Date(year, month, day, 1, 0, 0);
    // // z = z.setUTCHours(0);
    // // z = z.setUTC(0);
    // // z = z.setUTCSeconds(0);
    // // let x = z.getUTCMilliseconds(0);
    // console.log(moment(z).format("MMMM Do YYYY, h:mm:ss a"));
    // console.log(z.toUTCString());
    // console.log(z.getUTCHours());
    // // console.log(z.toISOString());
    // console.log(z);
    // // console.log(moment(z).format("MMMM Do YYYY, h:mm:ss a"));
    // // console.log(mongo);
    // // console.log(new Date(moment(z).format()));
    // // console.log(moment(z).utc().format());
    // // console.log(new Date(z));

    // continue;
    let start = moment(new Date(date));
    let end;
    if (i === l - 1) end = moment(new Date(date)).add(1, "day");
    else end = moment(new Date(dates[i + 1]));
    end = end.subtract(1, "minute");
    // console.log(i);

    // const now  = moment(start)
    // console.log(start.format("MMMM Do YYYY, h:mm:ss a"));
    // console.log("index", i);
    // console.log("values", values[i]);
    // const price = 1;
    // const ONE = price;
    // const USD = 1;
    const price = values[i];
    const ONE = price;
    const USD = USD_PRICES[i];
    // const USD = ONE_PRICES_USD[i] / price;
    const BTC = USD / BTC_PRICES[start.format("YYYY-MM-DD")];
    //   console.log(BTC);
    //   console.log(start.format("YYYY-MM-DD"));
    //   console.log(BTC_PRICES[start.format("YYYY-MM-DD")]);
    //   return;
    const tokenID = "5ff12db11725fe681c430a56";
    const priceOBJ = { USD, BTC, ONE };
    const date_value = start.format("MMMM Do YYYY, h:mm:ss a");
    console.log(date_value);
    // console.log("start: ", date_value);
    // console.log("END : ", end.format("YYYY-MM-DD HH:mm"));
    // const printcurrentDate = moment(date_value);
    const currentDate = new Date(date);
    // const currentDate = new Date(date)
    // console.log("CurrentDate", currentDate);
    // console.log("CurrentDate UTCSTING", currentDate.toUTCString());

    // continue;
    // console.log(start.format("MMMM Do YYYY, h:mm:ss a"));
    // console.log("date", date);
    // console.log("original new Date(date)", new Date(date));
    // console.log("original date value", start.format("YYYY-MM-DD HH:mm"));
    // console.log(printcurrentDate.format("MMMM Do YYYY, h:mm:ss a"));
    // console.log("currentDate", currentDate.format());
    // console.log("currentDate new Date", new Date(currentDate.format()));
    // console.log("currentDate", currentDate.format("YYYY-MM-D"));
    let bucket = await Prices.findOne({
      // date: currentDate.format("YYYY-MM-D"),
      token: tokenID,
      date: currentDate,
    });

    // console.log("currentDate", currentDate.format());
    if (!bucket) {
      bucket = new Prices({
        // date: currentDate.format("YYYY-MM-D"),
        date: currentDate,
        token: tokenID,
        // intervals: {},
      });
    }

    // console.log("bucket currentDate", bucket.date);
    // continue;
    while (start.isBefore(end)) {
      // console.log("d::", start.format("YYYY-MM-DD HH:mm"));

      const dv = start.format("YYYY-MM-DD HH:mm");
      // console.log(dv);
      const cd = moment(dv);
      // const hour = parseInt(currentDate.format("H"));
      const hour = cd.format("H");
      const minuteNum = parseInt(cd.format("m"));
      const q = parseInt(minuteNum / 5);
      const minute = q * 5;
      // console.log("hour", hour);
      // console.log("minute", minute);
      bucket.intervals[hour][minute] = { ...priceOBJ };
      // console.log(bucket.intervals);
      // console.log(bucket.intervals[hour]);
      // console.log(bucket.intervals[hour][minute]);
      // await newPrice.save();
      start = start.add(5, "minutes");
      // console.log("e::", start.isBefore(end));

      // console.log(start.format("MMMM Do YYYY, h:mm:ss a"));
    }
    await bucket.save();
    // console.log(bucket.date);
    // });
  }
  console.log("done");
}
// a();
//   // const d  = moment(date).format();
// });
