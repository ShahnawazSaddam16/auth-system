const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Auth = require("./controllers/auth");

dotenv.config();

const app = express();
const Port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser()); 


app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));

// Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Routes
app.use("/api/auth", Auth);

// Mongoose connect
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("✅✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌❌ Error connecting MongoDB:", err);
    process.exit(1);
  });


app.listen(Port, (err) => {
  if (err) {
    console.error("❌❌ Error Connecting Server", err);
  } else {
    console.log(`✅✅ Server Running at http://localhost:${Port}`);
  }
});