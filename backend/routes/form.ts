// import express from "express";
// import FormSubmission from "../models/FormSubmission";

// const router = express.Router();

// router.post("/submit", async (req, res) => {
//     try {
//         const newEntry = new FormSubmission(req.body);
//         await newEntry.save();
//         res.status(201).json({ message: "Form submitted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// export default router;
///////
import express from "express";
import axios from "axios";

const router = express.Router();

// Your secret key from the Google reCAPTCHA admin panel
const RECAPTCHA_SECRET_KEY = "6Ld2ugIrAAAAAE-3Gl2q06VqDGPq0vKSgCSsx7aI"; // Replace with your secret key



export default router;
//////////
