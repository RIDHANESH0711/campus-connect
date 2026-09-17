import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Ticket, Star, User, Layers, MapPin, Users, MessageSquare, BarChart3, Settings } from 'lucide-react';

export default function Sidebar({ role = 'STUDENT' }) {
  const studentLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/events', label: 'Browse Events', icon: Layers },
    { to: '/my-registrations', label: 'My Registrations', icon: Ticket },
    { to: '/calendar', label: 'Event Calendar', icon: Calendar },
    { to: '/feedback', label: 'Feedback', icon: Star },
    { to: '/profile', label: 'Profile Settings', icon: User },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/events', label: 'Events CRUD', icon: Layers },
    { to: '/admin/registrations', label: 'Registrations', icon: Ticket },
    { to: '/admin/students', label: 'Students Roster', icon: Users },
    { to: '/admin/categories', label: 'Categories', icon: Layers },
    { to: '/admin/venues', label: 'Venues', icon: MapPin },
    { to: '/admin/feedback', label: 'Feedback & Ratings', icon: MessageSquare },
  ];

  const links = role === 'ADMIN' ? adminLinks : studentLinks;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <div className="space-y-1">
        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          {role === 'ADMIN' ? 'Admin Portal' : 'Student Menu'}
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin' || link.to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500">
        <span className="font-semibold text-slate-700 block">CampusConnect Academic v1.0</span>
        Production REST API Dual Architecture
      </div>
    </aside>
  );
}
