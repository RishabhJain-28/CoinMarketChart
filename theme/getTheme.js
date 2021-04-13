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
      // main: "#1E2038",
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
      // light: "#DC143C",
      main: "#1E2038",
      // main: "#FF3E18",
      // dark: "#e5eb34",
    },

    secondary: {
      main: "#00D6CC",
    },
    chartLine: {
      main: "#FF3E18",
    },
    background: {
      // default: "#1E2038",
      // paper: "#484a61",
    },

    chartPoint: {
      main: "#00D6CC",
    },
    tonalOffset: 0.5, //!
  },
});

export default function (darkMode) {
  return darkMode ? darkTheme : lightTheme;
}
