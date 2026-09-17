import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Ticket, Users, MapPin, MessageSquare, Plus, ArrowUpRight, TrendingUp } from 'lucide-react';
import { eventService, registrationService, studentService, venueService, feedbackService } from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    events: 12,
    registrations: 148,
    students: 320,
    venues: 8,
    feedback: 24
  });

  useEffect(() => {
    Promise.all([
      eventService.getAll().catch(() => null),
      registrationService.getAll().catch(() => null),
      studentService.getAll().catch(() => null),
      venueService.getAll().catch(() => null),
      feedbackService.getAll().catch(() => null)
    ]).then(([ev, reg, stu, ven, fb]) => {
      setStats({
        events: ev?.data?.count || ev?.data?.length || 12,
        registrations: reg?.data?.count || reg?.data?.length || 148,
        students: stu?.data?.count || stu?.data?.length || 320,
        venues: ven?.data?.count || ven?.data?.length || 8,
        feedback: fb?.data?.count || fb?.data?.length || 24
      });
    });
  }, []);

  const cards = [
    { title: 'Total Events', count: stats.events, icon: Layers, color: 'from-blue-500 to-indigo-600', link: '/admin/events' },
    { title: 'Total Registrations', count: stats.registrations, icon: Ticket, color: 'from-emerald-500 to-teal-600', link: '/admin/registrations' },
    { title: 'Active Students', count: stats.students, icon: Users, color: 'from-purple-500 to-pink-600', link: '/admin/students' },
    { title: 'Campus Venues', count: stats.venues, icon: MapPin, color: 'from-amber-500 to-orange-600', link: '/admin/venues' },
    { title: 'Feedback & Reviews', count: stats.feedback, icon: MessageSquare, color: 'from-rose-500 to-red-600', link: '/admin/feedback' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Administrator Control Center</h1>
          <p className="text-sm text-slate-500">Monitor campus events, registrations, venues, and student activities.</p>
        </div>
        <Link
          to="/admin/events"
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={i}
              to={c.link}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex justify-between items-start group"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{c.title}</span>
                <div className="text-3xl font-black text-slate-900">{c.count}</div>
                <div className="flex items-center space-x-1 text-[11px] font-semibold text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Manage in Portal</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${c.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition duration-300`}>
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800">Quick Administrative Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/events" className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition">
            <h3 className="font-bold text-sm text-slate-900">Manage Events</h3>
            <p className="text-xs text-slate-500 mt-1">Publish, schedule, edit venue allocations and dates.</p>
          </Link>
          <Link to="/admin/registrations" className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition">
            <h3 className="font-bold text-sm text-slate-900">Approve Registrations</h3>
            <p className="text-xs text-slate-500 mt-1">Review student registrations and issue approval passes.</p>
          </Link>
          <Link to="/admin/venues" className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition">
            <h3 className="font-bold text-sm text-slate-900">Venue Bookings</h3>
            <p className="text-xs text-slate-500 mt-1">Check auditorium, lab and ground availability.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
