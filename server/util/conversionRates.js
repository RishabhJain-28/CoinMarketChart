const axios = require("axios");
const cron = require("node-cron");

const updateConversionRates = async (app) => {
  const { data: ONE } = await axios.get(
    "https://api.binance.com/api/v1/ticker/price?symbol=ONEUSDT"
  );
  const { data: BTC } = await axios.get(
    "https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT"
  );
  const data = {
    onePriceInUSD: ONE.price,
    btcPriceInUSD: BTC.price,
  };
  app.set("conversionRates", data);
};

exports.getConversionRates = async (req) => {
  if (!req.app.get("conversionRates")) {
    await updateConversionRates(req.app);
    return req.app.get("conversionRates");
  }
  const binancePollRate = Number(process.env.BINANCE_POLL_RATE) || 0;

  if (!binancePollRate) await updateConversionRates(req.app);
  return req.app.get("conversionRates");
};

exports.init = async (app) => {
  const binancePollRate = Number(process.env.BINANCE_POLL_RATE) || 0;
  console.log("binancePollRate", binancePollRate);

  updateConversionRates(app);

  if (!binancePollRate) return;

  console.log(
    `cron setup for getConversionRates {every ${binancePollRate} minutes}`
  );

  cron.schedule(`*/${binancePollRate} * * * *`, () =>
    updateConversionRates(app)
  );
};
