const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  event: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
