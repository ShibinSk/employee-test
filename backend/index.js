// const express = require("express");
// const connectDB = require("./config/db");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// connectDB();

// app.use("/api/auth", require("./routes/auth"));

// const PORT = process.envFormSubmission.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// /////////
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
require("dotenv").config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

///////
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(`Registered route: ${middleware.route.stack[0].method.toUpperCase()} ${middleware.route.path}`);
    }
  });
////////

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
