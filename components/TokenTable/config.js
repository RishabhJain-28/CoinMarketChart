import toFixed from "../../util/toFixed";
const columns = [
  {
    id: "number",
    label: "#",
    minWidth: 10,
    sort: true,
    extractValue: ({ index }) => {
      return index + 1;
    },
  },
  { id: "image", label: "", minWidth: 65 },
  {
    id: "name",
    label: "Name",
    minWidth: 100,
    className: "pointer",
  },
  {
    id: "symbol",
    label: "Symbol",
    minWidth: 100,
    className: "pointer",
  },
  {
    id: "price",
    label: "Price",
    minWidth: 80,
    sort: true,
    extractValue: ({ row, unit }) => {
      let value = row["convertedPrices"][unit];
      if (value > 1) value = Math.round((value + Number.EPSILON) * 100) / 100;
      else value = Math.round((value + Number.EPSILON) * 1000000) / 1000000;
      return value;
    },
  },
  {
    id: "marketCap",
    label: "Market Cap",
    minWidth: 100,
    tooltip: {
      data: "random data",
      link: "some raandome link",
    },
    sort: true,
    extractValue: ({ row, unit }) => {
      let value = row["convertedPrices"][unit] * row["circulationSupply"];
      value = Math.round(toFixed(value));
      return value;
    },
  },
  {
    id: "volume",
    label: "Volume",
    minWidth: 150,
    tooltip: {
      data: "random vol data",
      link: "some vol link",
    },
    sort: true,
  },
  {
    id: "circulationSupply",
    label: "Circulation Supply",
    minWidth: 250,
    tooltip: {
      data: "random ciculting supply data",
      link: "some cs link",
    },
    sort: true,
  },
  {
    id: "maxSupply",
    label: "Max Supply",
    minWidth: 170,
    tooltip: {
      data: "random max supply data",
      link: "some cs link",
    },
    sort: true,
  },
];

export default columns;
