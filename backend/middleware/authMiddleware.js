const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers);
  if (req.headers?.authorization?.startsWith("Bearer")) {
    try {
      // get token from headers
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized user");
  }
});

module.exports = { protect };
