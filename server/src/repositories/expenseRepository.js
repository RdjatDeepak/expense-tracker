import fs from 'fs';
import path from 'path';
import Expense from '../models/Expense.js';

// Absolute path targeting expenses.json right in the root server folder safely
const FILE_PATH = path.resolve('expenses.json');

class ExpenseRepository {
  // Helper: Read fresh data straight out of the JSON file safely
  _readFromFile() {
    try {
      if (!fs.existsSync(FILE_PATH)) {
        // Automatically initialize file with an empty JSON array if it disappears
        fs.writeFileSync(FILE_PATH, '[]', 'utf8');
        return [];
      }
      const rawData = fs.readFileSync(FILE_PATH, 'utf8');
      const parsedList = JSON.parse(rawData || '[]');
      
      // Map raw JSON entries back into our formal structural Model blueprints
      return parsedList.map(item => new Expense(item));
    } catch (error) {
      console.error('Error reading from JSON storage:', error);
      return [];
    }
  }

  // Helper: Save current application state back to the disk
  _writeToFile(expenses) {
    try {
      // Serialize our model objects cleanly using our .toJSON helper
      const standardizedData = expenses.map(exp => exp.toJSON());
      fs.writeFileSync(FILE_PATH, JSON.stringify(standardizedData, null, 2), 'utf8');
    } catch (error) {
      console.error('Error writing to JSON storage:', error);
    }
  }

  getAll() {
    return this._readFromFile();
  }

  getById(id) {
    const expenses = this._readFromFile();
    return expenses.find(exp => exp.id === id);
  }

  create(expenseData) {
    const expenses = this._readFromFile();
    
    const newExpense = new Expense({
      id: Date.now().toString(),
      ...expenseData
    });
    
    expenses.push(newExpense);
    this._writeToFile(expenses);
    
    return newExpense.toJSON();
  }

  update(id, updatedData) {
    const expenses = this._readFromFile();
    const index = expenses.findIndex(exp => exp.id === id);
    if (index === -1) return null;

    expenses[index] = new Expense({
      id: expenses[index].id,
      amount: updatedData.amount !== undefined ? updatedData.amount : expenses[index].amount,
      category: updatedData.category || expenses[index].category,
      date: updatedData.date || expenses[index].date,
      note: updatedData.note !== undefined ? updatedData.note : expenses[index].note
    });
    
    this._writeToFile(expenses);
    return expenses[index].toJSON();
  }

  delete(id) {
    const expenses = this._readFromFile();
    const index = expenses.findIndex(exp => exp.id === id);
    if (index === -1) return false;

    expenses.splice(index, 1);
    this._writeToFile(expenses);
    return true;
  }
}

export default new ExpenseRepository();