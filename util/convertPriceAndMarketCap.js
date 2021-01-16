import { BTC, ONE, USD } from "./UNITS";

export default (tokens_data, unit, conversionPrices) => {
  const tokens = [...tokens_data];
  const convertUnit = (value, unit, conversionPrices) => {
    const { onePriceInUSD, btcPriceInUSD } = conversionPrices;
    if (unit === USD) return onePriceInUSD / value;
    else if (unit === BTC) return (onePriceInUSD / value) * btcPriceInUSD;
    else return value;
  };
  const properties = ["marketCap", "price"];
  tokens.forEach((token) => {
    properties.forEach((property) => {
      if (token[`original_${property}`] === undefined) {
        token[`original_${property}`] = token[property];
      }
      const value = token[`original_${property}`];
      if (unit === ONE) {
        token[property] = value;
        return;
      }
      const convertedValue = convertUnit(value, unit, conversionPrices);
      token[property] = convertedValue;
    });
  });
  return tokens;
};
