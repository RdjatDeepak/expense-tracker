import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, TrendingUp, Award } from 'lucide-react';

export default function SummaryPanel({ summary }) {
  const { totalSpentThisMonth, highestSingleExpense, categoryTotals } = summary;

  // Transform object dictionary into structural data array for Recharts engine
  const chartData = Object.keys(categoryTotals || {}).map(key => ({
    name: key,
    value: categoryTotals[key]
  }));

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Metric Cards Portfolio */}
      <div className="lg:col-span-1 space-y-4 flex flex-col justify-between">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><DollarSign className="w-6 h-6"/></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Spent This Month</p>
            <h3 className="text-2xl font-bold text-slate-800">${totalSpentThisMonth?.toLocaleString() || '0'}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><TrendingUp className="w-6 h-6"/></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Highest Single Expense</p>
            <h3 className="text-2xl font-bold text-slate-800">${highestSingleExpense?.toLocaleString() || '0'}</h3>
          </div>
        </div>
      </div>

      {/* Recharts Analytics Visualization Pod */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <h4 className="text-base font-semibold text-slate-700 mb-4">Category Allocation Summary</h4>
        <div className="h-44 w-full">
          {chartData.every(item => item.value === 0) ? (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm">No recorded inputs metrics for this month.</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} formatter={(value) => [`$${value}`, 'Total Spent']} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}