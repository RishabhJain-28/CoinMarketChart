let HarmonyUtils = require("@harmony-js/utils");
let HarmonyJs = require("@harmony-js/core");
const fs = require("fs");
const path = require("path");

async function init(network) {
  try {
    const ONEs = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "./config.json"))
    );
    harmony.ONEs = ONEs;
    harmony.PoolContract = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "./contracts/BPOOL.json"), "utf8")
    );
    const chain = HarmonyUtils.ChainID.HmyMainnet;
    const options = {
      chainType: HarmonyUtils.ChainType.Harmony,
      chainId: chain,
    };
    harmony.network = network;
    harmony.harmony = await HarmonyJs.Harmony(harmony.network, options);
    harmony.isLoaded = true;
  } catch (err) {
    console.error("err", err);
  }
}

function money(amountBN, dec = 2) {
  if (!amountBN) {
    return 0;
  }
  var num = null;
  try {
    num = parseFloat(
      new harmony.harmony.utils.Unit(amountBN).asWei().toOne()
    ).toFixed(dec);
  } catch (err) {
    console.log("err", err);
  }
  return num;
}

async function getPoolPrice(pool) {
  // pool.address = pool.address.toLowerCase();
  // console.log(pool.symbol);
  // console.log(pool.address);
  try {
    let contract = harmony.harmony.contracts.createContract(
      harmony.PoolContract.abi,
      pool.address
    );
    let price = await contract.methods
      .getSpotPriceSansFee(pool.tokenAddress, harmony.ONEs.address)
      .call({ gasPrice: 1000000000, gasLimit: 31900 });

    pool.price = money(price, 8);
  } catch (err) {
    console.log("err:", pool.symbol, err);
  }
  return pool;
}

var harmony = {
  ONEs: { address: "" },
  isLoaded: false,
  harmony: null,
  pool: null,
  tokens: null,
  PoolContract: null,
  init: init,
  getPoolPrice: getPoolPrice,
};

module.exports = harmony;
