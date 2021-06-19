const EXPLORER_BACKEND_URL = process.env.VUE_APP_EXPLORER_BACKEND_URL;
const DASHBOARD_BACKEND_URL = process.env.VUE_APP_DASHBOARD_BACKEND_URL;

const EXPLORER_BACKEND_WS = process.env.VUE_APP_EXPLORER_BACKEND_WS;
// console.log(EXPLORER_BACKEND_URL, EXPLORER_BACKEND_WS);
const SECRET = process.env.SECRET;

const BASE_HRC20URL =
  "https://raw.githubusercontent.com/harmony-one/HRC20-logos/master";
// const BASE_HRC20URL ='https://raw.githubusercontent.com/harmony-one/HRC20-logos/testnet';
const HRC20_HOLDERURL = "https://harmony-hrc-holder.firebaseapp.com/#/address";
const ONE_HOLDERURL = "https://balance.harmony.one";

const SDK_NODE = process.env.VUE_APP_SDK_NODE;

module.exports = {
  EXPLORER_BACKEND_URL,
  DASHBOARD_BACKEND_URL,
  EXPLORER_BACKEND_WS,
  SECRET,
  BASE_HRC20URL,
  BASE_HRC20URL,
  HRC20_HOLDERURL,
  ONE_HOLDERURL,
  SDK_NODE,
};
