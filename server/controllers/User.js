const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const { name, userName, password } = req.body;
    // console.log(name);
    //validation
    if (!name || !userName || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check if user already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username is already resgisted. Try a different username if you're new.",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create db entry
    const user = await User.create({
      name,
      userName,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    //validation
    if (!userName || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check if user exists or not
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User is not registered, Please signup first",
      });
    }

    //generate JWT token, after comparing password
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        userName: user.userName,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      user.token = token;

      return res.status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Passsword is incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login Failurem Please try again later",
    });
  }
};

exports.userDetails = async (req,res) => {
    try{
      
      const userId = req.user.id;
       const userDetails = await User.findById(userId,
           {
            eventAttending: true,
            userName:true,
            name:true,
            eventCreated:true
           }
       ).populate(["eventAttending", "eventCreated"]).exec()
       return res.status(200).json({
        success: true,
        userDetails
      });
    }catch(error) {
      return res.status(404).json({
        success: false,
        message: `Can't Fetch User Data`,
        error: error.message,
      });
    }
}