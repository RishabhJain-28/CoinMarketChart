import { useState, useEffect, useContext } from "react";
import Head from "next/head";
// import styles from "../styles/Home.module.css";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Paper, Switch, Grid, Container } from "@material-ui/core";

import TokenTable from "../components/TokenTable";
import axios from "../util/axios";
import { io } from "socket.io-client";
import { ONE, BTC, USD } from "../util/UNITS";
// const  = UNITS;

import UnitContext from "../util/context/UnitContext";
import convert from "../util/convert";

const useStyles = makeStyles({});

export default function Home(props) {
  const classes = useStyles();
  const { unit, setUnit } = useContext(UnitContext);
  const [tokens, setTokens] = useState(props.tokens);
  // const [tokens, setTokens] = useState(props.tokens);
  // const [unit, setUnit] = useState(unit_init);
  // console.log(props);
  // console.log(unit);
  const [conversionPrices, setConversionPrices] = useState({
    onePriceInUSD: props.conversionPrices.onePriceInUSD,
    btcPriceInUSD: props.conversionPrices.btcPriceInUSD,
  });

  const changeVal = async () => {
    try {
      const { data } = await axios.get(`/tokens/conversionPrices`);
      console.log(data);
      setConversionPrices(data);
      // setTokens();
      const temp = convert(tokens, "price", unit, data);
      setTokens(convert(temp, "marketCap", unit, data));
    } catch (err) {
      console.log("err");
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("cahnge");
    changeVal();
  }, [unit]);

  useEffect(() => {
    console.log("tokens", tokens);
  }, [tokens]);

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
  // socket.on("hello", (data) => console.log(data));
  // socket.on("updateData", (data) => {
  //   console.log(data);
  //   setTokens(data);
  // });
  // socket.on("updateConversionPrice", (data) => {
  //   console.log(data);
  //   setConversionPrices({ onePriceInUSD: data.onePriceInUSD,
  // btcPriceInUSD: data.btcPriceInUSD,});
  // });
  // const theme = getTheme(false);
  // if (typeof window !== "undefined") {
  //   useEffect(() => {
  //     console.log(darkMode);
  //   }, [window]);
  // }
  // console.log(tokens);
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
          {/* <TokenTable socket={socket} tokens={tokens} /> */}
          <TokenTable tokens={tokens} />
        </Grid>
      </Grid>
      {/* </div> */}
      {/* </Paper> */}
      {/* </Container> */}
      {/* </ThemeProvider> */}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { data: tokens } = await axios.get(`/tokens/`);
    const { data: conversionPrices } = await axios.get(
      `/tokens/conversionPrices`
    );
    console.log("data", conversionPrices);
    if (!tokens || !conversionPrices) {
      return {
        notFound: true,
      };
    }
    console.log("tokens[0]", tokens[0]);
    // console.log("tokens[0].cp", tokens[0].marketCap);
    let temp = convert(tokens, "marketCap", USD, conversionPrices);
    // const temp = [];
    temp = convert(tokens, "price", USD, conversionPrices);
    return {
      props: { tokens: temp, conversionPrices },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
}
