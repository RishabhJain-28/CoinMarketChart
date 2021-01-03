import { useState, useEffect } from "react";
import Head from "next/head";
// import styles from "../styles/Home.module.css";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Paper, Switch, Grid, Container } from "@material-ui/core";

import TokenTable from "../components/TokenTable";

import { io } from "socket.io-client";

const useStyles = makeStyles({});

export default function Home() {
  const classes = useStyles();

  // const [darkMode, setDarkMode] = useState(false);
  // let theme = {};
  // if (typeof window === undefined) theme = createMuiTheme({});
  // else
  //   theme = createMuiTheme({
  //     palette: { type: darkMode ? "dark" : "light" },
  //   });
  // const theme = createMuiTheme({
  //   palette: { type: darkMode ? "dark" : "light" },
  // });
  // useEffect(() => {
  //   console.log(darkMode);
  // }, [darkMode]);
  // console.log(darkMode);
  const socket = io("https://coin-market-chart.herokuapp.com/");
  // const socket = io("http://localhost:5000");
  socket.on("hello", (data) => console.log(data));

  // const theme = getTheme(false);
  // if (typeof window !== "undefined") {
  //   useEffect(() => {
  //     console.log(darkMode);
  //   }, [window]);
  // }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <ThemeProvider theme={theme}> */}

      {/* <Container maxWidth="lg"> */}
      {/* <Paper> */}
      {/* <div className={classes.root}> */}
      {/* <Switch
            checked={darkMode}
            onChange={() => {
              console.log(darkMode);
             
            }}
          /> */}
      {/* {typeof window !== "undefined" ? (
          ) : (
            <>
              <Switch
              checked={darkMode}
                onChange={() => {
                  console.log(darkMode);
                  setDarkMode(!darkMode);

                }}
              />
              </>
          )} */}
      <Grid container justify="center">
        <Grid item xs={10}>
          <TokenTable socket={socket} />
        </Grid>
      </Grid>
      {/* </div> */}
      {/* </Paper> */}
      {/* </Container> */}
      {/* </ThemeProvider> */}
    </>
  );
}
