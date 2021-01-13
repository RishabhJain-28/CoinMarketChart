const moment = require("moment");

const a = Date.now();

console.log(a);

console.log(moment(a).add(5, "hours").format("MMMM Do YYYY, h:mm:ss a"));
