import { createMuiTheme } from "@material-ui/core/styles";

export default function (darkMode) {
  return createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });
}
