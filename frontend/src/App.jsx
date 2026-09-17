import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import BrowseEvents from './pages/BrowseEvents';
import EventDetails from './pages/EventDetails';
import MyRegistrations from './pages/MyRegistrations';
import StudentCalendar from './pages/StudentCalendar';
import FeedbackPage from './pages/FeedbackPage';
import ProfilePage from './pages/ProfilePage';

import AdminDashboard from './pages/AdminDashboard';
import AdminEvents from './pages/AdminEvents';
import AdminRegistrations from './pages/AdminRegistrations';
import AdminStudents from './pages/AdminStudents';
import AdminCategories from './pages/AdminCategories';
import AdminVenues from './pages/AdminVenues';
import AdminFeedback from './pages/AdminFeedback';

export default function App() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      <Navbar />
      
      <div className="flex-1 flex">
        {user && (
          <Sidebar role={isAdmin ? 'ADMIN' : 'STUDENT'} />
        )}

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/events" element={<BrowseEvents />} />
            <Route path="/events/:id" element={<EventDetails />} />

            {/* Student Protected Routes */}
            <Route path="/dashboard" element={user ? <StudentDashboard /> : <Navigate to="/login" />} />
            <Route path="/my-registrations" element={user ? <MyRegistrations /> : <Navigate to="/login" />} />
            <Route path="/calendar" element={<StudentCalendar />} />
            <Route path="/feedback" element={user ? <FeedbackPage /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
            <Route path="/admin/events" element={isAdmin ? <AdminEvents /> : <Navigate to="/login" />} />
            <Route path="/admin/registrations" element={isAdmin ? <AdminRegistrations /> : <Navigate to="/login" />} />
            <Route path="/admin/students" element={isAdmin ? <AdminStudents /> : <Navigate to="/login" />} />
            <Route path="/admin/categories" element={isAdmin ? <AdminCategories /> : <Navigate to="/login" />} />
            <Route path="/admin/venues" element={isAdmin ? <AdminVenues /> : <Navigate to="/login" />} />
            <Route path="/admin/feedback" element={isAdmin ? <AdminFeedback /> : <Navigate to="/login" />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}
