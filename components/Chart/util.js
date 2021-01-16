import moment from "moment";
import config from "./config";

export const getChartOptions = (priceUnit, timeUnit) => {
  return {
    animation: {
      duration: 0,
    },
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
  };
};

export const getChartData = (priceUnit, timeUnit, chartData) => {
  return {
    datasets: [
      {
        label: priceUnit,
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
        data: chartData,
      },
    ],
  };
};
