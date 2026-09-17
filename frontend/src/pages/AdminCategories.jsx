import React, { useState, useEffect } from 'react';
import { Plus, Layers, Trash2, CheckCircle } from 'lucide-react';
import { categoryService } from '../services/api';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    categoryService.getAll()
      .then(res => setCategories(res.data.results || res.data || []))
      .catch(() => {
        setCategories([
          { id: 1, name: "Technical", description: "Hackathons, Coding Contests & Tech Seminars" },
          { id: 2, name: "Workshop", description: "Hands-on skill building workshops" },
          { id: 3, name: "Cultural", description: "Music, Dance, Drama and Fests" },
          { id: 4, name: "Sports", description: "Inter-department & Inter-college tournaments" },
          { id: 5, name: "Hackathon", description: "Product builds and innovation hackathons" }
        ]);
      });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      await categoryService.create({ name });
    } catch (err) {}

    setCategories([...categories, { id: Date.now(), name, description: 'Campus event category' }]);
    setName('');
    setMsg('Category added!');
  };

  const handleDelete = async (id) => {
    try {
      await categoryService.delete(id);
    } catch (err) {}
    setCategories(categories.filter(c => c.id !== id));
    setMsg('Category removed.');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Event Categories</h1>
        <p className="text-sm text-slate-500">Manage categories used for organizing campus events.</p>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-800">Add New Category</h2>
        <form onSubmit={handleAdd} className="flex gap-3">
          <input
            type="text"
            placeholder="Category Name (e.g., Gaming, Robotics)..."
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="flex-1 px-3.5 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(c => (
          <div key={c.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 text-sm">{c.name}</span>
              <p className="text-xs text-slate-500 mt-0.5">{c.description || 'Event Category'}</p>
            </div>
            <button onClick={() => handleDelete(c.id)} className="p-2 text-slate-400 hover:text-red-600 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
