import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Layout from "../components/Layout";
import themeOBJ from "../theme/index";
import useLocalStorage from "../util/hooks/useLocalStorage";
import { io } from "socket.io-client";

import UnitContext from "../util/context/UnitContext";
export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [darkMode, setDarkMode] = useState(false);
  const [unit, setUnit] = useState("USD");
  // const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const theme = createMuiTheme(themeOBJ);
  const colorMode = createMuiTheme({
    palette: { type: darkMode ? "dark" : "light" },
  });
  // themeOBJ.palette.type = darkMode ? "dark" : "light";
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
        <ThemeProvider theme={colorMode}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <UnitContext.Provider value={{ unit, setUnit }}>
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Component {...pageProps} />
            </Layout>
          </UnitContext.Provider>
        </ThemeProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

// export async function getServerSideProps(context) {
//   try {

//     const { data: conversionPrices } = await axios.get(
//       `/tokens/conversionPrices`
//     );
//     // // console.log("data", conversionPrices);
//     // if ( !conversionPrices) {
//     //   return {
//     //     notFound: true,
//     //   };
//     // }
//     console.log("_app", conversionPrices);
//     // console.log("tokens[0].cp", tokens[0].marketCap);
//     return {
//       props: {  conversionPrices ,...context},
//     };
//   } catch (err) {
//     console.log(err);
//     return { props: {} };
//   }
// }
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
