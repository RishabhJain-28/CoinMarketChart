import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import axios from "../util/axios";

import TokenTable from "../components/TokenTable/index";

const useStyles = makeStyles((theme) => ({
  page: {
    background:
      theme.palette.type === "dark" ? theme.palette.background.main : "white",
  },
}));

const getTokens = () => axios.get(`/tokens/`).then((res) => res.data);

function Home() {
  const classes = useStyles();
  const { data: tokens, isLoading, isError } = useQuery("allTokens", getTokens);

  console.log(tokens);

  if (isLoading) return <>LOADING</>;
  if (isError) return <> Error while fetching data</>;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid className={classes.page} container justify="center">
        <Grid item xs={10}>
          <TokenTable tokens={tokens} />
        </Grid>
      </Grid>
    </>
  );
}

// Home.getInitialProps = async () => {
//   try {
//     const queryClient = new QueryClient();
//     await queryClient.prefetchQuery("allTokens", getTokens);
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

export default Home;
