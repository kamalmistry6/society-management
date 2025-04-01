const db = require("../config/db");

exports.getAllUsers = async () => {
  const sql = "SELECT * FROM user";
  const [rows] = await db.execute(sql);
  return rows;
};

// REGISTER USER
exports.registerUser = async (userData) => {
  const sql = `
    INSERT INTO user 
    (name, phone, email, password, role, address, city, state, pincode, occupation, 
     aadhaar, emergency_contact_phone, vehicle_number, move_in_date, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  return db.execute(sql, [
    userData.name,
    userData.phone,
    userData.email,
    userData.password,
    userData.role, // Role should be passed correctly here
    userData.address,
    userData.city,
    userData.state,
    userData.pincode,
    userData.occupation,
    userData.aadhaar,
    userData.emergency_contact_phone,
    userData.vehicle_number,
    userData.move_in_date,
    userData.status,
  ]);
};

exports.deleteMember = async (id) => {
  const sql = "DELETE FROM user WHERE id = ?";
  return db.execute(sql, [id]);
};

// FIND USER BY EMAIL
exports.findByEmail = async (email) => {
  const sql = "SELECT * FROM user WHERE email = ?"; // Corrected table name to 'user'
  const [rows] = await db.execute(sql, [email]);

  console.log("Database Role:", rows[0]?.role); // Log the role for debugging
  return rows[0]; // Ensure you return the entire row with the role
};

// CHECK IF ADMIN EXISTS
exports.findAdmin = async () => {
  const sql = "SELECT * FROM user WHERE role = 'admin' LIMIT 1"; // Corrected table name to 'user'
  const [rows] = await db.execute(sql);
  return rows.length > 0 ? rows[0] : null;
};
