import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import Badge from './Badge';

export default function EventCard({ event, isRegistered = false }) {
  const seatsLeft = event.max_participants - (event.registered_count || 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition group flex flex-col justify-between">
      <div>
        <div className="relative h-44 overflow-hidden bg-slate-100">
          <img 
            src={event.poster || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"} 
            alt={event.event_name} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          <span className="absolute top-3 right-3">
            <Badge variant="emerald">{event.category_detail?.name || event.category || 'Event'}</Badge>
          </span>
        </div>

        <div className="p-5">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition line-clamp-1">
            {event.event_name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {event.description}
          </p>

          <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3 mt-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>{event.date} at {event.start_time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="truncate">{event.venue_detail?.name || event.organizer}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Seats: <strong className="text-slate-800">{seatsLeft} left</strong> / {event.max_participants}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <Link 
          to={`/events/${event.id}`}
          className={`w-full py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-center space-x-1.5 ${
            isRegistered 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/30'
          }`}
        >
          <span>{isRegistered ? 'Registered • View Details' : 'View Details & Register'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
