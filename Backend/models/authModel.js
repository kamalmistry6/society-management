const db = require("../config/db");

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
    userData.role,
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

// FIND USER BY EMAIL
exports.findByEmail = async (email) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  const [rows] = await db.execute(sql, [email]);

  console.log("Database Role:", rows[0]?.role);
  return rows[0];
};

// CHECK IF ADMIN EXISTS
exports.findAdmin = async () => {
  const sql = "SELECT * FROM user WHERE role = 'admin' LIMIT 1"; // Corrected table name to 'user'
  const [rows] = await db.execute(sql);
  return rows.length > 0 ? rows[0] : null;
};
