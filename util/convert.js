import { BTC, ONE, USD } from "./UNITS";

const convert = (tokens_data, property, unit, conversionPrices) => {
  const tokens = [...tokens_data];

  const convertUnit = (value, unit, conversionPrices) => {
    const { onePriceInUSD, btcPriceInUSD } = conversionPrices;
    if (unit === USD) return value * onePriceInUSD;
    else if (unit === BTC) return (value * onePriceInUSD) / btcPriceInUSD;
    else return value;
  };

  const temp = [];
  tokens.forEach((token) => {
    const value = token[`original_${property}`] || token[property];
    if (unit === ONE) {
      token[property] = value;
      return temp.push(token);
    }
    token[`original_${property}`] = value;
    const convertedProperty = convertUnit(value, unit, conversionPrices);
    // console.log("convertss", token[property]);
    const convertedToken = { ...token };
    convertedToken[property] = convertedProperty;
    // console.log(convertedToken);
    temp.push(convertedToken);
  });
  return temp;
};
export default convert;
