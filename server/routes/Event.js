const express = require("express")
const { createEvent } = require("../controllers/Event")
const { auth } = require("../middlewares/auth")
const router = express.Router()

router.post("/event", auth, createEvent)

module.exports = router