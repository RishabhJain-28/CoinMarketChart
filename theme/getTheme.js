import { createMuiTheme } from "@material-ui/core/styles";
import { purple, lightBlue } from "@material-ui/core/colors";

export default function (darkMode) {
  // console.log("getTheme", darkMode);
  // console.log("getTheme typeof", typeof darkMode);

  return createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      // primary: lightBlue,
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#00aee9",
        dark: "#e5eb34",
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      chartLine: {
        main: "#4ab588",
      },
      background: {
        // default: "#758796",
        // paper: "#758796",
      },
    },
  });
}
