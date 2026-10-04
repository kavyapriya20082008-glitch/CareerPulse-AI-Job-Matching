import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Sparkles, CheckCircle2, Clock, 
  XCircle, Award, ChevronRight, User, Mail, MapPin, Briefcase, FileText, X
} from 'lucide-react';
import { fetchApplications, updateApplicationStatus } from '../services/api';

export default function ApplicantManagement() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [minMatch, setMinMatch] = useState(70);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    loadApplicants();
  }, []);

  const loadApplicants = async () => {
    setLoading(true);
    const data = await fetchApplications();
    setApplications(data);
    setLoading(false);
  };

  const handleStatusUpdate = async (appId, newStatus) => {
    const updated = await updateApplicationStatus(appId, newStatus);
    if (updated) {
      setApplications(applications.map(a => a.id === appId ? { ...a, status: newStatus } : a));
      if (selectedApplicant && selectedApplicant.id === appId) {
        setSelectedApplicant({ ...selectedApplicant, status: newStatus });
      }
    }
  };

  const filteredApps = applications.filter(a => {
    if (statusFilter !== 'All' && a.status !== statusFilter) return false;
    if (a.match_score < minMatch) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Applicant Evaluation & Status Hub</h1>
          <p className="text-xs text-slate-400 mt-1">Review candidates ranked by TF-IDF matching engine and update hiring statuses.</p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-300 mr-1">Status:</span>
            {['All', 'Applied', 'Under Review', 'Interview', 'Offer', 'Rejected'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                  statusFilter === st ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Min AI Match Score:</span>
            <input
              type="range"
              min="50"
              max="95"
              value={minMatch}
              onChange={(e) => setMinMatch(Number(e.target.value))}
              className="accent-indigo-500 cursor-pointer"
            />
            <span className="font-mono font-bold text-indigo-300">{minMatch}%+</span>
          </div>
        </div>
      </div>

      {/* Applicant Cards / Table */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-panel p-6 rounded-2xl animate-pulse h-32"></div>
          ))}
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800">
          <Users className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-white font-semibold">No applicants match your current filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredApps.map(app => (
            <div 
              key={app.id} 
              className="glass-panel glass-panel-hover p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 
                      onClick={() => setSelectedApplicant(app)}
                      className="text-base font-bold text-white hover:text-indigo-400 transition cursor-pointer"
                    >
                      {app.candidate_name}
                    </h3>
                    <p className="text-xs text-slate-400">{app.candidate_email} • {app.candidate_location}</p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-mono">
                    {app.match_score}% Match
                  </span>
                </div>

                <p className="text-xs font-semibold text-purple-300 mb-2">Applied for: {app.job_title}</p>

                {/* Candidate Skills */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {app.candidate_skills.map((skill, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] text-slate-400">
                  Applied on {app.applied_date} • {app.candidate_experience} Years Commercial Exp
                </p>
              </div>

              {/* Status Action Toolbar */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedApplicant(app)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold"
                >
                  View Profile & Resume
                </button>

                <div className="flex space-x-1">
                  <button
                    onClick={() => handleStatusUpdate(app.id, 'Under Review')}
                    className={`px-2 py-1 text-[10px] font-bold rounded ${app.status === 'Under Review' ? 'bg-yellow-500 text-slate-950' : 'bg-slate-900 text-yellow-400 border border-yellow-500/30'}`}
                  >
                    Review
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(app.id, 'Interview')}
                    className={`px-2 py-1 text-[10px] font-bold rounded ${app.status === 'Interview' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-blue-400 border border-blue-500/30'}`}
                  >
                    Interview
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(app.id, 'Offer')}
                    className={`px-2 py-1 text-[10px] font-bold rounded ${app.status === 'Offer' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-emerald-400 border border-emerald-500/30'}`}
                  >
                    Offer
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(app.id, 'Rejected')}
                    className={`px-2 py-1 text-[10px] font-bold rounded ${app.status === 'Rejected' ? 'bg-red-600 text-white' : 'bg-slate-900 text-red-400 border border-red-500/30'}`}
                  >
                    Reject
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* CANDIDATE DETAIL DRAWER MODAL */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl h-full bg-slate-900 border-l border-slate-800 rounded-2xl p-6 overflow-y-auto space-y-6 relative">
            <button
              onClick={() => setSelectedApplicant(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-2">
              <span className="px-2.5 py-1 text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-mono">
                {selectedApplicant.match_score}% AI Match Score
              </span>
              <h2 className="text-2xl font-bold text-white">{selectedApplicant.candidate_name}</h2>
              <p className="text-xs text-slate-400">{selectedApplicant.candidate_email} • {selectedApplicant.candidate_location}</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <p className="font-semibold text-white">Applied Requisition: {selectedApplicant.job_title}</p>
              <p className="text-slate-400">Current Hiring Stage: <span className="text-emerald-400 font-bold">{selectedApplicant.status}</span></p>
              <p className="text-slate-400">Applied on: {selectedApplicant.applied_date}</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Technical Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedApplicant.candidate_skills.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs rounded-lg font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Resume Document</h3>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-300">{selectedApplicant.candidate_name.replace(' ', '_')}_Resume.pdf</span>
                <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-semibold text-xs">
                  Download PDF
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white">Update Status</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleStatusUpdate(selectedApplicant.id, 'Under Review')}
                  className="py-2 bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 rounded-xl font-bold"
                >
                  Move to Under Review
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedApplicant.id, 'Interview')}
                  className="py-2 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-xl font-bold"
                >
                  Schedule Technical Interview
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedApplicant.id, 'Offer')}
                  className="py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl font-bold"
                >
                  Extend Job Offer
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedApplicant.id, 'Rejected')}
                  className="py-2 bg-red-500/20 text-red-300 border border-red-500/40 rounded-xl font-bold"
                >
                  Reject Application
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
