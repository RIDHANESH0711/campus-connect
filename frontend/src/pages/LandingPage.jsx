import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Calendar, MapPin, Users, Award, ShieldCheck } from 'lucide-react';
import EventCard from '../components/EventCard';
import { eventService } from '../services/api';

export default function LandingPage() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventService.getFeatured()
      .then(res => setFeaturedEvents(res.data.results || res.data || []))
      .catch(() => {
        setFeaturedEvents([
          {
            id: 101,
            event_name: "AI & Deep Learning Hackathon 2026",
            description: "A 24-hour intensive product build sprint focusing on generative AI and healthcare applications.",
            category_detail: { name: "Hackathon" },
            date: "2026-10-15",
            start_time: "09:00",
            max_participants: 100,
            registered_count: 45,
            poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
            venue_detail: { name: "Turing Computer Lab" }
          },
          {
            id: 102,
            event_name: "Annual Inter-College Cultural Fest 'Resonance'",
            description: "Join us for 3 days of music, dance, battle of the bands, drama, and food stalls.",
            category_detail: { name: "Cultural" },
            date: "2026-11-02",
            start_time: "10:00",
            max_participants: 800,
            registered_count: 320,
            poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
            venue_detail: { name: "Open Air Theatre" }
          },
          {
            id: 103,
            event_name: "Cybersecurity & Ethical Hacking Masterclass",
            description: "Learn defensive cybersecurity, vulnerability research, and CTF strategy.",
            category_detail: { name: "Workshop" },
            date: "2026-09-28",
            start_time: "14:00",
            max_participants: 200,
            registered_count: 110,
            poster: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
            venue_detail: { name: "Mini Seminar Hall 1" }
          }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 py-20 lg:py-28 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-6 border border-emerald-200">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Official Campus Events Portal</span>
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Discover. Register. <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Participate.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            One platform to discover college events, register instantly, and stay connected with campus activities.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/events" className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all flex items-center space-x-2">
              <span>Explore Events</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl border border-slate-200 shadow-sm transition-all">
              Student Login
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-3xl font-extrabold text-emerald-600">50+</div>
              <div className="text-xs font-medium text-slate-500 uppercase mt-1">Annual Events</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-3xl font-extrabold text-slate-900">4,500+</div>
              <div className="text-xs font-medium text-slate-500 uppercase mt-1">Active Students</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-3xl font-extrabold text-emerald-600">12</div>
              <div className="text-xs font-medium text-slate-500 uppercase mt-1">Campus Venues</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-3xl font-extrabold text-slate-900">98%</div>
              <div className="text-xs font-medium text-slate-500 uppercase mt-1">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Upcoming Events</h2>
            <p className="text-sm text-slate-500 mt-1">Handpicked workshops, hackathons, and cultural fests happening soon.</p>
          </div>
          <Link to="/events" className="mt-4 md:mt-0 text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1">
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEvents.map(ev => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      </section>
    </div>
  );
}
