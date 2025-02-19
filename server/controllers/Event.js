const { default: mongoose } = require("mongoose");
const Event = require("../models/Event");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventName, description, date, createrName } = req.body;
    const thumbnail = req.files.file;

    //validation
    if (!eventName || !date) {
      return res.status(403).json({
        success: false,
        message: "EventName and date requried",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create db entry
    const event = await Event.create({
      eventName,
      description,
      date,
      createrName,
      createdBy: userId,
      image: thumbnailImage.secure_url,
    });

    //userSchema updated
    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          eventCreated: event._id,
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
      message: "Event cannot be created. Please try again",
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;
    // console.log(typeof(userId))
    const event = await Event.findById(eventId);
    // console.log(event)
    if (!event) {
      return res.status(403).json({
        success: false,
        message: "Event not found",
      });
    }
    // console.log(typeof(event.createdBy))
    if (event.createdBy.toString() != userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this event",
      });
    }
    const { eventName, date, description, createrName } = req.body;
    // console.log("updates are", typeof(updates))
    if (eventName) {
      event.eventName = eventName;
    } else if (description) {
      event.description = description;
    } else if (createrName) {
      event.createrName = createrName;
    } else {
      event.date = date;
    }
    const updatedEvent = await event.save();
    // console.log(updatedEvent)

    return res.json({
      success: true,
      message: "Event updated successfully",
      updatedEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
     console.log("entered")
    const { eventId } = req.body;
    console.log("event", eventId)
    const userId = req.user.id;
    // console.log(typeof(userId))
    const event = await Event.findById(eventId);
    // console.log(event)
    if (!event) {
      return res.status(403).json({
        success: false,
        message: "Event not found",
      });
    }
    // console.log(typeof(event.createdBy))
    if (event.createdBy.toString() != userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this event",
      });
    }
    await User.findByIdAndUpdate(
      userId,
      {$pull: {eventCreated: eventId}},
      {new: true}
    )
    await Event.findByIdAndDelete(eventId);
 

    return res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllEvent = async (req, res) => {
  try {
    const allEvents = await Event.find(
      {},
      {
        eventName: true,
        date: true,
        description: true,
        createdBy: true,
        image: true,
        createrName: true,
        attendees: true
      }
    );
    return res.status(200).json({
      success: true,
      allEvents,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Event Data`,
      error: error.message,
    });
  }
};

// exports.getUserEvents = async(req,res) => {
//   try{
//       const userId = req.user.id
//       const events = await Event.
//   }catch(error) {
//     return res.status(404).json({
//       success: false,
//       message: `Can't Fetch Event Data`,
//       error: error.message,
//     });
//   }
// }
