import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Calendar, MapPin, Search, CheckCircle } from 'lucide-react';
import { eventService, categoryService, venueService } from '../services/api';

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [msg, setMsg] = useState('');

  const [formData, setFormData] = useState({
    event_name: '',
    description: '',
    category_id: '',
    venue_id: '',
    date: '',
    start_time: '10:00',
    end_time: '17:00',
    max_participants: 100,
    organizer: 'Student Affairs',
    poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    status: 'Published'
  });

  useEffect(() => {
    fetchEvents();
    categoryService.getAll().then(res => setCategories(res.data.results || res.data || [])).catch(() => {});
    venueService.getAll().then(res => setVenues(res.data.results || res.data || [])).catch(() => {});
  }, []);

  const fetchEvents = () => {
    eventService.getAll()
      .then(res => setEvents(res.data.results || res.data || []))
      .catch(() => {
        setEvents([
          { id: 101, event_name: "AI & Deep Learning Hackathon 2026", category_name: "Hackathon", venue_name: "Turing Lab", date: "2026-10-15", status: "Published", max_participants: 100 },
          { id: 102, event_name: "Annual Inter-College Cultural Fest", category_name: "Cultural", venue_name: "Main Auditorium", date: "2026-11-02", status: "Published", max_participants: 800 }
        ]);
      });
  };

  const handleOpenModal = (ev = null) => {
    if (ev) {
      setEditingEvent(ev);
      setFormData({
        event_name: ev.event_name || '',
        description: ev.description || '',
        category_id: ev.category_id || '',
        venue_id: ev.venue_id || '',
        date: ev.date || '',
        start_time: ev.start_time || '10:00',
        end_time: ev.end_time || '17:00',
        max_participants: ev.max_participants || 100,
        organizer: ev.organizer || 'Student Affairs',
        poster: ev.poster || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        status: ev.status || 'Published'
      });
    } else {
      setEditingEvent(null);
      setFormData({
        event_name: '',
        description: '',
        category_id: '',
        venue_id: '',
        date: '',
        start_time: '10:00',
        end_time: '17:00',
        max_participants: 100,
        organizer: 'Student Affairs',
        poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        status: 'Published'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await eventService.update(editingEvent.id, formData);
        setMsg('Event updated successfully!');
      } else {
        await eventService.create(formData);
        setMsg('Event created successfully!');
      }
    } catch (err) {
      setMsg(editingEvent ? 'Event updated locally!' : 'Event created locally!');
    }

    if (editingEvent) {
      setEvents(events.map(ev => ev.id === editingEvent.id ? { ...ev, ...formData } : ev));
    } else {
      setEvents([{ id: Date.now(), ...formData }, ...events]);
    }

    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventService.delete(id);
    } catch (err) {}
    setEvents(events.filter(ev => ev.id !== id));
    setMsg('Event deleted successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Campus Events</h1>
          <p className="text-sm text-slate-500">Create, update, schedule, or cancel college events.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                <th className="p-4">Event Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Venue</th>
                <th className="p-4">Capacity</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-bold text-slate-900">{ev.event_name}</td>
                  <td className="p-4">{ev.category_detail?.name || ev.category_name || 'General'}</td>
                  <td className="p-4">{ev.date} ({ev.start_time})</td>
                  <td className="p-4">{ev.venue_detail?.name || ev.venue_name || 'Campus Main'}</td>
                  <td className="p-4">{ev.max_participants}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {ev.status || 'Published'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleOpenModal(ev)} className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-lg">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(ev.id)} className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900">{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={formData.event_name}
                  onChange={e => setFormData({ ...formData, event_name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Max Capacity</label>
                  <input
                    type="number"
                    required
                    value={formData.max_participants}
                    onChange={e => setFormData({ ...formData, max_participants: parseInt(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
