const Event = require("../models/Event");
const User = require("../models/User");

exports.createEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventName, description, date } = req.body;
    // console.log("entered", userId);
    //validation
    if (!eventName || !date) {
      return res.status(403).json({
        success: false,
        message: "EventName and date requried",
      });
    }

    //create db entry
    const event = await Event.create({
      eventName,
      description,
      date,
    });

    //userSchema updated
    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          event: event._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again",
    });
  }
};
