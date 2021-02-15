import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
// import MDEditor from "@uiw/react-md-editor";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import axios from "../../util/axios";
import Editor from "../../components/Editor/Editor";
// import dynamic from "next/dynamic";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textareaAutosize: { width: "100%", maxWidth: "100%" },
}));

export default function AddNewToken() {
  // const MDEditor = dynamic(import("@uiw/react-md-editor"));

  const classes = useStyles();
  const [imageFile, setImageFile] = useState("");
  const [displayInfo, setDisplayInfo] = useState("");
  const [newToken, setNewToken] = useState({
    address: "",
    symbol: "",
    tokenAddress: "",
    displayInfo: "",
    DEX: "",
  });

  const handleChange = (e) => {
    const tempToken = { ...newToken };
    tempToken[e.target.name] = e.target.value;
    setNewToken(tempToken);
    console.log(tempToken);
  };

  //! adding a name token

  const addNewToken = async () => {
    try {
      //! if no image error
      const formData = new FormData();
      formData.append("image", imageFile, imageFile.name);
      // formData.append("banner", banner);
      const tempToken = { ...newToken, displayInfo };
      // console.log("tempToken", tempToken);
      formData.append("newToken", JSON.stringify(tempToken));
      const { data } = await axios.post("/tokens/new", formData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  // const setDisplayInfo = (content, token) => {
  //   console.log(token);
  //   const tempToken = { ...token };
  //   tempToken.displayInfo = content;
  //   setNewToken(tempToken);
  //   // console.log(tempToken);
  // };
  return (
    <Container component="main" maxWidth="sm">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a new token
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  // value={imageFile}
                  type="file"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setImageFile(e.target.files[0]);
                  }}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="pool-address">Pool Address</InputLabel>
                <Input
                  id="pool-address"
                  name="address"
                  value={newToken.address}
                  onChange={handleChange}
                  aria-describedby="pool-address-text"
                />
                <FormHelperText id="pool-address-text">
                  The address of the pool
                </FormHelperText>
              </FormControl>
            </Grid>
            {/* <Grid container spacing={2}> */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="token-symbol">Token Symbol</InputLabel>
                <Input
                  id="token-symbol"
                  name="symbol"
                  value={newToken.symbol}
                  onChange={handleChange}
                  // aria-describedby="token-symbol-text"
                />
                {/* <FormHelperText id="token-symbol-text">
                  The symbol of the pool
                </FormHelperText> */}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="token-address">Token address</InputLabel>
                <Input
                  id="token-address"
                  name="tokenAddress"
                  value={newToken.tokenAddress}
                  onChange={handleChange}
                  aria-describedby="token-address-text"
                />
                <FormHelperText id="token-address-text">
                  The adress of the token as on seeswap
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="dex">DEX</InputLabel>
                <Input
                  id="dex"
                  name="DEX"
                  value={newToken.DEX}
                  onChange={handleChange}
                  // aria-describedby="dex-text"
                />
                {/* <FormHelperText id="dex-text">
                  The adress of the token as on seeswap
                </FormHelperText> */}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {/* <MDEditor
                value={newToken.displayInfo}
                onChange={(text) => {
                  const tempToken = { ...newToken };
                  tempToken.displayInfo = text;
                  setNewToken(tempToken);
                  console.log(tempToken);
                }}
              /> */}
              {/* <TextareaAutosize
                className={classes.textareaAutosize}
                // style={}
                value={newToken.displayInfo}
                name="displayInfo"
                onChange={handleChange}
                aria-label="display-info"
                rowsMin={30}
                placeholder="Enter diplay inof here"
              /> */}
              <Editor
                setDisplayInfo={setDisplayInfo}
                // setNewToken={setNewToken}
                // newToken={newToken}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          {/* <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={addNewToken}
          >
            Add token
          </Button> */}
          {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      {/* <Box sx={{ mt: 5 }}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
// AddNewToken.getInitialProps = async ({ query }) => {
//   const moment = (await import('MDEditor')).default()
//   return {
//     date: moment.format('dddd D MMMM YYYY'),
//     post: posts[query.id]
//   }
// }
