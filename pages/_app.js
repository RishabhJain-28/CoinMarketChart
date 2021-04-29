import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import useMediaQuery from "@material-ui/core/useMediaQuery";

import "../styles/globals.css";

import Layout from "../components/Layout";
import getTheme from "../theme/getTheme";
import useDarkMode from "../util/hooks/useDarkMode";
import UnitContext from "../util/context/UnitContext";
import BindRouterEvents from "../util/BindRouterEvents";
BindRouterEvents();
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

import { ReactQueryDevtools } from "react-query/devtools";

export default function MyApp({ Component, pageProps }) {
  const [unit, setUnit] = useState("USD");
  const { isDarkModeSet, darkMode, setDarkMode } = useDarkMode();
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const theme = getTheme(darkMode);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <UnitContext.Provider value={{ unit, setUnit }}>
              <Layout
                isDarkModeSet={isDarkModeSet}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              >
                <Component {...pageProps} />
              </Layout>
            </UnitContext.Provider>
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
