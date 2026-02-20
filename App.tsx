
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OnboardingPortal from './pages/OnboardingPortal';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-[#F0F4FF]">
      <Toaster position="top-right" />
      <Routes>
        {/* Render onboarding at root directly to avoid redirect security issues */}
        <Route path="/" element={<OnboardingPortal />} />
        <Route path="/onboarding" element={<OnboardingPortal />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
