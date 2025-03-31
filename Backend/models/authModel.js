const db = require("../config/db");

// REGISTER USER
exports.register = async (name, email, password, role) => {
  const sql =
    "INSERT INTO auth (name, email, password, role) VALUES (?, ?, ?, ?)";
  return db.execute(sql, [name, email, password, role]);
};

// FIND USER BY EMAIL
exports.findByEmail = async (email) => {
  const sql = "SELECT * FROM auth WHERE email = ?";
  const [rows] = await db.execute(sql, [email]);

  console.log("Database Role:", rows[0]?.role); // ✅ Verify correct role from DB
  return rows[0]; // Ensure you return the entire row with the role
};

// CHECK IF ADMIN EXISTS
exports.findAdmin = async () => {
  const sql = "SELECT * FROM auth WHERE role = 'admin' LIMIT 1";
  const [rows] = await db.execute(sql);
  return rows.length > 0 ? rows[0] : null;
};
