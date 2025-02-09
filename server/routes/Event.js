const express = require("express")
const { createEvent, updateEvent, deleteEvent, getAllEvent } = require("../controllers/Event")
const { auth } = require("../middlewares/auth")
const router = express.Router()

router.post("/event", auth, createEvent)
router.put("/updateEvent", auth, updateEvent)
router.delete("/deleteEvent", auth, deleteEvent)
router.get("/allEvents", getAllEvent)

module.exports = router
