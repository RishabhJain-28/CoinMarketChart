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
import { USD } from "../util/UNITS";
// const  = UNITS;

import UnitContext from "../util/context/UnitContext";
import convertPriceAndMarketCap from "../util/convertPriceAndMarketCap";

const useStyles = makeStyles({});

function Home({ tokens: tokens_props, URL }) {
  const classes = useStyles();
  const { unit } = useContext(UnitContext);
  const [tokens, setTokens] = useState(tokens_props);
  const [newData, setNewData] = useState([]);
  const getLatestData = async () => {
    try {
      console.log("getLatestData");
      const { data } = await axios.get(`/tokens/`);
      console.log("original ", data);
      const { data: conversionPrices } = await axios.get(
        `/tokens/conversionPrices`
      );
      const tokens = convertPriceAndMarketCap(data, unit, conversionPrices);
      setTokens(tokens);
    } catch (err) {
      console.log(err);
      //     //! better error handling
      //     //! loading
    }
  };
  useEffect(() => {
    getLatestData();
  }, [unit]);

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

  // const socket = io("https://coin-market-chart.herokuapp.com/");
  useEffect(() => {
    const socket = io(URL);
    socket.on("data", (data) => {
      console.log(data);
      // setNewData(data);
    });
    socket.on("update", (data) => {
      console.log("update", data);
      // setNewData(data);
      const tokens = convertPriceAndMarketCap(
        data.tokens,
        unit,
        data.conversionPrices
      );
      setTokens(tokens);
    });
    return () => socket.disconnect();
    //
  }, []);
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

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container justify="center">
        <Grid item xs={10}>
          <TokenTable tokens={tokens} />
        </Grid>
      </Grid>
    </>
  );
}

Home.getInitialProps = async (context) => {
  // console.log(process.env.a);
  // console.log(process.env.URL);
  try {
    console.log("getINIT_PROPS HOME");
    // console.log("context.q", context.query);
    const { data } = await axios.get(`/tokens/`);
    const { data: conversionPrices } = await axios.get(
      `/tokens/conversionPrices`
    );
    const tokens = convertPriceAndMarketCap(data, USD, conversionPrices);
    // console.log("tokens DATA", tokens);
    return { tokens, URL: process.env.URL };
  } catch (err) {
    console.log(err);
    return {};
  }
};

// export async function getServerSideProps(context) {
//   try {
//     const { data: tokens } = await axios.get(`/tokens/`);
//     const { data: conversionPrices } = await axios.get(
//       `/tokens/conversionPrices`
//     );
//     console.log("data", conversionPrices);
//     if (!tokens || !conversionPrices) {
//       return {
//         notFound: true,
//       };
//     }
//     // console.log("tokens[0]", tokens[0]);
//     // console.log("tokens[0].cp", tokens[0].marketCap);
//     let temp = convertPriceAndMarketCap(tokens, USD, conversionPrices);
//     // const temp = [];
//     // temp = convert(tokens, "price", USD, conversionPrices);

//     console.log("a");
//     return {
//       props: { tokens: temp, conversionPrices },
//     };
//   } catch (err) {
//     console.log(err);
//     return { props: {} };
//   }
// }
export default Home;
