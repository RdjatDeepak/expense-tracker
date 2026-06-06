import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Calendar, Filter } from 'lucide-react';

export default function AnalyticsView({ expenses }) {
  const [catFilter, setCatFilter] = useState('All');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  // Process filters
  const dataPool = expenses.filter(item => {
    if (catFilter !== 'All' && item.category !== catFilter) return false;
    if (start && item.date < start) return false;
    if (end && item.date > end) return false;
    return true;
  });

  // Structural aggregates for charts
  const categoryDataMap = {};
  dataPool.forEach(item => {
    if (item.type === 'expense') {
      categoryDataMap[item.category] = (categoryDataMap[item.category] || 0) + item.amount;
    }
  });

  const pieData = Object.keys(categoryDataMap).map(key => ({ name: key, value: categoryDataMap[key] }));
  const COLORS = ['#6366f1', '#f59e0b', '#ec4899', '#3b82f6', '#10b981'];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Filtering Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-slate-700"><Filter className="w-4 h-4 text-indigo-500"/> Advanced Analytics Filters</div>
        <div className="flex flex-wrap gap-2 items-center text-xs">
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="p-2 border border-slate-200 rounded-lg bg-slate-50 font-medium">
            {['All', 'Food', 'Transport', 'Bills', 'Entertainment', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="p-2 border border-slate-200 rounded-lg bg-slate-50 font-medium" />
          <span className="text-slate-400">to</span>
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="p-2 border border-slate-200 rounded-lg bg-slate-50 font-medium" />
        </div>
      </div>

      {/* Grid Dashboard Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Comprehensive Round Pie Allocation Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
          <h4 className="text-base font-bold text-slate-700 mb-2">Category Breakdown (Pie Visualization)</h4>
          <p className="text-xs text-slate-400 mb-6">Proportional metric dispersion model</p>
          <div className="h-64 flex items-center justify-center">
            {pieData.length === 0 ? (
              <p className="text-sm text-slate-400">No debit metrics recorded.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                    {pieData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [`₹${v}`, 'Spent']} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="flex flex-wrap gap-4 justify-center text-xs mt-2">
            {pieData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: Transaction History Log List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col">
          <h4 className="text-base font-bold text-slate-700 mb-4">Historical Audit Log</h4>
          <div className="overflow-y-auto max-h-72 flex-1 space-y-3 pr-1">
            {dataPool.map(item => (
              <div key={item.id} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between text-sm">
                <div>
                  <p className="font-bold text-slate-700">{item.category}</p>
                  <p className="text-xs text-slate-400">{item.note || 'No description reference'}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${item.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {item.type === 'income' ? '+' : '-'} ₹{item.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}