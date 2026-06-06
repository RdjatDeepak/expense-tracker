import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit } from 'lucide-react';

export default function ExpenseForm({ onSubmit, editingExpense, setEditingExpense }) {
  const [formData, setFormData] = useState({ amount: '', category: 'Food', date: '', note: '', type: 'expense' });
  const [validationError, setValidationError] = useState('');

  const expenseCategories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];
  const incomeCategories = ['Salary', 'Investment', 'Other'];

  useEffect(() => {
    if (editingExpense) {
      setFormData(editingExpense);
    } else {
      setFormData({ amount: '', category: 'Food', date: new Date().toISOString().split('T')[0], note: '', type: 'expense' });
    }
  }, [editingExpense]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setFormData({ ...formData, type: value, category: value === 'expense' ? 'Food' : 'Salary' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setValidationError('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(formData.amount) <= 0 || isNaN(formData.amount)) {
      return setValidationError('Amount must be positive.');
    }
    onSubmit(formData);
    setFormData({ amount: '', category: formData.type === 'expense' ? 'Food' : 'Salary', date: new Date().toISOString().split('T')[0], note: '', type: formData.type });
  };

  const activeCategories = formData.type === 'expense' ? expenseCategories : incomeCategories;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-indigo-600"/>
        {editingExpense ? 'Modify Transaction' : 'Record Transaction'}
      </h3>
      
      {validationError && <div className="p-3 mb-4 text-xs font-medium bg-rose-50 text-rose-600 rounded-xl">{validationError}</div>}

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" type="button" onClick={() => handleInputChange({ target: { name: 'type', value: 'expense' } })} className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${formData.type === 'expense' ? 'bg-rose-50 border-2 border-rose-500 text-rose-700' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>Debit (Expense)</button>
            <button type="button" type="button" onClick={() => handleInputChange({ target: { name: 'type', value: 'income' } })} className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${formData.type === 'income' ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-700' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>Credit (Income)</button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Amount (₹) *</label>
          <input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:border-indigo-500" placeholder="0.00" required />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Category Group *</label>
          <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-800 font-medium focus:outline-hidden">
            {activeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date *</label>
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden" required />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Note</label>
          <input type="text" name="note" value={formData.note} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden" placeholder="Transaction context..." />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded-xl transition-all cursor-pointer">Save Entry</button>
          {editingExpense && (
            <button type="button" onClick={() => setEditingExpense(null)} className="bg-slate-100 p-3 rounded-xl cursor-pointer">Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
}