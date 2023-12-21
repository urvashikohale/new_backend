const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    // title: {
    //   type: String,
    // },
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true, //trim is used for removing spaces in string ex"  hello" is saved as"hello"
    },
    // caseName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    start: Date,
    end: Date,

    // date: {
    //   type: Date,
    //   required: true,
    // },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
