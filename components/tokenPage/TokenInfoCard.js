import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import toFixed from "../../util/toFixed";
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

// const Section = ()=>(
// <>
// <Title>Current Price:</Title>
// <Typography component="p" variant="h5">
//   {price}
// </Typography>

// )

export default function TokenInfoCard({ token }) {
  const classes = useStyles();
  const {
    price,
    marketCap,
    volume,
    DEX,
    contractAddress,
    circulationSupply,
    maxSupply,
  } = token;
  // console.log("infi card ", token);
  // console.log("a");
  // useEffect(() => {
  //   console.log("infi card update", token);
  // }, [token]);
  return (
    <React.Fragment>
      <Title>Current Price:</Title>
      {/* <Typography component="p" variant="h5"> */}
      <Typography component="p" variant="h6">
        {price}
      </Typography>
      <Title>Volume</Title>
      {/* <Typography component="p" variant="body1"> */}
      <Typography component="p" variant="h6">
        {volume}
      </Typography>
      <Title>Circulation Supply</Title>
      <Typography component="p" variant="h6">
        {toFixed(circulationSupply)}
      </Typography>
      <Title>Contract Address</Title>
      <Typography component="p" variant="h6">
        {contractAddress}
      </Typography>
    </React.Fragment>
  );
}
