
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 19 },
  { name: 'Mar', value: 15 },
  { name: 'Apr', value: 22 },
  { name: 'May', value: 30 },
  { name: 'Jun', value: 25 },
];

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl border-white/5">
          <h3 className="text-xl font-bold mb-6">Submission Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3191C4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3191C4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  itemStyle={{ color: '#3191C4' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3191C4" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl border-white/5">
          <h3 className="text-xl font-bold mb-6">Service Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Website', count: 45 },
                { name: 'Receptionist', count: 32 },
                { name: 'Automation', count: 28 },
                { name: 'Software', count: 18 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#3191C4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl border-white/5">
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <div className="space-y-6">
          {[
            { user: 'Acme Corp', action: 'New submission', time: '2 hours ago', icon: '📝' },
            { user: 'John Doe', action: 'Uploaded 3 files', time: '5 hours ago', icon: '📁' },
            { user: 'TechFlow AI', action: 'Scheduled strategy call', time: 'Yesterday', icon: '📅' },
            { user: 'Global Logistics', action: 'Status updated to In Progress', time: '2 days ago', icon: '⚡' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{activity.user} <span className="font-normal text-gray-500">- {activity.action}</span></p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
