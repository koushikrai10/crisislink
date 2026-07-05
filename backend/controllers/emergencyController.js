const Emergency = require("../models/Emergency");

// ================================
// CREATE EMERGENCY
// ================================
const createEmergency = async (req, res) => {
  try {

    const emergency = await Emergency.create({
      createdBy: req.user.id,      // Logged-in user ID
      userName: req.user.name,     // Logged-in user's name
      type: req.body.type,
      status: "active",
    });

    // 🔥 Realtime Update
    const io = req.app.get("io");

    if (io) {
      io.emit("receiveEmergency", emergency);
    }

    res.status(201).json(emergency);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error creating emergency",
    });

  }
};

// ================================
// ADMIN → GET ALL EMERGENCIES
// ================================
const getEmergencies = async (req, res) => {
  try {

    const emergencies = await Emergency.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(emergencies);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching emergencies",
    });

  }
};

// ================================
// USER → GET MY EMERGENCIES
// ================================
const getMyEmergencies = async (req, res) => {
  try {

    const emergencies = await Emergency.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(emergencies);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching your emergencies",
    });

  }
};

module.exports = {
  createEmergency,
  getEmergencies,
  getMyEmergencies,
};