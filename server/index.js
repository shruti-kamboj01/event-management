const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const dbConnect = require("./config/database");
const userRoutes = require("./routes/User");
const eventRoutes = require("./routes/Event");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const Event = require("./models/Event");

const port = process.env.PORT || 3000;
dbConnect();
cloudinaryConnect();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://event-management-blush-kappa.vercel.app"],
    credentials: true,
  })
);
const socketIO = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://event-management-blush-kappa.vercel.app"],
    credentials: true,
  },
});
app.options("*", cors())
app.use(express.json({ limit: "10mb" }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/v1/user", userRoutes);
app.use("/v1/auth", eventRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

socketIO.on("connection", (socket) => {
  // console.log("A user connected:", socket.id);

  // Handle user joining an event
  socket.on("join_event", async ({ eventId, userId }) => {
    // console.log(eventId, "userid:", userId);
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { attendees: userId } },
      { new: true }
    )
      .populate("attendees")
      .exec();
    socket.emit("update_attendees", {
      eventId,
      attendees: event.attendees.length,
    });
  });

  // // Handle user leaving an event
  socket.on("leave_event", async ({ eventId, userId }) => {
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $pull: { attendees: userId } },
      { new: true }
    ).populate("attendees");
    socket.emit("update_attendees", {
      eventId,
      attendees: event.attendees.length,
    });
  });
});

server.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
