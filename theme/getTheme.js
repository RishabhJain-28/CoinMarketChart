import { createMuiTheme } from "@material-ui/core/styles";
import { purple, lightBlue } from "@material-ui/core/colors";
// import BioRhyme from "/fonts/BioRhyme/BioRhyme-Regular.tff";

// const bioRhyme = {
//   fontFamily: "BioRhyme",
//   fontStyle: "normal",
//   fontDisplay: "swap",
//   fontWeight: 400,
//   src: `
//     local('BioRhyme'),
//     local('BioRhyme-regular'),
//     url(${BioRhyme}) format('woff2')
//   `,
//   unicodeRange:
//     "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
// };

export default function (darkMode) {
  // console.log("getTheme", darkMode);
  // console.log("getTheme typeof", typeof darkMode);

  return createMuiTheme({
    typography: {
      fontFamily: "BioRhyme, Arial",
    },
    // overrides: {
    //   MuiCssBaseline: {
    //     "@global": {
    //       "@font-face": [bioRhyme],
    //     },
    //   },
    // },
    palette: {
      type: darkMode ? "dark" : "light",
      // primary: lightBlue,
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#00aee9",
        dark: "#313131",
        // main: "#00aee9",
        // dark: "#e5eb34",
        // main: "#FF3E18",
        // dark: "#00D6CC",
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: "#00D6CC",
        dark: "#1E2038",
      },
      chartLine: {
        main: "#4ab588",
      },
      background: {
        // default: "#758796",
        // paper: "#313131",
      },
    },
  });
}
