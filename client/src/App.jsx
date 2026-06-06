import React, { useState, useEffect } from 'react';
import { expenseApi } from './api/expenseApi';
import SummaryPanel from './dashboard/SummaryPanel';
import ExpenseForm from './dashboard/ExpenseForm';
import ExpenseTable from './dashboard/ExpenseTable';
import AnalyticsView from './dashboard/AnalyticsView';
import { Wallet, LayoutDashboard, PieChart as ChartIcon, ArrowUpRight, ArrowDownLeft, Landmark } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' or 'analytics'
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ totalSpentThisMonth: 0, totalIncomeThisMonth: 0, highestSingleExpense: 0, categoryTotals: {} });
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchCoreMetrics = async () => {
    try {
      setLoading(true);
      const list = await expenseApi.getExpenses();
      const metrics = await expenseApi.getSummary();
      setExpenses(list);
      setSummary(metrics);
    } catch (err) {
      console.error("Data synchronization fault:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoreMetrics();
  }, []);

  const handleFormSubmit = async (payload) => {
    try {
      if (editingExpense?.id) {
        await expenseApi.updateExpense(editingExpense.id, payload);
        setEditingExpense(null);
      } else {
        await expenseApi.createExpense(payload);
      }
      fetchCoreMetrics();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeletion = async (id) => {
    try {
      await expenseApi.deleteExpense(id);
      fetchCoreMetrics();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased font-sans pb-12">
      {/* Navigation App Bar Layout */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs"><Wallet className="w-5 h-5"/></div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-800">LedgerStream <span className="text-xs font-medium text-slate-400">Rupee Core</span></h1>
          </div>
          {/* Dynamic Interactive Page Switchers */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60">
            <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === 'dashboard' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}>
              <LayoutDashboard className="w-3.5 h-3.5"/> Transactions
            </button>
            <button onClick={() => setActiveTab('analytics')} className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === 'analytics' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}>
              <ChartIcon className="w-3.5 h-3.5"/> Advanced Charts
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-8">
        {/* Dynamic Financial Summary Cards Portfolio */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><ArrowDownLeft className="w-5 h-5"/></div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Monthly Income</p>
              <h3 className="text-xl font-black text-slate-800">₹{summary.totalIncomeThisMonth?.toLocaleString('en-IN') || '0'}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><ArrowUpRight className="w-5 h-5"/></div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Monthly Expenses</p>
              <h3 className="text-xl font-black text-slate-800">₹{summary.totalSpentThisMonth?.toLocaleString('en-IN') || '0'}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Landmark className="w-5 h-5"/></div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Net Savings Balance</p>
              <h3 className={`text-xl font-black ${(summary.totalIncomeThisMonth - summary.totalSpentThisMonth) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                ₹{(summary.totalIncomeThisMonth - summary.totalSpentThisMonth).toLocaleString('en-IN')}
              </h3>
            </div>
          </div>
        </div>

        {/* Dynamic Multi-page Segment Routing Switch Engine */}
        {activeTab === 'dashboard' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <ExpenseForm onSubmit={handleFormSubmit} editingExpense={editingExpense} setEditingExpense={setEditingExpense} />
            </div>
            <div className="lg:col-span-2">
              <ExpenseTable expenses={expenses} onEdit={setEditingExpense} onDelete={handleDeletion} />
            </div>
          </div>
        ) : (
          <AnalyticsView expenses={expenses} />
        )}
      </main>
    </div>
  );
}