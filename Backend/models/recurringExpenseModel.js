const db = require("../config/db");

// Add Recurring Expense
exports.addRecurringExpense = async (
  expenseId,
  recurringType,
  nextDueDate,
  status
) => {
  const sql = `
    INSERT INTO recurring_expense (expense_id, recurring_type, next_due_date, status)
    VALUES (?, ?, ?, ?)`;
  const values = [expenseId, recurringType, nextDueDate, status];
  return db.execute(sql, values);
};

// Get All Recurring Expenses
exports.getAllRecurringExpenses = async () => {
  const sql = `SELECT * FROM recurring_expense`;
  const [rows] = await db.execute(sql);
  return rows;
};

// Get Recurring Expense by ID
exports.getRecurringExpenseById = async (id) => {
  const sql = `SELECT * FROM recurring_expense WHERE id = ?`;
  const [rows] = await db.execute(sql, [id]);
  return rows[0];
};

// Update Recurring Expense
exports.updateRecurringExpense = async (
  id,
  recurringType,
  nextDueDate,
  status
) => {
  const sql = `
    UPDATE recurring_expense 
    SET recurring_type = ?, next_due_date = ?, status = ?
    WHERE id = ?`;
  const values = [recurringType, nextDueDate, status, id];
  return db.execute(sql, values);
};

// Delete Recurring Expense
exports.deleteRecurringExpense = async (id) => {
  const sql = `DELETE FROM recurring_expense WHERE id = ?`;
  return db.execute(sql, [id]);
};
