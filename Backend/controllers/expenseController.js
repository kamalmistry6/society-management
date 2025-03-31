const expenseModel = require("../models/expenseModel");

// ✅ Normalize Payload Function to ensure consistent naming
const normalizeExpensePayload = (payload) => ({
  category: payload.category || null,
  description: payload.description || null,
  amount: payload.amount || 0,
  paymentMethod: payload.payment_method || payload.paymentMethod || null, // Handle both naming conventions
  expenseDate: payload.expense_date || payload.expenseDate || null,
  vendorName: payload.vendor_name || payload.vendorName || null,
  invoiceNumber: payload.invoice_number || payload.invoiceNumber || null,
  status: payload.status || null,
});

// Add Expense
exports.addExpense = async (req, res) => {
  const expense = normalizeExpensePayload(req.body);

  if (!expense.category || !expense.amount) {
    return res
      .status(400)
      .json({ message: "Category and Amount are required" });
  }

  try {
    await expenseModel.addExpense(expense);
    res.status(201).json({ message: "Expense added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error });
  }
};

// Get All Expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.getAllExpenses();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

// Get Expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expenseModel.getExpenseById(id);
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expense" });
  }
};

// Update Expense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const expense = normalizeExpensePayload(req.body);

  try {
    await expenseModel.updateExpense(id, expense);
    res.json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating expense" });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await expenseModel.deleteExpense(id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense" });
  }
};
