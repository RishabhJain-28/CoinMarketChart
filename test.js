// const moment = require("moment");

// // const a = Date.now();

// // console.log(a);

// // console.log(moment(a).add(5, "hours").format("MMMM Do YYYY, h:mm:ss a"));

// const MINUTE_OBJ = {
//   usd: 1,
//   btc: 2,
//   one: 3,
// };
// const minutes = {};

// for (let i = 0; i < 60; i += 5) {
//   //   if (i <= 9) minutes[`0${i}`] = { ...MINUTE_OBJ };
//   //   else minutes[i] = { ...MINUTE_OBJ };
//   minutes[i] = { ...MINUTE_OBJ };
// }
// const hour = {};
// for (let i = 0; i < 24; i += 1) {
//   //   if (i <= 9) hour[`0${i}`] = { ...minutes };
//   //   else hour[i] = { ...minutes };
//   hour[i] = { ...minutes };
//   // }
// }

// const modal = {
//   date: 123, //2020-10-10+time
//   //   00:00
//   //   06:00
//   //   12:00
//   //   18:00

//   intervals: {
//     ...hour,
//   },
// };

// // const today =moment(new Date())// at 0000
// // let day = await Bucket.findOne({date: today})
// // if(!day){

// //      day = {
// //  date: today
// //     }

// // }
// // const hour = currentHour
// // const minute = currentMinute
// // // if(day.intervals[hour])
// // day.intervals[hour][minute] = {...prices} // if not exist CREATE

// // await day.save()
// // return

// // :tokenId/:start/:end/:every
// // let day = await Bucket.findOne({ tokenID, date: {
// //     $gte: start,//at 0000
// //     $lte: end,//at 0000
// // }

// // })

// // console.log(modal);
// const data = [];
// Object.keys(modal.intervals).forEach((h) => {
//   Object.keys(modal.intervals[h]).forEach((m) => {
//     const date = "2021-01-17";
//     let minute;
//     let hour;
//     if (m <= 9) {
//       minute = `0${m}`;
//     } else minute = `${m}`;
//     if (h <= 9) {
//       hour = `0${h}`;
//     } else {
//       hour = `${h}`;
//     }
//     const time = `${hour}:${minute}`;
//     // console.log(time);
//     const a = {
//       usd: 1,
//       btc: 1,
//       one: 1,
//     };
//     data.push({ time: moment(date + " " + time).format(), price: a });
//     // console.log(moment(date + " " + time).format("MMMM Do YYYY, h:mm:ss a"));
//   });
// });
// console.log("s");
// data.forEach((e) => console.log(e.time));

const moment = require("moment");

console.log(new Date(1611936000000));
