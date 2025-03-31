const express = require("express");
const router = express.Router();
const recurringExpenseController = require("../controllers/recurringExpenseController");

router.post("/", recurringExpenseController.addRecurringExpense);
router.get("/", recurringExpenseController.getAllRecurringExpenses);
router.get("/:id", recurringExpenseController.getRecurringExpenseById);
router.put("/:id", recurringExpenseController.updateRecurringExpense);
router.delete("/:id", recurringExpenseController.deleteRecurringExpense);

module.exports = router;
