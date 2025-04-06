const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");
const { JWT_SECRET, JWT_EXPIRES } = require("../config/env");

exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
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

  try {
    // Check if email already exists
    const existingUser = await authModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check if an admin already exists
    const existingAdmin = await authModel.findAdmin();

    // Assign role based on existing admin
    const userRole = existingAdmin ? "user" : "admin";

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare the user data object
    const userData = {
      name,
      phone,
      email,
      password: hashedPassword,
      role: userRole,
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
    };

    // Register the new user in the database
    await authModel.registerUser(userData);

    res.status(201).json({
      message: "User registered successfully",
      role: userRole,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await authModel.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token with user ID and role
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login" });
  }
};
