import { createMuiTheme } from "@material-ui/core/styles";

const commonTheme = {
  typography: {
    fontFamily: "BioRhyme, Arial",
  },
};

const lightTheme = createMuiTheme({
  ...commonTheme,
  palette: {
    type: "light",
    primary: {
      main: "#00D6CC",
    },
    secondary: {
      main: "#FF3E18",
    },
    chartLine: {
      main: "#FF3E18",
    },
    chartPoint: {
      main: "#00D6CC",
    },
    tonalOffset: 0.5, //!
  },
});

const darkTheme = createMuiTheme({
  ...commonTheme,
  palette: {
    type: "dark",

    primary: {
      // main: "#1E2038",
      main: "#343334",
    },

    secondary: {
      main: "#00D6CC",
    },
    chartLine: {
      main: "#FF3E18",
    },
    // background: {
    // default: "#1E2038",
    // paper: "#343647",
    // },

    chartPoint: {
      main: "#00D6CC",
    },
    tonalOffset: 0.5, //!
  },
});

export default function (darkMode) {
  return darkMode ? darkTheme : lightTheme;
}
