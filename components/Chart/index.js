import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import axios from "../../util/axios";
import useStyles from "./style";
import { getChartOptions, getChartData } from "./util";
import config from "./config";

export default function Chart({ tokenId, priceUnit }) {
  const [timeUnit, setTimeUnit] = useState("day");
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [chartValues, setChartValues] = useState([]);
  useEffect(() => {
    (async function a() {
      try {
        setLoading(true);
        if (!tokenId) return;
        // console.log("REQUEST");
        const { step, subTime, subUnit } = config[timeUnit];
        const selected = moment(date).format();
        const start = moment(date).subtract(subTime, subUnit).format();
        const { data } = await axios.get(
          `/prices/data/${tokenId}/${start}/${selected}/${step}`
        );
        console.log(data);
        data.forEach((d) => {
          // console.log(moment(d.time).format("MMMM Do YYYY, h:mm:ss a"));
          // console.log(new Date(d.time));
        });
        const temp = data.map((e) => ({ x: e.time, y: e[priceUnit], ...e }));
        //! error HANDLING
        //! loadiing
        //! responsive
        //! UI - colors and layout
        setLoading(false);
        // setChartValues(temp);
        setChartValues(temp);
        // setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [date, timeUnit]);

  useEffect(() => {
    if (!chartValues) return;
    const temp = chartValues.map((e) => {
      const yValue = e[priceUnit];
      return { ...e, y: yValue };
    });
    setChartValues(temp);
  }, [priceUnit]);

  // { x: newDate, y: 1 },
  const classes = useStyles();
  const options = getChartOptions(priceUnit, timeUnit);
  // const data = getChartData(priceUnit, timeUnit, tempValues);
  // console.log("chartValues", chartValues);
  const data = getChartData(priceUnit, timeUnit, chartValues);
  // console.log(chartValues);
  // return <></>;
  if (loading) return <h3>LOADING...</h3>;
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="flex-end"
        justify="space-between"
      >
        <Grid xs={12}>
          <FormControl className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-label">Interval</InputLabel> */}
            {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeUnit}
         
        > */}
            <ButtonGroup
              // size="small"
              // color="secondary"
              aria-label="outlined secondary button group"
              className={classes.intervalButtonGroup}
            >
              {/* <Button>Two</Button>
          <Button>Three</Button> */}
              {Object.keys(config).map((key) => (
                <Button
                  className={classes.intervalButton}
                  key={key}
                  variant={timeUnit === key ? "contained" : ""}
                  onClick={() => setTimeUnit(key)}
                >
                  {config[key].displayValue}
                </Button>
              ))}
            </ButtonGroup>
            {/* </Select> */}
          </FormControl>
        </Grid>
        <Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={{ widht: "50%" }}
              size="small"
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              // label="Select Start Date"
              value={date}
              onChange={(e) => {
                // console.log(e);
                setDate(e);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <div className={classes.width}>
        <h2 className={classes.title}>Chart</h2>
        <Line data={data} options={options} />
      </div>
    </>
  );
}
