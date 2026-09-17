import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { Search } from 'lucide-react';
import { eventService, categoryService } from '../services/api';

export default function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    eventService.getAll()
      .then(res => setEvents(res.data.results || res.data || []))
      .catch(() => {
        setEvents([
          {
            id: 101,
            event_name: "AI & Deep Learning Hackathon 2026",
            description: "A 24-hour intensive product build sprint focusing on generative AI and healthcare applications.",
            category_detail: { name: "Hackathon" },
            category_id: 6,
            date: "2026-10-15",
            start_time: "09:00",
            max_participants: 100,
            registered_count: 45,
            poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
            status: "Published"
          },
          {
            id: 102,
            event_name: "Annual Inter-College Cultural Fest 'Resonance'",
            description: "Join us for 3 days of music, dance, battle of the bands, drama, and food stalls.",
            category_detail: { name: "Cultural" },
            category_id: 3,
            date: "2026-11-02",
            start_time: "10:00",
            max_participants: 800,
            registered_count: 320,
            poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
            status: "Published"
          },
          {
            id: 103,
            event_name: "Cybersecurity & Ethical Hacking Masterclass",
            description: "Learn defensive cybersecurity, vulnerability research, and CTF strategy.",
            category_detail: { name: "Workshop" },
            category_id: 2,
            date: "2026-09-28",
            start_time: "14:00",
            max_participants: 200,
            registered_count: 110,
            poster: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
            status: "Published"
          }
        ]);
      });

    categoryService.getAll()
      .then(res => setCategories(res.data.results || res.data || []))
      .catch(() => {
        setCategories([
          { id: 1, name: "Technical" },
          { id: 2, name: "Workshop" },
          { id: 3, name: "Cultural" },
          { id: 4, name: "Sports" },
          { id: 6, name: "Hackathon" }
        ]);
      });
  }, []);

  const filteredEvents = events.filter(ev => {
    const matchSearch = ev.event_name.toLowerCase().includes(searchQuery.toLowerCase()) || ev.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'All' || ev.category_id === parseInt(selectedCategory);
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Explore Campus Events</h1>
        <p className="text-sm text-slate-500">Discover upcoming workshops, technical hackathons, cultural fests, and sports matches.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input 
            type="text" 
            placeholder="Search events by name or topic..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="flex gap-3">
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-3 py-2.5 border border-slate-300 rounded-xl text-sm bg-white">
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEvents.map(ev => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </div>
    </div>
  );
}
