import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  intervalButton: { textTransform: "none" },
  width: {
    // height: 100,
    // width: 1000,
  },
  title: {
    paddingLeft: "10px",
  },
  // keyboardDatePicker: {
  //   color: `${theme.palette.secondary.main} !important`,
  //   // color: theme.palette.secondary.main,
  // },
}));
