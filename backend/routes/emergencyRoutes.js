const express = require("express");
const router = express.Router();

const {
  createEmergency,
  getEmergencies,
  getMyEmergencies,
} = require("../controllers/emergencyController");

const Emergency = require("../models/Emergency");

// Middleware
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// ==========================
// USER ROUTES
// ==========================

// Create Emergency
router.post("/", auth, createEmergency);

// Get only logged-in user's emergencies
router.get("/my", auth, getMyEmergencies);

// ==========================
// ADMIN ROUTES
// ==========================

// Get all emergencies
router.get("/", auth, admin, getEmergencies);

// Update Status
router.put("/:id", auth, admin, async (req, res) => {
  try {
    const updated = await Emergency.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    const io = req.app.get("io");

    if (io) {
      io.emit("updateEmergency", updated);
    }

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
});

// Delete Emergency
router.delete("/:id", auth, admin, async (req, res) => {

  try {

    await Emergency.findByIdAndDelete(req.params.id);

    const io = req.app.get("io");

    if (io) {
      io.emit("deleteEmergency", req.params.id);
    }

    res.json({
      message: "Emergency Deleted",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }

});

module.exports = router;