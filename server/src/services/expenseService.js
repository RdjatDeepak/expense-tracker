import expenseRepository from '../repositories/expenseRepository.js';

const VALID_CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Salary', 'Investment', 'Other'];

class ExpenseService {
  getFilteredExpenses({ category, startDate, endDate, type }) {
    let list = [...expenseRepository.getAll()];

    if (type) {
      list = list.filter(exp => exp.type === type);
    }
    if (category && category !== 'All') {
      list = list.filter(exp => exp.category === category);
    }
    if (startDate) {
      list = list.filter(exp => exp.date >= startDate);
    }
    if (endDate) {
      list = list.filter(exp => exp.date <= endDate);
    }

    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  addExpense(data) {
    this.validateExpense(data);
    return expenseRepository.create(data);
  }

  updateExpense(id, data) {
    if (!expenseRepository.getById(id)) {
      throw new Error('NOT_FOUND');
    }
    this.validateExpense(data, true);
    return expenseRepository.update(id, data);
  }

  deleteExpense(id) {
    if (!expenseRepository.delete(id)) {
      throw new Error('NOT_FOUND');
    }
    return true;
  }

  getMonthlySummary() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); 

    let totalSpentThisMonth = 0;
    let totalIncomeThisMonth = 0;
    let highestSingleExpense = 0;
    
    const categoryTotals = { Food: 0, Transport: 0, Bills: 0, Entertainment: 0, Salary: 0, Investment: 0, Other: 0 };

    expenseRepository.getAll().forEach(exp => {
      const expDate = new Date(exp.date);
      
      if (exp.type === 'expense' && exp.amount > highestSingleExpense) {
        highestSingleExpense = exp.amount;
      }

      if (expDate.getFullYear() === currentYear && expDate.getMonth() === currentMonth) {
        if (exp.type === 'expense') {
          totalSpentThisMonth += exp.amount;
        } else if (exp.type === 'income') {
          totalIncomeThisMonth += exp.amount;
        }
        
        if (categoryTotals[exp.category] !== undefined) {
          categoryTotals[exp.category] += exp.amount;
        }
      }
    });

    return { totalSpentThisMonth, totalIncomeThisMonth, highestSingleExpense, categoryTotals };
  }

  validateExpense(data, isUpdate = false) {
    const { amount, category, date, type } = data;

    if (!isUpdate && (!amount || !category || !date)) {
      throw new Error('MISSING_FIELDS');
    }
    if (amount !== undefined && (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)) {
      throw new Error('INVALID_AMOUNT');
    }
    if (category && !VALID_CATEGORIES.includes(category)) {
      throw new Error('INVALID_CATEGORY');
    }
    if (type && !['expense', 'income'].includes(type)) {
      throw new Error('INVALID_TYPE');
    }
  }
}

export default new ExpenseService();