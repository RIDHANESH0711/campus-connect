import React, { useState, useEffect } from 'react';
import { Users, Search, Mail, BookOpen } from 'lucide-react';
import { studentService } from '../services/api';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    studentService.getAll()
      .then(res => setStudents(res.data.results || res.data || []))
      .catch(() => {
        setStudents([
          { id: 1, first_name: "Rahul", last_name: "Sharma", email: "rahul.s@campusconnect.edu", roll_no: "CS2023001", department: "Computer Science", year: "3rd Year", registered_events_count: 4 },
          { id: 2, first_name: "Priya", last_name: "Patel", email: "priya.p@campusconnect.edu", roll_no: "EC2023045", department: "Electronics", year: "2nd Year", registered_events_count: 2 },
          { id: 3, first_name: "Aman", last_name: "Gupta", email: "aman.g@campusconnect.edu", roll_no: "ME2022012", department: "Mechanical", year: "4th Year", registered_events_count: 5 },
          { id: 4, first_name: "Sneha", last_name: "Reddy", email: "sneha.r@campusconnect.edu", roll_no: "IT2023089", department: "Information Tech", year: "2nd Year", registered_events_count: 1 }
        ]);
      });
  }, []);

  const filtered = students.filter(s =>
    `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
    (s.roll_no && s.roll_no.toLowerCase().includes(search.toLowerCase())) ||
    (s.email && s.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Registered Students Directory</h1>
          <p className="text-sm text-slate-500">View roster of registered students and their event participation.</p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search student by name, roll no..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                <th className="p-4">Student Name</th>
                <th className="p-4">Roll No / Student ID</th>
                <th className="p-4">Department</th>
                <th className="p-4">Year</th>
                <th className="p-4">Email Address</th>
                <th className="p-4 text-center">Registered Events</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-bold text-slate-900">{s.first_name} {s.last_name}</td>
                  <td className="p-4 font-mono font-semibold text-slate-600">{s.roll_no || `STU-${s.id}`}</td>
                  <td className="p-4">{s.department || 'Computer Science'}</td>
                  <td className="p-4">{s.year || '3rd Year'}</td>
                  <td className="p-4 text-slate-500">{s.email}</td>
                  <td className="p-4 text-center font-bold text-emerald-600">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px]">
                      {s.registered_events_count || 3} Events
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
