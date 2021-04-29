import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  tCell: {
    color: theme.palette.primary.main,
  },
  menuPaper: {
    boxShadow: theme.shadows[1],
  },
  container: {
    background:
      theme.palette.type === "dark" ? theme.palette.background.dark : "white",
  },

  pointer: {
    cursor: "pointer",
  },
  image: {
    width: "50px",
    height: "50px",
    cursor: "pointer",
  },
  tooltip: {
    padding: "10px 15px",
    minWidth: "130px",
    color: "#555555",
    lineHeight: "1.7em",
    background: "#FFFFFF",
    border: "none",
    borderRadius: "3px",
    boxShadow:
      "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)",
    maxWidth: "200px",
    textAlign: "center",
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: "0.875em",
    fontStyle: "normal",
    fontWeight: "400",
    textShadow: "none",
    textTransform: "none",
    letterSpacing: "normal",
    wordBreak: "normal",
    wordSpacing: "normal",
    wordWrap: "normal",
    whiteSpace: "normal",
    lineBreak: "auto",
  },
}));
