const db = require("../config/db");

// Add Expense
exports.addExpense = async (expense) => {
  const sql = `
    INSERT INTO expense (category, description, amount, payment_method, expense_date, vendor_name, invoice_number, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // ✅ Map camelCase to snake_case to match SQL column names
  const values = [
    expense.category,
    expense.description,
    expense.amount,
    expense.paymentMethod || expense.payment_method, // Handle both naming conventions
    expense.expenseDate || expense.expense_date,
    expense.vendorName || expense.vendor_name,
    expense.invoiceNumber || expense.invoice_number,
    expense.status,
  ];

  return db.execute(sql, values);
};

// Get All Expenses
exports.getAllExpenses = async () => {
  const sql = `SELECT * FROM expense`;
  const [rows] = await db.execute(sql);
  return rows;
};

// Get Expense by ID
exports.getExpenseById = async (id) => {
  const sql = `SELECT * FROM expense WHERE id = ?`;
  const [rows] = await db.execute(sql, [id]);
  return rows[0];
};

// Update Expense
exports.updateExpense = async (id, expense) => {
  console.log("Updating expense with ID:", id);
  console.log("Payload received:", expense);

  const sql = `
    UPDATE expense 
    SET 
      category = ?, 
      description = ?, 
      amount = ?, 
      payment_method = ?, 
      expense_date = ?, 
      vendor_name = ?, 
      invoice_number = ?, 
      status = ?
    WHERE id = ?`;

  // ✅ Map camelCase to snake_case to avoid `undefined` errors
  const values = [
    expense.category,
    expense.description,
    expense.amount,
    expense.paymentMethod || expense.payment_method,
    expense.expenseDate || expense.expense_date,
    expense.vendorName || expense.vendor_name,
    expense.invoiceNumber || expense.invoice_number,
    expense.status,
    id,
  ];

  try {
    const [result] = await db.execute(sql, values);
    console.log("SQL Execution Result:", result);
    return result;
  } catch (error) {
    console.error("SQL Execution Error:", error);
    throw error;
  }
};

// Delete Expense
exports.deleteExpense = async (id) => {
  const sql = `DELETE FROM expense WHERE id = ?`;
  return db.execute(sql, [id]);
};
