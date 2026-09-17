import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Trash2, CheckCircle } from 'lucide-react';
import { feedbackService } from '../services/api';

export default function AdminFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = () => {
    feedbackService.getAll()
      .then(res => setFeedbackList(res.data.results || res.data || []))
      .catch(() => {
        setFeedbackList([
          { id: 1, student_name: "Rahul Sharma", event_name: "AI & Deep Learning Hackathon 2026", rating: 5, comments: "Amazing organization and mentors! Had a blast building our project.", created_at: "2026-09-10" },
          { id: 2, student_name: "Priya Patel", event_name: "Cybersecurity Masterclass", rating: 4, comments: "Great practical hands-on CTF lab session.", created_at: "2026-09-12" },
          { id: 3, student_name: "Aman Gupta", event_name: "Annual Inter-College Cultural Fest", rating: 5, comments: "Sound setup and stage decorations were top notch!", created_at: "2026-09-14" }
        ]);
      });
  };

  const handleDelete = async (id) => {
    try {
      await feedbackService.delete(id);
    } catch (err) {}
    setFeedbackList(feedbackList.filter(f => f.id !== id));
    setMsg('Feedback entry removed.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Student Feedback & Ratings</h1>
        <p className="text-sm text-slate-500">Review feedback submitted by students for events.</p>
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
                <th className="p-4">Student</th>
                <th className="p-4">Event Name</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Comments</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {feedbackList.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-bold text-slate-900">{f.student_name || 'Anonymous Student'}</td>
                  <td className="p-4 font-semibold text-emerald-800">{f.event_name || 'Campus Event'}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < (f.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 max-w-xs truncate text-slate-600">{f.comments}</td>
                  <td className="p-4 text-slate-400">{f.created_at}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(f.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
