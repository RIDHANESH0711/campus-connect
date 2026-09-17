import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, LogOut, User, LayoutDashboard, Compass } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">CampusConnect</span>
            <span className="block text-[10px] tracking-wider uppercase font-semibold text-emerald-600">College Event Portal</span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/events" className="text-sm font-medium text-slate-600 hover:text-emerald-600 flex items-center space-x-1.5 transition">
            <Compass className="w-4 h-4" />
            <span>Explore Events</span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${isAdmin ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                {user.role}
              </span>
              <Link 
                to={isAdmin ? '/admin' : '/dashboard'} 
                className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-50 rounded-lg transition flex items-center space-x-1"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm shadow-emerald-600/30 transition">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
