const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   unique: true,
    //   required: true,
    // },
    number: {
      type: Number,
      // required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    symbol: {
      type: String,
      unique: true,
      required: true,
    },
    displayInfo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      //! more validation sample: "0x51245b9bf3648b3ea6f21f3ba5ae3a946db8a572"
    },
    contractAddress: {
      type: String,
    },
    DEX: {
      type: String,
      required: true,
    },
    tokenAddress: {
      type: String,
      required: true,
      //! more validation sample: "0x51245b9bf3648b3ea6f21f3ba5ae3a946db8a572"
    },
    price: {
      type: Number,
      // required: true
      defalut: 0,
    },
    maxSupply: {
      type: Number,
      // required: true//! can be used for validation
      defalut: 0,
    },
    // marketcap: {
    //   type: Number,
    //   default: 0,
    //   //! change defalut
    // },
    circulationSupply: {
      type: Number,
      default: 0,
      //! change defalut
    },
    volume: {
      type: Number,
      default: 0,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      require: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// tokenSchema.virtual("domain").get(function () {
//   return "asnnddj";
// });
tokenSchema.virtual("name").get(function () {
  return this.symbol + "/ONEs";
});
tokenSchema.virtual("marketCap").get(function () {
  return this.circulationSupply * this.price;
});
tokenSchema.virtual("chartData", {
  ref: "chart",
  localField: "_id",
  foreignField: "token",
});
const Token = mongoose.model("token", tokenSchema);

module.exports = Token;
