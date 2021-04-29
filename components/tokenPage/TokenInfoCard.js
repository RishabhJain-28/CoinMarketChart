import React from "react";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import toFixed from "../../util/toFixed";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function TokenInfoCard({ token, unit }) {
  const matches = useMediaQuery("(max-width:960px)");
  const { convertedPrices, volume, contractAddress, circulationSupply } = token;

  const StyledTypography = ({ children, ...props }) => {
    return (
      <Typography component="p" variant={matches ? "h6" : "body1"} {...props}>
        {children}
      </Typography>
    );
  };
  return (
    <React.Fragment>
      <Title>Current Price:</Title>
      <StyledTypography>{convertedPrices[unit]}</StyledTypography>
      <Title>Volume</Title>
      <StyledTypography>{volume}</StyledTypography>
      <Title>Circulation Supply</Title>
      <StyledTypography>{toFixed(circulationSupply)}</StyledTypography>
      <Title>Contract Address</Title>
      <StyledTypography>{contractAddress}</StyledTypography>
    </React.Fragment>
  );
}
