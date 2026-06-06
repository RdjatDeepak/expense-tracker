import React from 'react';

export const SkeletonCard = () => (
  <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 animate-pulse space-y-3">
    <div className="h-4 w-24 bg-slate-200 rounded-sm"></div>
    <div className="h-8 w-36 bg-slate-300 rounded-md"></div>
    <div className="h-3 w-48 bg-slate-100 rounded-sm"></div>
  </div>
);

export const SkeletonRow = () => (
  <tr className="animate-pulse border-b border-slate-100">
    <td className="p-4"><div className="h-4 w-24 bg-slate-200 rounded-md"></div></td>
    <td className="p-4"><div className="h-4 w-16 bg-slate-200 rounded-md"></div></td>
    <td className="p-4"><div className="h-4 w-32 bg-slate-200 rounded-md"></div></td>
    <td className="p-4"><div className="h-4 w-20 bg-slate-200 rounded-md"></div></td>
    <td className="p-4 flex gap-2"><div className="h-8 w-12 bg-slate-200 rounded-md"></div><div className="h-8 w-12 bg-slate-200 rounded-md"></div></td>
  </tr>
);