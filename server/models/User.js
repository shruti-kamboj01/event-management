const mongoose = require("mongoose");
const Event = require("./Event");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        event: [{
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Event'
        }],
        token: {
            type: String
        }
    }
)

module.exports = mongoose.model("User", userSchema);