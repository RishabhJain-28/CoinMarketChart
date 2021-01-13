const shift = (duration, unit) => {
//     console.log("unit-shiftt", unit);
//     console.log("duration-shiftt", duration);
//     // console.log("original-shiftt", originalData);
//     const selected = moment(date);
//     const start = moment(date).subtract(duration, unit);
//     // const a = start.isSameOrBefore(now);
//     // .format("MMMM Do YYYY, h:mm:ss a");
//     // const start = moment(date)
//     //   .subtract(1, "days")
//     //   .format("MMMM Do YYYY, h:mm:ss a");
//     // console.log("a", a);
//     // console.log()
//     const index = originalData.findIndex((e) => start.isSameOrBefore(e.x)); //! find and step
//     const temp = [];
//     const step = 12;
//     // const newChart  = originalData.slice(i,originalData.length).forEach(e=>{

//     // })

//     for (
//       let i = index;
//       selected.isSameOrAfter(originalData[i].x) && i < originalData.length;
//       i += step
//     ) {
//       temp.push(originalData[i]);
//     }
//     // const newChart = originalData.filter(
//     //   (e) => start.isSameOrBefore(e.x) &&  && moment(e.x).week
//     // );//! find and step

//     console.log("start", start.format("MMMM Do YYYY, h:mm:ss a"));
//     temp.forEach((e) => {
//       console.log(moment(e.x).format("MMMM Do YYYY, h:mm:ss a"));
//     });
//     console.log("selected", selected.format("MMMM Do YYYY, h:mm:ss a"));
//     // console.log("newChart", newChart);
//     setChart(temp);
//   };