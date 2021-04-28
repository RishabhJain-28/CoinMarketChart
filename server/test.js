const moment = require("moment");
// const d = moment(new Date()).hour(6).format("YYYY-MM-DD");
const d = moment(new Date()).format("YYYY-MM-DD");
const e = moment(new Date()).format("H");

// const t = moment(new Date()).format("YYYY-MM-DD");

const currentDate = new Date(d);

currentDate.setHours(12);
console.log(Math.floor(Number(e) / 6));
console.log(moment(currentDate).format("MMMM Do YYYY, h:mm:ss a"));
console.log(d);
console.log(currentDate);
