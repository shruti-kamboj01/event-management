const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    //extract token
    const token =
      req.body.token || req.header("Authorization").replace("Bearer ", "");
    // console.log("token: ", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    //verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    //   console.log("id is", req.user);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};
