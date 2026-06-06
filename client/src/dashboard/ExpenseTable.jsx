import React from 'react';
import { Trash2, Edit3, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs uppercase tracking-wider">
            <th className="p-4">Details</th>
            <th className="p-4">Category</th>
            <th className="p-4">Note</th>
            <th className="p-4">Amount</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id} className="border-b border-slate-100 hover:bg-slate-50/50 text-sm">
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {exp.type === 'income' ? <ArrowDownLeft className="text-emerald-500 w-4 h-4"/> : <ArrowUpRight className="text-rose-500 w-4 h-4"/>}
                  <span className="font-semibold text-slate-700">{new Date(exp.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              </td>
              <td className="p-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${exp.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>{exp.category}</span>
              </td>
              <td className="p-4 text-slate-500 truncate max-w-xs">{exp.note || '-'}</td>
              <td className={`p-4 font-bold ${exp.type === 'income' ? 'text-emerald-600' : 'text-slate-800'}`}>
                {exp.type === 'income' ? '+' : '-'} ₹{exp.amount.toLocaleString('en-IN')}
              </td>
              <td className="p-4 text-center flex justify-center gap-1">
                <button onClick={() => onEdit(exp)} className="p-2 text-slate-400 hover:text-indigo-600 cursor-pointer"><Edit3 className="w-4 h-4"/></button>
                <button onClick={() => window.confirm('Purge entry?') && onDelete(exp.id)} className="p-2 text-slate-400 hover:text-rose-600 cursor-pointer"><Trash2 className="w-4 h-4"/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}