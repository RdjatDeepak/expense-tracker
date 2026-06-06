class Expense {
  constructor({ id, amount, category, date, note, type }) {
    this.id = id || null;
    this.amount = parseFloat(amount);
    this.category = category;
    this.date = date; 
    this.note = note || '';
    this.type = type || 'expense'; // 'expense' or 'income'
    this.createdAt = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      amount: this.amount,
      category: this.category,
      date: this.date,
      note: this.note,
      type: this.type,
      createdAt: this.createdAt
    };
  }
}

export default Expense;