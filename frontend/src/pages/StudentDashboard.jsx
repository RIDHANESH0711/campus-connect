import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Ticket, Calendar, CheckCircle, Compass, Star, User, Search } from 'lucide-react';
import { registrationService } from '../services/api';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    registrationService.getAll()
      .then(res => setRegistrations(res.data.results || res.data || []))
      .catch(() => {
        setRegistrations([
          {
            id: 301,
            event_name: "AI & Deep Learning Hackathon 2026",
            event_detail: { poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80", date: "2026-10-15", start_time: "09:00" },
            status: "Approved"
          },
          {
            id: 302,
            event_name: "Annual Inter-College Cultural Fest 'Resonance'",
            event_detail: { poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80", date: "2026-11-02", start_time: "10:00" },
            status: "Registered"
          }
        ]);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name || 'Student'}! 👋</h1>
          <p className="text-sm text-slate-500 mt-0.5">{user?.department || 'Department'} • {user?.register_number || 'CS2026-0892'}</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link to="/events" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition flex items-center space-x-1.5">
            <Compass className="w-4 h-4" />
            <span>Browse Events</span>
          </Link>
          <Link to="/my-registrations" className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition">
            My Registrations
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{registrations.length}</div>
            <div className="text-xs text-slate-500 font-medium uppercase">Total Registrations</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{registrations.filter(r => r.status === 'Registered' || r.status === 'Approved').length}</div>
            <div className="text-xs text-slate-500 font-medium uppercase">Upcoming Events</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{registrations.filter(r => r.status === 'Completed').length}</div>
            <div className="text-xs text-slate-500 font-medium uppercase">Completed Events</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Your Upcoming Registered Events</h3>
            <Link to="/calendar" className="text-xs font-semibold text-emerald-600 hover:underline">View Calendar</Link>
          </div>

          <div className="space-y-3">
            {registrations.map(reg => (
              <div key={reg.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={reg.event_detail?.poster || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{reg.event_name || reg.event_detail?.event_name}</h4>
                    <div className="text-xs text-slate-500 mt-0.5">{reg.event_detail?.date} at {reg.event_detail?.start_time}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                      {reg.status}
                    </span>
                  </div>
                </div>
                <Link to={`/events/${reg.event_id || reg.id}`} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold">
                  Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Quick Navigation</h3>
            <div className="space-y-2 text-xs">
              <Link to="/events" className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-medium flex items-center space-x-2 transition">
                <Search className="w-4 h-4" />
                <span>Search All Events</span>
              </Link>
              <Link to="/calendar" className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-medium flex items-center space-x-2 transition">
                <Calendar className="w-4 h-4" />
                <span>My Schedule Calendar</span>
              </Link>
              <Link to="/feedback" className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-medium flex items-center space-x-2 transition">
                <Star className="w-4 h-4" />
                <span>Submit Event Feedback</span>
              </Link>
              <Link to="/profile" className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-medium flex items-center space-x-2 transition">
                <User className="w-4 h-4" />
                <span>View / Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
