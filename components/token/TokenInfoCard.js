import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

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
  useEffect(() => {
    console.log("infi card update", token);
  }, [token]);
  return (
    <React.Fragment>
      <Title>Current Price:</Title>
      <Typography component="p" variant="h4">
        {/* $3,024.00 */}
        {price}
      </Typography>
      {/* <Title>Contract Address</Title>
      <Typography component="p" variant="body1">
        $3,024.00
        {contractAddress}
      </Typography> */}
      <Title>Volume</Title>
      <Typography component="p" variant="body1">
        {/* $3,024.00 */}
        {volume}
      </Typography>
      <Title>Circulation Supply</Title>
      <Typography component="p" variant="body1">
        {/* $3,024.00 */}
        {circulationSupply}
      </Typography>
      {/* <Typography color="textSecondary" className={classes.depositContext}>
        Last update:
      </Typography> */}
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}

// export async function getServerSideProps(context) {
//   return {
//     props: context, // will be passed to the page component as props
//   };
// }
