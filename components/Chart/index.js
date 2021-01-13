import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Container } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import axios from "../../util/axios";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
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
          labelString: "price ($)",
        },
      },
    ],
  },
  //   tooltips: {
  //     enabled: true,
  //     label: function (tooltipItems, data) {
  //       console.log("sdabskdj");
  //       return "Usage: " + tooltipItems.yLabel * 1000 + " watt";
  //     },
  //   },
};

const config = {
  hour: {
    step: 5,
    scale: "minute",
    subTime: 1,
    subUnit: "hours",
    pointSize: 4,
  },
  day: {
    step: 10,
    scale: "hour",
    subTime: 1,
    subUnit: "days",
    pointSize: 2.5,
  },
  "4days": {
    step: 30,
    scale: "hour",
    subTime: 4,
    subUnit: "days",
  },
  week: {
    step: 60,
    scale: "day",
    subTime: 1,
    subUnit: "weeks",
  },
  month: {
    step: 60 * 3,
    scale: "day",
    subTime: 1,
    subUnit: "months",
  },
  "3months": {
    step: 60 * 3 * 3,
    scale: "week",
    subTime: 3,
    subUnit: "months",
  },
  year: {
    step: 60 * 24 * 2,
    scale: "month",
    subTime: 1,
    subUnit: "year",
  },
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
export default function Chart() {
  // render() {
  // console.log(data);
  const [options, setOptions] = useState(init_options);
  const [timeUnit, setTimeUnit] = useState("day");
  const [date, setDate] = useState(new Date());
  const [chart, setChart] = useState();
  //   const [originalData] = useState([...chartData]);
  useEffect(() => {
    (async function a() {
      const { step, scale, subTime, subUnit, pointSize } = config[timeUnit];
      changeTimeScaleUnit(scale, pointSize);
      const selected = moment(date).format();
      const start = moment(date).subtract(subTime, subUnit).format();
      const { data } = await axios.get(
        `/chart/data/${start}/${selected}/${step}`
      );
      const temp = data.map((e) => ({ x: e.time, y: e.USD }));
      console.log(temp);
      setChart(temp);
    })();
  }, [date, timeUnit]);
  // const [date, setDate] = useState(moment().format());
  // useEffect(() => {
  const classes = useStyles();
  // console.log(moment(date).format("YYYY-MM-DD"));
  // });
  function changeTimeScaleUnit(unit, pointSize) {
    // consoe;
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
              labelString: "Price ($)",
            },
          },
        ],
      },
      tooltips: {
        enabled: true,
        mode: "single",
        backgroundColor: "rgba(0,0,0,0.9)",
        titleFontSize: 14,
        titleFontStyle: "bold",
        titleFontColor: "#FFF",
        bodyFontSize: 12,
        bodyFontStyle: "normal",
        bodyFontColor: "#FFF",
        footerFontSize: 12,
        footerFontStyle: "normal",
        footerFontColor: "#FFF",
        cornerRadius: 5,
        callbacks: {
          title: function ([tooltipItems], data) {
            return moment(tooltipItems.xLabel).format("MMMM Do YYYY, h:mm a");
          },
        },
      },
    });
  }

  const data = {
    datasets: [
      {
        label: "USD",
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
        pointRadius: config[timeUnit].pointSize
          ? config[timeUnit].pointSize
          : 1,
        pointHitRadius: 10,
        data: chart,
      },
    ],
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Select Start Date"
          value={date}
          onChange={(e) => {
            console.log(e);
            setDate(e);
          }}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Interval</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeUnit}
          onChange={(v) => {
            console.log(v.target.value);
            setTimeUnit(v.target.value);
          }}
        >
          {/* <MenuItem value={"15 m"}>15 m</MenuItem> */}
          <MenuItem value={"hour"}>hour</MenuItem>
          <MenuItem value={"day"}>day</MenuItem>
          <MenuItem value={"4days"}>4 days</MenuItem>
          <MenuItem value={"week"}>week</MenuItem>
          <MenuItem value={"month"}>month</MenuItem>
          <MenuItem value={"3months"}>3 months</MenuItem>
          {/* <MenuItem value={"year"}>year</MenuItem> */}
        </Select>
      </FormControl>
      <Container>
        <div>
          <h2>Chart</h2>
          {/* <Line ref="chart" data={data} options={options} /> */}
          <Line data={data} options={options} />
        </div>
      </Container>
    </>
  );
}
