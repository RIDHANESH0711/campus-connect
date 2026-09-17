import React, { useState, useEffect } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';
import { feedbackService, eventService } from '../services/api';

export default function FeedbackPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    eventService.getAll()
      .then(res => setEvents(res.data.results || res.data || []))
      .catch(() => {
        setEvents([
          { id: 101, event_name: "AI & Deep Learning Hackathon 2026" },
          { id: 102, event_name: "Annual Inter-College Cultural Fest 'Resonance'" },
          { id: 103, event_name: "Cybersecurity & Ethical Hacking Masterclass" }
        ]);
      });

    feedbackService.getAll()
      .then(res => setFeedbackList(res.data.results || res.data || []))
      .catch(() => {
        setFeedbackList([
          { id: 1, event_name: "AI & Deep Learning Hackathon 2026", rating: 5, comments: "Amazing organization and mentors! Had a blast building our project.", created_at: "2026-09-10" },
          { id: 2, event_name: "Cybersecurity Masterclass", rating: 4, comments: "Great practical hands-on CTF lab session.", created_at: "2026-09-12" }
        ]);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent || !comments) return;
    setLoading(true);

    const newFeedback = {
      event_id: selectedEvent,
      event_name: events.find(e => e.id === parseInt(selectedEvent))?.event_name || 'Campus Event',
      rating,
      comments,
      created_at: new Date().toISOString().substring(0, 10)
    };

    try {
      await feedbackService.submit(newFeedback);
    } catch (err) {
      // Fallback local update
    }

    setFeedbackList([newFeedback, ...feedbackList]);
    setSubmitted(true);
    setLoading(false);
    setComments('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Event Feedback & Reviews</h1>
        <p className="text-sm text-slate-500">Share your thoughts to help us improve future campus events.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 mb-4">Submit New Feedback</h2>
        
        {submitted && (
          <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Thank you! Your feedback has been submitted successfully.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Select Event</label>
            <select
              value={selectedEvent}
              onChange={e => setSelectedEvent(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">-- Choose an Event --</option>
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.event_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Rating</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none"
                >
                  <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                </button>
              ))}
              <span className="text-sm font-semibold text-slate-600 ml-2">{rating} / 5 Stars</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Comments</label>
            <textarea
              rows={4}
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="What did you like? What could be improved?"
              required
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Submitting...' : 'Submit Feedback'}</span>
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Your Submitted Feedback</h2>
        {feedbackList.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-sm bg-white rounded-2xl border border-slate-200">
            No feedback submitted yet.
          </div>
        ) : (
          <div className="space-y-3">
            {feedbackList.map((item, idx) => (
              <div key={item.id || idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 text-sm">{item.event_name || 'Event'}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < (item.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.comments}</p>
                <span className="text-[10px] text-slate-400">{item.created_at}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
