import expenseService from '../services/expenseService.js';

class ExpenseController {
  getExpenses = (req, res, next) => {
    try {
      const filters = {
        category: req.query.category,
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };
      const result = expenseService.getFilteredExpenses(filters);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  createExpense = (req, res, next) => {
    try {
      const newExpense = expenseService.addExpense(req.body);
      res.status(201).json(newExpense);
    } catch (error) {
      this.handleValidationError(error, res, next);
    }
  };

  updateExpense = (req, res, next) => {
    try {
      const updated = expenseService.updateExpense(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      this.handleValidationError(error, res, next);
    }
  };

  deleteExpense = (req, res, next) => {
    try {
      expenseService.deleteExpense(req.params.id);
      res.json({ message: 'Expense deleted successfully!' });
    } catch (error) {
      if (error.message === 'NOT_FOUND') {
        return res.status(404).json({ error: 'Expense item not found' });
      }
      next(error);
    }
  };

  getSummary = (req, res, next) => {
    try {
      const summary = expenseService.getMonthlySummary();
      res.json(summary);
    } catch (error) {
      next(error);
    }
  };

  // Clean error router mapping custom exceptions to clean client statuses
  handleValidationError(error, res, next) {
    if (error.message === 'MISSING_FIELDS') {
      return res.status(400).json({ error: 'Amount, category, and date are required parameters.' });
    }
    if (error.message === 'INVALID_AMOUNT') {
      return res.status(400).json({ error: 'Amount must be a positive number greater than zero.' });
    }
    if (error.message === 'INVALID_CATEGORY') {
      return res.status(400).json({ error: 'Provided category is unsupported.' });
    }
    if (error.message === 'FUTURE_DATE') {
      return res.status(400).json({ error: 'Expense data logging cannot accept future dates.' });
    }
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Target expense payload not found.' });
    }
    next(error);
  }
}

export default new ExpenseController();