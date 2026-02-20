
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../../services/db';
import { ClientSubmission, SubmissionStatus } from '../../types';
import { ChevronLeft, Download, ExternalLink, Calendar, Mail, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const SubmissionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sub, setSub] = useState<ClientSubmission | null>(null);

  useEffect(() => {
    if (id) db.getSubmissionById(id).then(setSub);
  }, [id]);

  if (!sub) return <div className="p-8 text-center text-gray-500">Loading submission...</div>;

  const handleStatusChange = async (newStatus: SubmissionStatus) => {
    await db.updateStatus(sub.id, newStatus);
    setSub({ ...sub, status: newStatus });
    toast.success(`Status updated to ${newStatus.replace('_', ' ')}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      await db.deleteSubmission(sub.id);
      toast.success('Submission deleted');
      navigate('/admin/submissions');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Link to="/admin/submissions" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" /> Back to List
        </Link>
        <div className="flex items-center gap-4">
          <select 
            className="bg-[#111111] border border-white/10 rounded-xl px-4 py-2 font-semibold focus:outline-none focus:border-[#3191C4]"
            value={sub.status}
            onChange={(e) => handleStatusChange(e.target.value as SubmissionStatus)}
          >
            <option value="pending_review">Pending Review</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button 
            onClick={handleDelete}
            className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="glass-card p-8 rounded-3xl border-white/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               Project Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div>
                <p className="text-gray-500 uppercase tracking-wider text-xs font-bold mb-1">Company</p>
                <p className="text-lg font-semibold">{sub.company_name}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase tracking-wider text-xs font-bold mb-1">Service Type</p>
                <p className="text-lg font-semibold capitalize">{sub.service_type.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase tracking-wider text-xs font-bold mb-1">Industry</p>
                <p className="text-lg font-semibold">{sub.industry}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase tracking-wider text-xs font-bold mb-1">Launch Date</p>
                <p className="text-lg font-semibold">{sub.business_details.launch_date}</p>
              </div>
            </div>
            <div className="mt-8 space-y-6">
              <div>
                <p className="text-gray-500 uppercase tracking-wider text-xs font-bold mb-2">Problem Statement</p>
                <p className="bg-white/5 p-4 rounded-xl leading-relaxed">{sub.business_details.problem_solving}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase tracking-wider text-xs font-bold mb-2">90-Day Success Goals</p>
                <p className="bg-white/5 p-4 rounded-xl leading-relaxed">{sub.business_details.success_90_days}</p>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 rounded-3xl border-white/5">
            <h3 className="text-xl font-bold mb-6">Service Requirements Responses</h3>
            <div className="space-y-4">
              {Object.entries(sub.service_responses).map(([key, val]) => (
                <div key={key} className="border-b border-white/5 pb-4 last:border-0">
                  <p className="text-gray-500 text-sm mb-1 capitalize">{key.replace('_', ' ')}</p>
                  <p className="font-medium">
                    {Array.isArray(val) ? val.join(', ') : String(val)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="glass-card p-8 rounded-3xl border-white/5">
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#3191C4]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold">{sub.contact_name}</p>
                  <p className="text-gray-500 text-sm">{sub.contact_role}</p>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-[#3191C4] py-3 rounded-xl font-bold hover:brightness-110">
                <Mail className="w-5 h-5" /> Email Client
              </button>
            </div>
          </section>

          <section className="glass-card p-8 rounded-3xl border-white/5">
            <h3 className="text-xl font-bold mb-6">Uploaded Files</h3>
            {sub.uploaded_files.length > 0 ? (
              <div className="space-y-3">
                {sub.uploaded_files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-sm">
                    <span className="truncate pr-4">{file.name}</span>
                    <button className="text-[#3191C4] hover:underline shrink-0">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4 italic">No files uploaded</p>
            )}
          </section>

          <section className="glass-card p-8 rounded-3xl border-white/5">
            <h3 className="text-xl font-bold mb-4">Internal Notes</h3>
            <textarea 
              rows={4} 
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#3191C4]"
              placeholder="Add private notes for the team..."
            />
            <button className="mt-4 w-full border border-[#3191C4] text-[#3191C4] py-2 rounded-xl font-semibold hover:bg-[#3191C4]/10 transition-all">
              Save Note
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;
