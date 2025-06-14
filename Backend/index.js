const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const { app, server } = require("./lib/socket"); // server is already declared here
const UserRoutes = require("./routes/UserRoute");
const MessageRoutes = require("./routes/MessageRoute");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

// Routes
app.use("/api/user", UserRoutes);
app.use("/api/message", MessageRoutes);






// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });



// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
