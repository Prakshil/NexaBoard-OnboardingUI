
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Layout, ClipboardList, Settings, LogOut } from 'lucide-react';
import { safeStorage } from '../../services/db';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    safeStorage.removeItem('admin_auth');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: <Layout />, path: '/admin/dashboard' },
    { label: 'Submissions', icon: <ClipboardList />, path: '/admin/submissions' },
    { label: 'Settings', icon: <Settings />, path: '/admin/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-black border-r border-white/10 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-8 h-8 rounded-lg bg-[#3191C4] flex items-center justify-center">
          <Layout className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">ClientReach AI</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${isActive ? 'bg-[#3191C4] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
            `}
          >
            {React.cloneElement(item.icon as React.ReactElement, { className: 'w-5 h-5' })}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all mt-auto"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
