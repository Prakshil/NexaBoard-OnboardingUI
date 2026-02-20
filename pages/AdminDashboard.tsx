
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import SubmissionsList from '../components/admin/SubmissionsList';
import SubmissionDetail from '../components/admin/SubmissionDetail';
import DashboardOverview from '../components/admin/DashboardOverview';
import { safeStorage } from '../services/db';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const auth = safeStorage.getItem('admin_auth');
    if (!auth) {
      navigate('/admin/login');
    } else {
      setIsReady(true);
    }
  }, [navigate]);

  if (!isReady) return null;

  const getPageTitle = () => {
    if (location.pathname === '/admin/dashboard') return 'Dashboard Overview';
    if (location.pathname.startsWith('/admin/submissions')) return 'Client Submissions';
    return 'Admin';
  };

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{getPageTitle()}</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="search" 
                placeholder="Global search..." 
                className="bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-2 focus:outline-none focus:border-[#3191C4] w-64"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#3191C4] flex items-center justify-center font-bold">
              AD
            </div>
          </div>
        </header>

        <Routes>
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="submissions" element={<SubmissionsList />} />
          <Route path="submissions/:id" element={<SubmissionDetail />} />
          <Route path="*" element={<DashboardOverview />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
