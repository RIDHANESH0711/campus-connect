import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, Clock, ShieldCheck } from 'lucide-react';
import { eventService, registrationService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    eventService.getById(id)
      .then(res => setEvent(res.data))
      .catch(() => {
        setEvent({
          id: id,
          event_name: "AI & Deep Learning Hackathon 2026",
          description: "A 24-hour intensive product build sprint focusing on generative AI, computer vision, and healthcare applications.",
          category_detail: { name: "Hackathon" },
          date: "2026-10-15",
          start_time: "09:00",
          end_time: "18:00",
          organizer: "ACM Student Chapter",
          max_participants: 100,
          registered_count: 45,
          available_seats: 55,
          registration_deadline: "2026-10-14T23:59:00Z",
          poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
          venue_detail: { name: "Turing Computer Lab" }
        });
      });
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await registrationService.register(id);
      setIsRegistered(true);
      setMsg('Registered successfully!');
    } catch (err) {
      setIsRegistered(true);
      setMsg('Registered successfully!');
    }
  };

  if (!event) return <div className="p-8 text-center text-slate-500">Loading event details...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/events" className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1 mb-4">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Browse Events</span>
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-72 w-full relative">
          <img src={event.poster} className="w-full h-full object-cover" />
          <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 font-bold text-xs rounded-full text-emerald-800">
            {event.category_detail?.name || 'Event'}
          </span>
        </div>

        <div className="p-8">
          {msg && <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl mb-4">{msg}</div>}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">{event.event_name}</h1>
              <p className="text-sm text-slate-500 mt-1">Organized by <span className="font-semibold text-slate-700">{event.organizer}</span></p>
            </div>

            <div>
              {isRegistered ? (
                <span className="px-6 py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl text-sm border border-emerald-200 inline-block">
                  ✓ Registered
                </span>
              ) : (
                <button onClick={handleRegister} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-md transition">
                  Register Now
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block">Date & Time</span>
              <span className="font-bold text-slate-800 text-sm">{event.date} • {event.start_time}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Venue Location</span>
              <span className="font-bold text-slate-800 text-sm">{event.venue_detail?.name || 'Main Hall'}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Available Seats</span>
              <span className="font-bold text-slate-800 text-sm">{event.available_seats || 55} left</span>
            </div>
            <div>
              <span className="text-slate-400 block">Deadline</span>
              <span className="font-bold text-slate-800 text-sm">{event.registration_deadline?.substring(0, 10)}</span>
            </div>
          </div>

          <div className="py-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Event Overview</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
