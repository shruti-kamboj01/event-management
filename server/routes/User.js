const express = require("express")
const { login, signUp, userDetails } = require("../controllers/User")
const { auth } = require("../middlewares/auth")
const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/userDetails', auth, userDetails)

module.exports = router