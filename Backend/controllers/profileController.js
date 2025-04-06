const profileModel = require("../models/profileModel");
const bcrypt = require("bcrypt");

// Get user profile
exports.getUserProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await profileModel.getUserProfile(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

exports.updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const {
    name,
    phone,
    address,
    city,
    state,
    pincode,
    occupation,
    aadhaar,
    emergency_contact_phone,
    vehicle_number,
    move_in_date,
    status,
  } = req.body;

  const profilePhotoPath = req.file ? req.file.filename : null;

  try {
    const user = await profileModel.getUserProfile(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updatedData = {
      name,
      phone,
      address,
      city,
      state,
      pincode,
      occupation,
      aadhaar,
      emergency_contact_phone,
      vehicle_number,
      move_in_date,
      status,
      profile_photo: profilePhotoPath || user.profile_photo,
    };

    await profileModel.updateUserProfile(userId, updatedData);

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await profileModel.getUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await profileModel.updatePassword(userId, hashedPassword);

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Error changing password" });
  }
};
