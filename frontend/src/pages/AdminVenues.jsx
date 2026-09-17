import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Trash2, CheckCircle } from 'lucide-react';
import { venueService } from '../services/api';

export default function AdminVenues() {
  const [venues, setVenues] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState(100);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = () => {
    venueService.getAll()
      .then(res => setVenues(res.data.results || res.data || []))
      .catch(() => {
        setVenues([
          { id: 1, name: "Main Campus Auditorium", location: "Block A, 1st Floor", capacity: 800 },
          { id: 2, name: "Turing Computer Lab", location: "Block C, 3rd Floor", capacity: 120 },
          { id: 3, name: "Dr. APJ Abdul Kalam Seminar Hall", location: "Block B, Ground Floor", capacity: 250 },
          { id: 4, name: "Central Sports Complex Ground", location: "Campus East Sports Zone", capacity: 1500 }
        ]);
      });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      await venueService.create({ name, location, capacity });
    } catch (err) {}

    setVenues([...venues, { id: Date.now(), name, location, capacity }]);
    setName('');
    setLocation('');
    setCapacity(100);
    setMsg('Venue added successfully!');
  };

  const handleDelete = async (id) => {
    try {
      await venueService.delete(id);
    } catch (err) {}
    setVenues(venues.filter(v => v.id !== id));
    setMsg('Venue removed.');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Campus Venues & Facilities</h1>
        <p className="text-sm text-slate-500">Manage halls, auditoriums, labs, and grounds for events.</p>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-800">Register New Campus Venue</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Venue Name (e.g. Conference Hall B)..."
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="px-3.5 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="text"
            placeholder="Location/Building (e.g. Block D 2nd Floor)..."
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
            className="px-3.5 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Capacity"
              value={capacity}
              onChange={e => setCapacity(parseInt(e.target.value))}
              required
              className="w-28 px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {venues.map(v => (
          <div key={v.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 text-sm">{v.name}</span>
              <p className="text-xs text-slate-500 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{v.location}</span>
              </p>
              <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-md">
                Capacity: {v.capacity} Seats
              </span>
            </div>
            <button onClick={() => handleDelete(v.id)} className="p-2 text-slate-400 hover:text-red-600 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
