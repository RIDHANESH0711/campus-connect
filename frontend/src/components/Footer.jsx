import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white">CampusConnect</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            One platform to discover college events, register instantly, and stay connected with campus activities.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/events" className="hover:text-emerald-400 transition">Browse Events</Link></li>
            <li><Link to="/login" className="hover:text-emerald-400 transition">Student Login</Link></li>
            <li><Link to="/register" className="hover:text-emerald-400 transition">Registration</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-emerald-400 cursor-pointer">Technical & Hackathons</li>
            <li className="hover:text-emerald-400 cursor-pointer">Cultural Fests</li>
            <li className="hover:text-emerald-400 cursor-pointer">Sports Tournaments</li>
            <li className="hover:text-emerald-400 cursor-pointer">Workshops & Seminars</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact & Support</h4>
          <p className="text-sm text-slate-400">Campus Events Office, Student Center, Block A</p>
          <p className="text-sm text-slate-400 mt-2">Email: events@campusconnect.edu</p>
          <p className="text-sm text-slate-400">Helpline: +1 (800) 555-0199</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-800 text-xs text-center text-slate-500">
        © 2026 CampusConnect – College Event Management System. All rights reserved. Academic Project SOP Standard.
      </div>
    </footer>
  );
}
