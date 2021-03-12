const harmony = require("./Harmony");
const harmonyAPI = "https://api.s0.t.hmny.io/";

async function main(pools) {
  let poolData = [];
  try {
    await harmony.init(harmonyAPI);
    if (harmony.isLoaded) poolData = await loadPoolPrices(pools);
  } catch (err) {
    console.log("err", err);
  }
  return poolData;
}
async function loadPoolPrices(pools) {
  const data = [];
  for (address in pools) {
    const pool = await harmony.getPoolPrice(pools[address]);
    data.push(pool);
  }
  return data;
}

module.exports = main;
