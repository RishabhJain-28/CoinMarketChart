import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Grid, Container, Paper, Typography } from "@material-ui/core/";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import axios from "../../util/axios";
import UnitContext from "../../util/context/UnitContext";

import useStyles from "../../styles/[tokenid]_Style";

import TokenInfoCard from "../../components/tokenPage/TokenInfoCard";
import Chart from "../../components/Chart/index";
import View from "../../components/Editor/View";

const getToken = (tokenId) =>
  axios.get(`/tokens/${tokenId}`).then((res) => res.data);

const Token = () => {
  const classes = useStyles();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { unit } = useContext(UnitContext);
  const { data: token, isLoading, isError } = useQuery(
    ["token", router.query.tokenId],
    () => getToken(router.query.tokenId),
    {
      initialData: () =>
        queryClient
          .getQueryData("allTokens")
          ?.find((t) => t._id === router.query.tokenId),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState("allTokens")?.dataUpdatedAt,
    }
  );
  if (isLoading) return <>LOADING</>;
  if (isError) return <>Error fetching data</>;

  return (
    <>
      <Container maxWidth="xl">
        {/* <CssBaseline /> */}
        <main>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8} lg={8}>
              <Typography className={classes.title} variant="h2">
                {token.symbol}/ONEs
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Chart priceUnit={unit} tokenId={router.query.tokenId} />
              </Paper>
            </Grid>
          </Grid>
          <div className={classes.sectionDesktop}>
            <Grid container spacing={1} className={classes.mainGrid}>
              <Grid item xs={12} md={8}>
                <View token={token} unit={unit} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <TokenInfoCard token={token} unit={unit} />
                </Paper>
              </Grid>
            </Grid>
          </div>
          <div className={classes.sectionMobile}>
            <Grid container spacing={5} className={classes.mainGrid}>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <TokenInfoCard token={token} unit={unit} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8}>
                <View token={token} unit={unit} />
              </Grid>
            </Grid>
          </div>
        </main>
      </Container>
    </>
  );
};

// Token.getInitialProps = async (context) => {
//   try {
//     const queryClient = new QueryClient();
//     await queryClient.prefetchQuery(["token", context.query.tokenId], () =>
//       getToken(context.query.tokenId)
//     );
//     return {
//       props: {
//         dehydratedState: dehydrate(queryClient),
//       },
//     };
//   } catch (err) {
//     console.log(err);
//     return {};
//   }
// };

export default Token;
