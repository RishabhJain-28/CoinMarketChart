import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "../util/axios";
import { Paper, Switch, Grid, Container } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const init_options = {
  animation: {
    duration: 0,
  },

  scales: {
    xAxes: [
      {
        type: "time",
        offset: true,
        time: {
          unit: "day",
        },
        ticks: {
          major: {
            enabled: true,
          },
          font: function (context) {
            console.log("context", context);
            return context.tick && context.tick.major
              ? { style: "bold" }
              : undefined;
          },
          source: "data",
          autoSkip: true,
          autoSkipPadding: 75,
          maxRotation: 0,
          sampleSize: 100,
        },
        // Custom logic that chooses major ticks by first timestamp in time period
        // E.g. if March 1 & 2 are missing from dataset because they're weekends, we pick March 3 to be beginning of month
        // afterBuildTicks: function (scale) {
        //   const majorUnit = scale._majorUnit;
        //   const ticks = scale.ticks;
        //   const firstTick = ticks[0];

        //   let val = moment().DateTime.fromMillis(ticks[0].value);
        //   if (
        //     (majorUnit === "minute" && val.second === 0) ||
        //     (majorUnit === "hour" && val.minute === 0) ||
        //     (majorUnit === "day" && val.hour === 9) ||
        //     (majorUnit === "month" && val.day <= 3 && val.weekday === 1) ||
        //     (majorUnit === "year" && val.month === 1)
        //   ) {
        //     firstTick.major = true;
        //   } else {
        //     firstTick.major = false;
        //   }
        //   let lastMajor = val.get(majorUnit);

        //   for (let i = 1; i < ticks.length; i++) {
        //     const tick = ticks[i];
        //     val = moment().DateTime.fromMillis(tick.value);
        //     const currMajor = val.get(majorUnit);
        //     tick.major = currMajor !== lastMajor;
        //     lastMajor = currMajor;
        //   }
        //   scale.ticks = ticks;
        // },
      },
    ],
    yAxes: [
      {
        type: "linear",
        gridLines: {
          drawBorder: false,
        },
        scaleLabel: {
          display: true,
          labelString: "Closing price ($)",
        },
      },
    ],
  },
  tooltip: {
    custom: (tooltipModel) => {
      console.log("a");
      return tooltipModel;
    },
  },
  // plugins: {
  //   tooltip: {
  //     intersect: false,
  //     mode: "index",
  //     callbacks: {
  //       label: function (context) {
  //         let label = context.dataset.label || "";
  //         if (label) {
  //           label += ": ";
  //         }
  //         label += context.dataPoint.y.toFixed(2);
  //         return label;
  //       },
  //     },
  //   },
  // },
};
// const z = {
//   fill: false,
//   responsive: true,
//   scales: {
//     xAxes: [
//       {
//         type: "time",
//         display: true,
//         scaleLabel: {
//           display: true,
//           labelString: "Date",
//         },
//       },
//     ],
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//         },
//         display: true,
//         scaleLabel: {
//           display: true,
//           labelString: "Page Views",
//         },
//       },
//     ],
//   },
// };
export default function Chart({ chartData }) {
  // render() {
  // console.log(data);
  const [options, setOptions] = useState(init_options);
  const [unit, setUnit] = useState("hour");
  // useEffect(() => {

  // });
  function change(unit) {
    setOptions({
      animation: {
        duration: 0,
      },

      scales: {
        xAxes: [
          {
            type: "time",
            offset: true,
            time: {
              unit: unit,
            },
            ticks: {
              major: {
                enabled: true,
              },
              font: function (context) {
                console.log("context", context);
                return context.tick && context.tick.major
                  ? { style: "bold" }
                  : undefined;
              },
              source: "data",
              autoSkip: true,
              autoSkipPadding: 75,
              maxRotation: 0,
              sampleSize: 100,
            },
            // Custom logic that chooses major ticks by first timestamp in time period
            // E.g. if March 1 & 2 are missing from dataset because they're weekends, we pick March 3 to be beginning of month
            // afterBuildTicks: function (scale) {
            //   const majorUnit = scale._majorUnit;
            //   const ticks = scale.ticks;
            //   const firstTick = ticks[0];

            //   let val = moment().DateTime.fromMillis(ticks[0].value);
            //   if (
            //     (majorUnit === "minute" && val.second === 0) ||
            //     (majorUnit === "hour" && val.minute === 0) ||
            //     (majorUnit === "day" && val.hour === 9) ||
            //     (majorUnit === "month" && val.day <= 3 && val.weekday === 1) ||
            //     (majorUnit === "year" && val.month === 1)
            //   ) {
            //     firstTick.major = true;
            //   } else {
            //     firstTick.major = false;
            //   }
            //   let lastMajor = val.get(majorUnit);

            //   for (let i = 1; i < ticks.length; i++) {
            //     const tick = ticks[i];
            //     val = moment().DateTime.fromMillis(tick.value);
            //     const currMajor = val.get(majorUnit);
            //     tick.major = currMajor !== lastMajor;
            //     lastMajor = currMajor;
            //   }
            //   scale.ticks = ticks;
            // },
          },
        ],
        yAxes: [
          {
            type: "linear",
            gridLines: {
              drawBorder: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Closing price ($)",
            },
          },
        ],
      },
      tooltip: {
        custom: (tooltipModel) => {
          console.log("a");
          return tooltipModel;
        },
      },
      // plugins: {
      //   tooltip: {
      //     intersect: false,
      //     mode: "index",
      //     callbacks: {
      //       label: function (context) {
      //         let label = context.dataset.label || "";
      //         if (label) {
      //           label += ": ";
      //         }
      //         label += context.dataPoint.y.toFixed(2);
      //         return label;
      //       },
      //     },
      //   },
      // },
    });
  }

  const data = {
    // labels: ["a", ",b"],
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        // data: JSON.parse(d),
        data: chartData,
      },
    ],
  };
  useEffect(() => {
    change(unit);
  }, [unit]);
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={unit}
          onChange={(v) => {
            setunit(v);
          }}
        >
          <MenuItem value={"15 m"}>15 m</MenuItem>
          <MenuItem value={"hour"}>hour</MenuItem>
          <MenuItem value={"day"}>day</MenuItem>
        </Select>
      </FormControl>
      <Container>
        <div>
          <h2>Line Example</h2>
          <Line data={data} options={options} />
        </div>
      </Container>
    </>
  );
}
