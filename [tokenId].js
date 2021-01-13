// import React, { useState, useEffect, useContext } from "react";
// import { useRouter } from "next/router";
// import clsx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Grid from "@material-ui/core/Grid";
// import Container from "@material-ui/core/Container";
// import Paper from "@material-ui/core/Paper";
// import GitHubIcon from "@material-ui/icons/GitHub";
// import FacebookIcon from "@material-ui/icons/Facebook";
// import TwitterIcon from "@material-ui/icons/Twitter";
// // import Chart from "../../components/token/Chart";
// // import Header from "./Header";
// // import MainFeaturedPost from "./MainFeaturedPost";
// // import FeaturedPost from "./FeaturedPost";
// import Typography from "@material-ui/core/Typography";
// import Main from "../../components/token/Main";
// import TokenInfoCard from "../../components/token/TokenInfoCard";

// import axios from "../../util/axios";
// import UnitContext from "../../util/context/UnitContext";
// import convert from "../../util/convert";
// import { USD, ONE, BTC } from "../../util/UNITS";
// const post1 = `# Sample blog post

// #### April 1, 2020 by [Olivier](/)

// This blog post shows a few different types of content that are supported and styled with
// Material styles. Basic typography, images, and code are all supported.
// You can extend these by modifying Markdown.js.
// Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
// Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
// Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.

// Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo.
// Nullam id dolor id nibh ultricies vehicula ut id elit.

// Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
// Aenean lacinia bibendum nulla sed consectetur.

// ## Heading

// Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
// Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
// Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

// ### Sub-heading

// Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

// ### Sub-heading

// Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
// Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
// Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
// sit amet risus.

// - Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
// - Donec id elit non mi porta gravida at eget metus.
// - Nulla vitae elit libero, a pharetra augue.

// Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.

// 1.  Vestibulum id ligula porta felis euismod semper.
// 2.  Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
// 3.  Maecenas sed diam eget risus varius blandit sit amet non magna.

// Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.

// `;
// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
//   root: {
//     display: "flex",
//   },
//   toolbar: {
//     paddingRight: 24, // keep right padding when drawer closed
//   },
//   toolbarIcon: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     padding: "0 8px",
//     ...theme.mixins.toolbar,
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: 36,
//   },
//   menuButtonHidden: {
//     display: "none",
//   },
//   title: {
//     flexGrow: 1,
//   },
//   drawerPaper: {
//     position: "relative",
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     boxSizing: "border-box",
//   },
//   drawerPaperClose: {
//     overflowX: "hidden",
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     width: theme.spacing(7),
//     [theme.breakpoints.up("sm")]: {
//       width: theme.spacing(9),
//     },
//   },
//   appBarSpacer: theme.mixins.toolbar,
//   content: {
//     backgroundColor:
//       theme.palette.mode === "light"
//         ? theme.palette.grey[100]
//         : theme.palette.grey[900],
//     flexGrow: 1,
//     height: "100vh",
//     overflow: "auto",
//   },
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
//   paper: {
//     padding: theme.spacing(2),
//     display: "flex",
//     overflow: "auto",
//     flexDirection: "column",
//   },
//   fixedHeight: {
//     height: 240,
//   },
//   sectionDesktop: {
//     display: "none",
//     [theme.breakpoints.up("md")]: {
//       display: "flex",
//     },
//   },
//   sectionMobile: {
//     display: "flex",
//     [theme.breakpoints.up("md")]: {
//       display: "none",
//     },
//   },
// }));

// const Token = (props) => {
//   const classes = useStyles();
//   const temp = useRouter();
//   const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
//   const [token, setToken] = useState({});
//   // const [token, setToken] = useState(props.token);
//   const { unit, setUnit } = useContext(UnitContext);
//   const [conversionPrices, setConversionPrices] = useState();
//   // const [conversionPrices, setConversionPrices] = useState({
//   //   onePriceInUSD: props.conversionPrices.onePriceInUSD,
//   //   btcPriceInUSD: props.conversionPrices.btcPriceInUSD,
//   // });
//   useEffect(() => {
//     // console.log("temp", temp);
//     // console.log("temp", temp.query);
//     // console.log("props", props);
//     // return;
//     const q = temp.query;
//     (async function a(q) {
//       try {
//         console.log("22222221");

//         const { data } = await axios.get(`/tokens/${q.tokenId}`);
//         const { data: conversionPrices } = await axios.get(
//           `/tokens/conversionPrices`
//         );
//         let temp = [data];
//         temp = convert(temp, "price", USD, conversionPrices);
//         const [token] = convert(temp, "price", USD, conversionPrices);
//         // return {
//         //   props: { token, conversionPrices, params: context.params }, // will be passed to the page component as props
//         // };
//         setToken(token);
//         setConversionPrices(conversionPrices);
//       } catch (err) {
//         console.log(err);
//         console.log("111111111111111111");
//         // return { props: {} };
//       }
//     })(q);
//   }, []);
//   const changeVal = async () => {
//     try {
//       const { data } = await axios.get(`/tokens/conversionPrices`);
//       console.log(data);
//       console.log(token);
//       const a = [token];
//       const [temp] = convert(a, "price", unit, data);
//       // const [xz] = convert(temp, "marketCap", unit, data);
//       console.log("final", temp);
//       setConversionPrices(data);
//       setToken(() => {
//         console.log("unit", unit);
//         console.log("setTOKEN", temp);
//         return temp;
//       });
//     } catch (err) {
//       console.log("err2");
//       console.log(err);
//     }
//   };
//   console.log("unit token", unit);
//   useEffect(() => {
//     console.log("cahnge");
//     changeVal();
//   }, [unit]);
//   // <React.Fragment>
//   return (
//     <Container maxWidth="lg">
//       <CssBaseline />
//       <main>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={8}>
//             <Typography variant="h1" gutterBottom>
//               {token.name}
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Paper className={fixedHeightPaper}>
//               <h4>CHART </h4>
//             </Paper>
//           </Grid>
//         </Grid>
//         <div className={classes.sectionDesktop}>
//           <Grid container spacing={5} className={classes.mainGrid}>
//             <Main displayInfo={token.displayInfo} />
//             <Grid item xs={12} md={4}>
//               <Paper className={classes.paper}>
//                 {/* <TokenInfoCard token={token} p={token.price} /> */}
//               </Paper>
//             </Grid>
//           </Grid>
//         </div>
//         <div className={classes.sectionMobile}>
//           <Grid container spacing={5} className={classes.mainGrid}>
//             <Grid item xs={12} md={4}>
//               <Paper className={classes.paper}>
//                 <TokenInfoCard token={token} p={token.price} />
//               </Paper>
//             </Grid>
//             <Main displayInfo={token.displayInfo} />
//           </Grid>
//         </div>
//       </main>
//     </Container>
//   );
//   // </React.Fragment>
// };

// export default Token;

// // export async function getServerSideProps(context) {
// //   try {
// //     const { data } = await axios.get(`/tokens/${context.params.tokenId}`);
// //     const { data: conversionPrices } = await axios.get(
// //       `/tokens/conversionPrices`
// //     );
// //     let temp = [data];
// //     temp = convert(temp, "price", USD, conversionPrices);
// //     const [token] = convert(temp, "price", USD, conversionPrices);
// //     return {
// //       props: { token, conversionPrices, params: context.params }, // will be passed to the page component as props
// //     };
// //   } catch (err) {
// //     console.log(err);
// //     return { props: {} };
// //   }
// // }
