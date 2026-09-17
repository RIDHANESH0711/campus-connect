import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login({ email, password });
      if (user.role === 'ADMIN') navigate('/admin');
      else navigate('/dashboard');
    } catch (err) {
      // Fallback demo auth for frontend testing
      if (email === 'admin@campusconnect.edu') {
        const u = { id: 1, name: "Dr. Sarah Jenkins", email, role: "ADMIN", department: "Dean of Student Affairs" };
        localStorage.setItem('user', JSON.stringify(u));
        localStorage.setItem('token', 'mock-admin-token');
        window.location.href = '/admin';
      } else {
        const u = { id: 201, name: "Alex Rivera", register_number: "CS2026-0892", email, role: "STUDENT", department: "Computer Science", year: "3rd Year" };
        localStorage.setItem('user', JSON.stringify(u));
        localStorage.setItem('token', 'mock-student-token');
        window.location.href = '/dashboard';
      }
    }
  };

  return (
    <div className="py-16 max-w-md mx-auto px-4">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-xs text-slate-500 mt-1">Sign in to your CampusConnect account</p>
        </div>

        <div className="mb-6 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <span className="font-semibold text-slate-700 block">Quick Demo Login:</span>
          <div className="flex space-x-2">
            <button type="button" onClick={() => { setEmail('admin@campusconnect.edu'); setPassword('Admin@123'); }} className="flex-1 py-1.5 bg-emerald-50 text-emerald-700 font-medium rounded border border-emerald-200 hover:bg-emerald-100 transition">
              Fill Admin
            </button>
            <button type="button" onClick={() => { setEmail('alex.rivera@campusconnect.edu'); setPassword('Student@123'); }} className="flex-1 py-1.5 bg-slate-100 text-slate-700 font-medium rounded border border-slate-300 hover:bg-slate-200 transition">
              Fill Student
            </button>
          </div>
        </div>

        {error && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">College Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              placeholder="student@campusconnect.edu"
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
              <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
              <span>Remember me</span>
            </label>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Password reset sent!"); }} className="text-emerald-600 font-semibold hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-emerald-600/30 transition">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-emerald-600 font-bold hover:underline">Register Now</Link>
        </div>
      </div>
    </div>
  );
}
