import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Main from "../../components/tokenPage/Main";
import TokenInfoCard from "../../components/tokenPage/TokenInfoCard";
import axios from "../../util/axios";
import UnitContext from "../../util/context/UnitContext";
import useStyles from "../../styles/[tokenid]_Style";
import convertPriceAndMarketCap from "../../util/convertPriceAndMarketCap";
import { USD, ONE, BTC } from "../../util/UNITS";
import Chart from "../../components/Chart/index";
import View from "../../components/Editor/View";
import { io } from "socket.io-client";

// const useStyles =

const Token = ({ token: token_props, query, URL }) => {
  // console.log(b);
  // const = props;
  const classes = useStyles();
  const temp = useRouter();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightAndWidthPaper = clsx(
    classes.paper,
    classes.fixedHeightAndWidth
  );
  const [token, setToken] = useState(token_props);
  const { unit } = useContext(UnitContext);

  const getLatestData = async () => {
    try {
      console.log("getLatestData");
      const { data } = await axios.get(`/tokens/${query.tokenId}`);
      const { data: conversionPrices } = await axios.get(
        `/tokens/conversionPrices`
      );
      const [token] = convertPriceAndMarketCap([data], unit, conversionPrices);
      console.log(token);
      setToken(token);
    } catch (err) {
      console.log(err);
      //     //! better error handling
      //     //! loading
    }
  };
  useEffect(() => {
    getLatestData();
  }, [unit]);
  useEffect(() => {
    console.log(query);
    // if (!token) return;
    // const socket = io("http://localhost:5000");
    const socket = io(URL);
    socket.on("data", (data) => {
      console.log(data);
      // setNewData(data);
    });
    socket.on("update", (data) => {
      console.log("update", data);
      // setNewData(data);
      // console.log("u", data);

      const t = data.tokens.find((e) => {
        // console.log("e", e._id);
        // console.log('e', e._id);

        return e._id === query.tokenId;
      });

      console.log("t", t);

      const [value] = convertPriceAndMarketCap(
        [{ ...token, ...t }],
        unit,
        data.conversionPrices
      );
      // const newToken  =  { ...t,  }
      setToken(value);
      // console.log(value);
      // console.log("token", token);
    });
    return () => socket.disconnect();
    //
  }, [token]);
  return (
    <>
      <Container maxWidth="lg">
        <CssBaseline />
        <main>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography className={classes.title} variant="h2">
                {token.symbol}/ONEs
              </Typography>
            </Grid>
            {/* <Grid item xs={12} style={{ padding: "5px" }}> */}
            <Grid item xs={12}>
              {/* <Paper className={classes.chart}> */}
              <Paper className={classes.paper}>
                {/* <Paper className={fixedHeightPaper}> */}
                <Chart priceUnit={unit} tokenId={query.tokenId} />
              </Paper>
            </Grid>
          </Grid>
          <div className={classes.sectionDesktop}>
            <Grid container spacing={5} className={classes.mainGrid}>
              <Grid item xs={12} md={8}>
                <View
                  token={token}
                  unit={unit}
                  // content={Buffer.from(token.displayInfo).toString()}
                  // content={Buffer.from(token.displayInfo.data).toString()}
                />
                {/* <Main
                  displayInfo={"adsdnasdlnlsdkfnlkdnflkasdnkjknasd;fclf;nha"}
                /> */}
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <TokenInfoCard token={token} p={token.price} />
                </Paper>
              </Grid>
            </Grid>
          </div>
          <div className={classes.sectionMobile}>
            <Grid container spacing={5} className={classes.mainGrid}>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <TokenInfoCard token={token} p={token.price} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8}>
                <View
                  token={token}
                  unit={unit}
                  // content={Buffer.from(token.displayInfo).toString()}
                  // content={Buffer.from(token.displayInfo.data).toString()}
                />
                {/* <View content={Buffer.from(token.displayInfo).toString()} /> */}
                {/* <Main displayInfo={token.displayInfo} /> */}
              </Grid>
            </Grid>
          </div>
        </main>
      </Container>
    </>
  );
  // </React.Fragment>
};

// export async function getServerSideProps(context) {
//   try {
//     const { data } = await axios.get(`/tokens/${context.params.tokenId}`);
//     const { data: conversionPrices } = await axios.get(
//       `/tokens/conversionPrices`
//     );
//     // let tokenArray = [data];
//     const [token] = convertPriceAndMarketCap([data], USD, conversionPrices);
//     return {
//       props: { token, conversionPrices, params: context.params },
//     };
//   } catch (err) {
//     console.log(err);
//     return { props: {} };
//   }
// }

Token.getInitialProps = async (context) => {
  try {
    console.log("getINIT_PROPS");
    console.log("context.q", context.query);
    const { data } = await axios.get(`/tokens/${context.query.tokenId}`);
    const { data: conversionPrices } = await axios.get(
      `/tokens/conversionPrices`
    );
    const [token] = convertPriceAndMarketCap([data], USD, conversionPrices);
    return { token, query: context.query, URL: process.env.URL };
  } catch (err) {
    console.log(err);
    return {};
  }
};

export default Token;
