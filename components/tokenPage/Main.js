import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Markdown from "./Markdown";

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

function Main(props) {
  const classes = useStyles();
  const { title, displayInfo } = props;
  // console.log("displayInfo", displayInfo);
  if (!displayInfo) return null;
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {"aaaaaaaaaaaaaaaaaaaaaaa"}
      </Typography>
      <Divider />
      {/* {posts.map((post) => ( */}
      {/* <Markdown className={classes.markdown}>{displayInfo}</Markdown> */}
      {/* ))} */}
    </>
  );
}

export default Main;
