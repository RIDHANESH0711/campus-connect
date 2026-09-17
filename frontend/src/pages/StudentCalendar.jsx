import React from 'react';

export default function StudentCalendar() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Campus Event Calendar</h1>
      <p className="text-xs text-slate-500 mb-6">Interactive view of upcoming campus events and your registered schedules</p>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-7 gap-2 text-center font-bold text-xs text-slate-400 uppercase mb-4">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
        <div className="grid grid-cols-7 gap-2 text-xs">
          {Array.from({ length: 31 }, (_, i) => {
            const dayNum = i + 1;
            return (
              <div key={i} className="min-h-[90px] p-2 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                <span className="font-bold text-slate-700">{dayNum}</span>
                {dayNum === 15 && (
                  <div className="p-1 bg-emerald-600 text-white rounded text-[9px] font-semibold truncate">
                    AI Hackathon
                  </div>
                )}
                {dayNum === 28 && (
                  <div className="p-1 bg-blue-600 text-white rounded text-[9px] font-semibold truncate">
                    CyberSec Class
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
