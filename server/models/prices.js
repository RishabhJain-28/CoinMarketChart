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
for (let i = 0; i < 24; i += 1) {
  hours[i] = { ...minutes };
}

const pricesSchema = mongoose.Schema(
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
    date: { type: Date, required: true, unique: true },
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
pricesSchema.index({ date: 1 }, { unique: true });
// pricesSchema.index(
//   // { "date.year": 1, "date.month": 1, "date.day": 1 },
//   { unique: true }
// );

const Prices = mongoose.model("prices", pricesSchema);
module.exports = Prices;
