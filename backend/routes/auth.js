// const express = require("express");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// const router = express.Router();

// // Signup Route
// router.post("/signup", async (req, res) => {
//   const { name, address, gender, username, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) return res.status(400).json({ msg: "User already exists!" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, address, gender, username, password: hashedPassword });

//     await newUser.save();
//     res.status(201).json({ msg: "User registered successfully!" });
//   } catch (error) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // Login Route
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ msg: "User does not exist. Please signup!" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials!" });

//     res.status(200).json({ msg: "Login successful!" });
//   } catch (error) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;
// // ////////////

// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// require("dotenv").config();

// const router = express.Router();

// // Signup Route
// router.post("/signup", async (req, res) => {
//   const { name, address, gender, username, password } = req.body;
  
//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ msg: "User already exists!" });
//     }

//     // Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, address, gender, username, password: hashedPassword });

//     await newUser.save();

//     // Generate JWT Token
//     const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, {
//       expiresIn: "1h", // Token expires in 1 hour
//     });

//     res.status(201).json({ msg: "User registered successfully!", token });
//   } catch (error) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // Login Route
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
  
//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ msg: "User does not exist. Please signup!" });
//     }

//     // Compare entered password with hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials!" });
//     }

//     // Generate JWT Token
//     const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({ msg: "Login successful!", token });
//   } catch (error) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;
/////////
const express = require("express");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("./middleware/authMiddleware"); // JWT Middleware
const FormSubmission = require("../models/FormSubmission");

require("dotenv").config();

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, address, gender, username, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, address, gender, username, password: hashedPassword });

    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(201).json({ msg: "User registered successfully!", token });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});
router.post("/submit", async (req, res) => {
  console.log(req.body.body.formData, 'req.body');
  const { captchaToken, ...formData } = req.body;  // Extract captchaToken from the request body
const RECAPTCHA_SECRET_KEY = "6Ld2ugIrAAAAAE-3Gl2q06VqDGPq0vKSgCSsx7aI"; // Replace with your secret key

  // Check if captchaToken exists
  if (!req.body.body.captchaToken) {
      return res.status(400).json({ message: "CAPTCHA token is missing." });
  }

  // Verification URL for Google reCAPTCHA
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${req.body.body.captchaToken}`;

  try {
      // Verify the CAPTCHA token with Google's API using GET instead of POST
      const response = await axios.get(verificationUrl);
      const { success } = response.data;

      // If CAPTCHA validation fails
      if (!success) {
          return res.status(400).json({ message: "CAPTCHA verification failed." });
      }

      // If CAPTCHA is successful, save the form submission
      const newEntry = new FormSubmission(req.body.body.formData);
      await newEntry.save();

      // Send a success response
      res.status(201).json({ message: "Form submitted successfully" });

  } catch (error) {
      console.error("Error during form submission:", error);
      res.status(500).json({ message: "Server error" });
  }
});
// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist. Please signup!" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials!" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ msg: "Login successful!", token ,user});
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Change Password Route (Protected)
router.put("/change-password", async (req, res) => {
  console.log(req.body.userId,'ioioi');
  
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  try {
    // Get user from database using decoded token ID
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
console.log(user, 'userr');

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Current password is incorrect!" });
    }

    // Check if new password and confirm password match
    // if (newPassword !== confirmNewPassword) {
    //   return res.status(400).json({ msg: "New passwords do not match!" });
    // }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: "Password changed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
