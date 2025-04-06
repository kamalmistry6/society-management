const express = require("express");
const router = express.Router();
const multer = require("multer");
const profileController = require("../controllers/profileController");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile_photos/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Profile routes
router.get("/", authenticateToken, profileController.getUserProfile);
router.put(
  "/",
  authenticateToken,
  upload.single("profile_photo"),
  profileController.updateUserProfile
);

// Password change
router.put(
  "/change-password",
  authenticateToken,
  profileController.changePassword
);

module.exports = router;
