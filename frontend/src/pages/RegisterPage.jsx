import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    register_number: '',
    email: '',
    phone: '',
    department: 'Computer Science & Engineering',
    year: '1st Year',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      navigate('/login');
    }
  };

  return (
    <div className="py-12 max-w-xl mx-auto px-4">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-1">Student Registration</h2>
        <p className="text-xs text-slate-500 text-center mb-6">Create your campus event participant account</p>

        {error && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Register Number</label>
              <input type="text" value={formData.register_number} onChange={e => setFormData({...formData, register_number: e.target.value})} required className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500" placeholder="CS2026-9901" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">College Email</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500" placeholder="john@campusconnect.edu" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500" placeholder="+1 (555) 000-0000" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
              <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500">
                <option>Computer Science & Engineering</option>
                <option>Electronics & Communication</option>
                <option>Mechanical Engineering</option>
                <option>Civil Engineering</option>
                <option>Biotechnology</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Year of Study</label>
              <select value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500">
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
              <input type="password" value={formData.confirm_password} onChange={e => setFormData({...formData, confirm_password: e.target.value})} required className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-md transition mt-4">
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
}
