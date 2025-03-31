const express = require("express");
const cors = require("cors");
const db = require("./config/db"); // Database connection

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/members", require("./routes/memberRoutes"));
app.use("/flats", require("./routes/flatRoutes"));
app.use("/allotments", require("./routes/allotmentRoutes"));
app.use("/expenses", require("./routes/expenseRoutes"));
app.use("/recurring-expenses", require("./routes/recurringExpenseRoutes"));

const PORT = process.env.PORT || 3000;

db.getConnection()
  .then((connection) => {
    console.log("✅ Database connected successfully");
    connection.release();

    // Start the server only after successful DB connection
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  });
