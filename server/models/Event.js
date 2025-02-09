const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        eventName: {
           type: String,
           required: true
        },
        description: {
           type: String
        },
        date: {
           type: String,
           required: true
        },
        createrName: {
           type: String,
           required: true
        },
        image: {
            type: String,
           
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        attendess: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]

    }
)

module.exports = mongoose.model("Event", eventSchema);