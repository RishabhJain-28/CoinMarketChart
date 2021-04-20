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
import axios from "../../../util/axios";
import Editor from "../../../components/Editor/Editor";
// import dynamic from "next/dynamic";
import FormLabel from "@material-ui/core/FormLabel";
import { useRouter } from "next/router";
import { pick } from "lodash";
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

export default function EditToken() {
  const router = useRouter();
  console.log("router", router.query.tokenId);

  const classes = useStyles();
  const [tokenId, setTokenId] = useState("");

  const [displayInfo, setDisplayInfo] = useState("");
  const [token, setToken] = useState({
    address: "",
    symbol: "",
    name: "",
    image: "",
    tokenAddress: "",
    DEX: "",
  });

  const getLatestData = async (tokenId) => {
    try {
      console.log("getLatestData");
      const { data } = await axios.get(`/tokens/${tokenId}`);

      setToken(pick(data, Object.keys(token)));
      setDisplayInfo(data.displayInfo);
    } catch (err) {
      console.log(err);
      //     //! better error handling
      //     //! loading
    }
  };
  useEffect(() => {
    getLatestData(tokenId);
  }, [tokenId]);

  useEffect(() => {
    if (!router?.query?.tokenId) return;
    setTokenId(router.query.tokenId);
  }, [router]);

  const handleChange = (e) => {
    const tempToken = { ...token };
    tempToken[e.target.name] = e.target.value;
    setToken(tempToken);
  };

  //! adding a name token

  const uploadImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile, imageFile.name);
      const { data } = await axios.post("/tokens/imageUpload", formData);
      console.log("UPOADdata", data);
      const tempToken = { ...token, image: data.url };

      setToken(tempToken);
    } catch (err) {
      console.log(err); //! better error handling
    }
  };

  const saveToken = async () => {
    try {
      if (!tokenId) return;
      //! if no image error

      if (!token.image) return alert("token img req");
      const tempToken = { ...token, displayInfo }; //! add a name input
      const { data } = await axios.put(`/tokens/edit/${tokenId}`, tempToken);
      alert("done");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit token
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {token.image && (
              <Grid item xs={12}>
                <img id="IMAGE TEST ID" src={token.image} />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => {
                    console.log(e.target.files[0]);

                    uploadImage(e.target.files[0]);
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
                  value={token.address}
                  onChange={handleChange}
                  aria-describedby="pool-address-text"
                />
                <FormHelperText id="pool-address-text">
                  The address of the pool
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="token-symbol">Token Symbol</InputLabel>
                <Input
                  id="token-symbol"
                  name="symbol"
                  value={token.symbol}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>{" "}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="token-symbol">Token Name</InputLabel>
                <Input
                  id="token-symbol"
                  name="name"
                  value={token.name}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="token-address">Token address</InputLabel>
                <Input
                  id="token-address"
                  name="tokenAddress"
                  value={token.tokenAddress}
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
                  value={token.DEX}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Editor
                displayInfo={displayInfo}
                setDisplayInfo={setDisplayInfo}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={saveToken}
          >
            Save token
          </Button>
        </form>
      </div>
    </Container>
  );
}
