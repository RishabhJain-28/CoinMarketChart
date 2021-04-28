const mongoose = require("mongoose");

const MINUTE_OBJ = {
  ONE: {
    type: Number,
    // required: true,
  },
  BTC: {
    type: Number,
    // required: true,
  },
  USD: {
    type: Number,
    // required: true,
  },
};
const minutes = {};
for (let i = 0; i < 60; i += 5) {
  minutes[i] = { ...MINUTE_OBJ };
}
const hours = {};
for (let i = 0; i < 6; i += 1) {
  hours[i] = { ...minutes };
}

const pricesTempSchema = mongoose.Schema(
  {
    //   date: {
    //     type: {
    //       year: Number,
    //       month: Number,
    //       day: Number,
    //     },
    //     required: true,
    //     // unique: true,
    //   },
    // date: { type: Date, required: true, unique: true },
    date: { type: Date, required: true },
    intervals: {
      ...hours,
      // required: true,
    },
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "token",
      required: true,
    },
  },
  {
    // toObject: {
    //   virtuals: true,
    // },
    // toJSON: {
    //   virtuals: true,
    // },
  }
);
// pricesTempSchema.index({ date: 1 }, { unique: true });
pricesTempSchema.index({ date: 1, token: 1 }, { unique: true });

const PricesTemp = mongoose.model("pricesTemp", pricesTempSchema);
module.exports = PricesTemp;
