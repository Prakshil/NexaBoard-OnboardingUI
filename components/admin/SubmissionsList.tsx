
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../services/db';
import { ClientSubmission } from '../../types';
import { Search, Filter, Download, ChevronRight } from 'lucide-react';
import { SERVICES } from '../../constants';

const SubmissionsList: React.FC = () => {
  const [submissions, setSubmissions] = useState<ClientSubmission[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    db.getSubmissions().then(setSubmissions);
  }, []);

  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = s.company_name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === 'All' || s.status === filter.toLowerCase().replace(' ', '_');
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending_review': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'in_progress': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getServiceIcon = (type: string) => {
    return SERVICES.find(s => s.id === type)?.icon || null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Submissions', value: submissions.length, color: 'text-white' },
          { label: 'Pending Review', value: submissions.filter(s => s.status === 'pending_review').length, color: 'text-orange-500' },
          { label: 'In Progress', value: submissions.filter(s => s.status === 'in_progress').length, color: 'text-blue-500' },
          { label: 'Completed', value: submissions.filter(s => s.status === 'completed').length, color: 'text-green-500' },
        ].map(stat => (
          <div key={stat.label} className="glass-card p-6 rounded-2xl border-white/5">
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 rounded-3xl border-white/5">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search companies..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#3191C4]"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select 
              className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3 focus:outline-none"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>Pending Review</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <button className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-white/10">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 font-semibold text-gray-400">Company Name</th>
                <th className="pb-4 font-semibold text-gray-400">Service Type</th>
                <th className="pb-4 font-semibold text-gray-400">Submitted By</th>
                <th className="pb-4 font-semibold text-gray-400">Date</th>
                <th className="pb-4 font-semibold text-gray-400">Status</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredSubmissions.map(sub => (
                <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 font-bold">{sub.company_name}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#3191C4] scale-75">{getServiceIcon(sub.service_type)}</span>
                      <span className="capitalize">{sub.service_type.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm">
                      <p className="font-medium">{sub.contact_name}</p>
                      <p className="text-gray-500 text-xs">{sub.contact_role}</p>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-400">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(sub.status)}`}>
                      {sub.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <Link to={`/admin/submissions/${sub.id}`} className="p-2 inline-flex items-center gap-2 text-[#3191C4] hover:underline">
                      View <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredSubmissions.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No submissions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsList;
