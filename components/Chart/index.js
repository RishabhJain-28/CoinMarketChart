import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
      setLoading(true);
      if (!tokenId) return;
      const { step, subTime, subUnit } = config[timeUnit];
      const selected = moment(date).format();
      const start = moment(date).subtract(subTime, subUnit).format();
      const { data } = await axios.get(
        `/chart/data/${tokenId}/${start}/${selected}/${step}`
      );
      const temp = data.map((e) => ({ x: e.time, y: e[priceUnit], ...e }));
      //! error HANDLING
      //! loadiing
      //! responsive
      //! UI - colors and layout
      setLoading(false);
      setChartValues(temp);
      // setLoading(false);
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
  console.log("chartValues", chartValues);
  const data = getChartData(priceUnit, timeUnit, chartValues);
  if (loading) return <h3>LOADING...</h3>;
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
          {Object.keys(config).map((key) => (
            <MenuItem key={key} value={key}>
              {config[key].displayValue}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={classes.width}>
        <h2>Chart</h2>
        <Line data={data} options={options} />
      </div>
    </>
  );
}
