// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const authMiddleware = async (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ msg: "No token, authorization denied." });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.user.id);
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid." });
//   }
// };

// module.exports = authMiddleware;
/////////

// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.header("Authorization"); // Get token from request headers

//   if (!token) {
//     return res.status(401).json({ msg: "Access denied. No token provided!" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//     req.user = decoded; // Attach user data to request
//     next(); // Proceed to next middleware
//   } catch (error) {
//     res.status(401).json({ msg: "Invalid or expired token!" });
//   }
// };
/////////////
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.body.token, '888');
  
  const authHeader = req.body.token; // Get token from header

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return res.status(401).json({ msg: "Access denied. No token provided!" });
  // }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user data to request
    next(); // Proceed to next middleware
  } catch (error) {
    res.status(401).json({ msg: "Invalid or expired token!" });
  }
};
