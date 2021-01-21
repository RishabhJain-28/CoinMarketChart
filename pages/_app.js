import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { io } from "socket.io-client";
// import useMediaQuery from "@material-ui/core/useMediaQuery";

import "../styles/globals.css";

import Layout from "../components/Layout";
import getTheme from "../theme/getTheme";
import useDarkMode from "../util/hooks/useDarkMode";
import UnitContext from "../util/context/UnitContext";
import BindRouterEvents from "../util/BindRouterEvents";
BindRouterEvents();

export default function MyApp({ Component, pageProps }) {
  const [unit, setUnit] = useState("USD");
  const { isDarkModeSet, darkMode, setDarkMode } = useDarkMode();
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const theme = getTheme(darkMode);
  console.log(theme);
  // const socket = io("http://localhost:5000");
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
        <UnitContext.Provider value={{ unit, setUnit }}>
          <Layout
            isDarkModeSet={isDarkModeSet}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          >
            <Component {...pageProps} />
          </Layout>
        </UnitContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
