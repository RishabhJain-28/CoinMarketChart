import React, { useEffect, useState } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// const placeholder = ,{buttonList}

const View = ({ token, unit }) => {
  if (!token.displayInfo) {
    console.log("123456789");
    return <>LOADING</>;
  }
  //   const handleChange = (content) => {
  // console.log(content);

  //   token.displayInfo = ;
  //     setDisplayInfo(content);
  //   };
  //   console.log(buttonList);
  //   console.log(buttonList.default);
  // useEffect(() => {
  const topExchange = "SeeSwap";
  const upBy = 1;

  const about = `<p><span style="background-color: transparent; color: rgb(34, 37, 49); font-family: Roboto, sans-serif; font-size: 18pt; font-weight: 700; white-space: pre-wrap; letter-spacing: 0.01071em;">About ${
    token.symbol
  }</span><br></p><p><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; font-size: 12pt; color: rgb(0, 0, 0); display: inline; vertical-align: baseline; margin: 0px; padding: 0px; background-color: transparent; font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;">${
    token.symbol
  } price today</span><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; font-size: 12pt; color: rgb(0, 0, 0); display: inline; vertical-align: baseline; margin: 0px; padding: 0px; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;"> is ${
    token.price
  }</span><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; font-size: 12pt; color: rgb(0, 0, 0); display: inline; vertical-align: baseline; margin: 0px; padding: 0px; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;"> ${unit} with a 24-hour trading volume of ${
    token.volume
  } </span><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; font-size: 12pt; color: rgb(0, 0, 0); display: inline; vertical-align: baseline; margin: 0px; padding: 0px; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;">${unit}. </span><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; font-size: 12pt; color: rgb(0, 0, 0); display: inline; vertical-align: baseline; margin: 0px; padding: 0px; background-color: transparent; font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;">${
    token.symbol
  }</span><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; font-size: 12pt; color: rgb(0, 0, 0); display: inline; vertical-align: baseline; margin: 0px; padding: 0px; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;"> is up ${
    token.changeIn24Hour[unit]
  }</span><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; font-size: 12pt; color: rgb(0, 0, 0); display: inline; vertical-align: baseline; margin: 0px; padding: 0px; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;">% in the last 24 hours. The current CoinMarketChart ranking is # ${
    token.number
  }</span><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; font-size: 12pt; color: rgb(0, 0, 0); display: inline; vertical-align: baseline; margin: 0px; padding: 0px; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;">, with a market cap of ${
    token.price * token.circulationSupply
  } </span><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; font-size: 12pt; color: rgb(0, 0, 0); display: inline; vertical-align: baseline; margin: 0px; padding: 0px; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;">${unit}. It has a circulating supply of ${
    token.circulationSupply
  } ${token.symbol} coins and a max. supply of ${token.maxSupply} ${
    token.symbol
  } coins.</span></p><p><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; font-size: 12pt; color: rgb(0, 0, 0); display: inline; vertical-align: baseline; margin: 0px; padding: 0px; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;">The top exchange for trading in ${
    token.symbol
  } is currently ${topExchange}.</span></p>`;

  //   token.displayInfo = about + token.displayInfo;
  // }, [token]);

  const theme = useTheme();
  // console.log(theme.palette.background);
  return (
    // <div dangerouslySetInnerHTML={{ __html: content }}>
    <Paper className="display-info-viewer">
      {/* <p> My Other Contents </p> */}
      <SunEditor
        height="100%"
        //   setContents={placeholder}
        showToolbar={false}
        disable={true}
        // setDefaultStyle={`
        // background-color: ${theme.palette.background.paper};
        // color: ${theme.palette.text.primary};
        // `}
        // setOptions={
        //   {
        //     //   height: 200,
        //     //   buttonList: buttonList.complex,
        //     // Other option
        //   }
        // }
        setContents={about + token.displayInfo}
      />
    </Paper>
  );
};
export default View;
