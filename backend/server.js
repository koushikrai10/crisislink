const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

// Routes
const authRoutes = require("./routes/authRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/emergency", emergencyRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// HTTP Server
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Make io available in controllers
app.set("io", io);

// Socket Connection
io.on("connection", (socket) => {

  console.log("⚡ User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User Disconnected:", socket.id);
  });

});

// Test Route
app.get("/", (req, res) => {
  res.send("🚨 CrisisLink API Running");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});