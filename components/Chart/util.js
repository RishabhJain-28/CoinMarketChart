import moment from "moment";
import config from "./config";
import { useTheme } from "@material-ui/core/styles";
import toFixed from "../../util/toFixed";
export const getChartOptions = (priceUnit, timeUnit) => {
  return {
    animation: {
      duration: 0,
    },
    // responsive: true,
    // maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          type: "time",
          // offset: true,
          time: {
            // unit: unit,
            unit: config[timeUnit].scale,
          },
          ticks: {
            // major: {
            //   enabled: true,
            // },
            // font: function (context) {
            //   console.log("context", context);
            //   return context.tick && context.tick.major
            //     ? { style: "bold" }
            //     : undefined;
            // },
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
          // ticks: {
          //   // beginAtZero: true,
          //   userCallback: function (label, index, labels) {
          //     // when the floored value is the same as the value we have a whole number
          //     // if (Math.floor(label) === label) {
          //     //   return label;
          //     // }

          //     return Math.round((label + Number.EPSILON) * 100) / 100;
          //   },
          // },
          gridLines: {
            drawBorder: false,
          },
          scaleLabel: {
            display: true,
            labelString: priceUnit,
          },
        },
      ],
    },
    //   tooltips: {
    //     mode: 'index',
    //     intersect: false,
    //   },

    tooltips: {
      enabled: true,
      mode: "index",
      intersect: false,
      // mode: "single",
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
      caretSize: 15,
      callbacks: {
        title: function ([tooltipItems], data) {
          return moment(tooltipItems.xLabel).format("MMMM Do YYYY, h:mm a");
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  };
};

export const getChartData = (priceUnit, timeUnit, chartData) => {
  const theme = useTheme();
  // console.log(theme.palette.chartLine);
  return {
    datasets: [
      {
        label: priceUnit,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        // borderColor: "rgba(75,192,192,1)",
        // borderColor: "#69FABD",
        // borderColor: "#1B295E",
        borderColor: theme.palette.chartLine.main,
        // borderColor: "#4ab588",
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
        data: chartData,
      },
    ],
  };
};
