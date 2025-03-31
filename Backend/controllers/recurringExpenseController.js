const recurringExpenseModel = require("../models/recurringExpenseModel");

exports.addRecurringExpense = async (req, res) => {
  const { expenseId, recurringType, nextDueDate, status } = req.body;
  try {
    await recurringExpenseModel.addRecurringExpense(
      expenseId,
      recurringType,
      nextDueDate,
      status
    );
    res.status(201).json({ message: "Recurring expense added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding recurring expense", error });
  }
};

exports.getAllRecurringExpenses = async (req, res) => {
  const expenses = await recurringExpenseModel.getAllRecurringExpenses();
  res.json(expenses);
};

exports.getRecurringExpenseById = async (req, res) => {
  const { id } = req.params;
  const expense = await recurringExpenseModel.getRecurringExpenseById(id);
  res.json(expense);
};

exports.updateRecurringExpense = async (req, res) => {
  const { id } = req.params;
  const { recurringType, nextDueDate, status } = req.body;
  await recurringExpenseModel.updateRecurringExpense(
    id,
    recurringType,
    nextDueDate,
    status
  );
  res.json({ message: "Recurring expense updated successfully" });
};

exports.deleteRecurringExpense = async (req, res) => {
  const { id } = req.params;
  await recurringExpenseModel.deleteRecurringExpense(id);
  res.json({ message: "Recurring expense deleted successfully" });
};
