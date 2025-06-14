const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const serverless = require("serverless-http");

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

// Routes
const UserRoutes = require("./routes/UserRoute");
const MessageRoutes = require("./routes/MessageRoute");

app.use("/api/user", UserRoutes);
app.use("/api/message", MessageRoutes);

// MongoDB connection
let isConnected = false;
async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("Connected to MongoDB");
  }
}

// Export for Vercel
const handler = serverless(app);
module.exports = async (req, res) => {
  await connectDB();
  return handler(req, res);
};

// Local dev mode
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running locally on http://localhost:${PORT}`);
    });
  });
}
