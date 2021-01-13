const mongoose = require("mongoose");

const chartSchema = mongoose.Schema(
  {
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "token",
      required: true,
    },
    ONE: {
      type: Number,

      required: true,
    },
    BTC: {
      type: Number,

      required: true,
    },
    USD: {
      type: Number,

      required: true,
    },
    time: { type: Date, required: true },
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

const Chart = mongoose.model("chart", chartSchema);

module.exports = Chart;
