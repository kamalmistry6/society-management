const db = require("../config/db");

exports.updateUserProfile = async (userId, data) => {
  const sql = `
    UPDATE user 
    SET name = ?, phone = ?, address = ?, city = ?, state = ?, pincode = ?, 
        occupation = ?, aadhaar = ?, emergency_contact_phone = ?, vehicle_number = ?, 
        move_in_date = ?, status = ?, profile_photo = ?
    WHERE id = ?
  `;
  return db.execute(sql, [
    data.name,
    data.phone,
    data.address,
    data.city,
    data.state,
    data.pincode,
    data.occupation,
    data.aadhaar,
    data.emergency_contact_phone,
    data.vehicle_number,
    data.move_in_date,
    data.status,
    data.profile_photo,
    userId,
  ]);
};

exports.getUserProfile = async (userId) => {
  const sql = "SELECT * FROM user WHERE id = ?";
  const [rows] = await db.execute(sql, [userId]);
  return rows[0];
};

exports.getUserById = async (userId) => {
  const sql = "SELECT * FROM user WHERE id = ?";
  const [rows] = await db.execute(sql, [userId]);
  return rows[0]; // return first row (the user)
};

exports.updatePassword = async (userId, newPassword) => {
  const sql = "UPDATE user SET password = ? WHERE id = ?";
  return db.execute(sql, [newPassword, userId]);
};
