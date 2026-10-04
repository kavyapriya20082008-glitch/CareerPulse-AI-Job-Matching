import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Users, UserCheck, Award, PlusCircle, Sparkles, 
  ChevronRight, ArrowUpRight, BarChart2, CheckCircle2, Clock, XCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { fetchRecruiterAnalytics, fetchApplications, updateApplicationStatus } from '../services/api';

export default function RecruiterDashboard({ setCurrentTab, onSelectApplicant }) {
  const [analytics, setAnalytics] = useState(null);
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecruiterAnalytics().then(data => setAnalytics(data));
    fetchApplications().then(apps => {
      setRecentApps(apps.slice(0, 8));
      setLoading(false);
    });
  }, []);

  const handleStatusChange = async (appId, newStatus) => {
    const updated = await updateApplicationStatus(appId, newStatus);
    if (updated) {
      setRecentApps(recentApps.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    }
  };

  const statusColors = {
    'Applied': '#6366f1',
    'Under Review': '#f59e0b',
    'Interview': '#3b82f6',
    'Offer': '#10b981',
    'Rejected': '#ef4444'
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Recruiter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>RECRUITER HIRING PORTAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Recruiter Dashboard — <span className="text-gradient">Dr. Vikram Sethi</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Head of AI Talent Acquisition • NeuralPulse Tech & Partner Organizations</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentTab('post-job')}
            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30 flex items-center space-x-2 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Requisition</span>
          </button>
        </div>
      </div>

      {/* RECRUITER STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Active Jobs */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Jobs</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{analytics?.metrics.active_jobs || 18}</div>
          <p className="text-[11px] text-slate-400">Open requisitions</p>
        </div>

        {/* Total Applicants */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Applicants</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{analytics?.metrics.total_applicants || 48}</div>
          <p className="text-[11px] text-slate-400">Resumes evaluated by AI</p>
        </div>

        {/* Interviews */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Interviews</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{analytics?.metrics.interviews || 12}</div>
          <p className="text-[11px] text-slate-400">Technical rounds scheduled</p>
        </div>

        {/* Offers Extended */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Offers Extended</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{analytics?.metrics.offers || 4}</div>
          <p className="text-[11px] text-slate-400">Top matching candidates</p>
        </div>

      </div>

      {/* ANALYTICS CHARTS SECTION */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Status Distribution Pie */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-purple-400" />
              <span>Candidate Pipeline Distribution</span>
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {analytics.statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-[11px]">
              {analytics.statusDistribution.map(item => (
                <div key={item.name} className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300">{item.name}: <strong className="text-white">{item.value}</strong></span>
                </div>
              ))}
            </div>
          </div>

          {/* Match Score Distribution Bar Chart */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Candidate AI Match Score Distribution</span>
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.matchScoreRanges}>
                  <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              Over 75% of applicants score above 80% compatibility based on TF-IDF skill overlap.
            </p>
          </div>

        </div>
      )}

      {/* RECENT APPLICATIONS TABLE & QUICK STATUS UPDATER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Candidate Applications</h3>
            <p className="text-xs text-slate-400">Ranked by AI match score % with instant status modification.</p>
          </div>
          <button
            onClick={() => setCurrentTab('applicant-management')}
            className="text-xs text-purple-400 hover:underline font-semibold flex items-center space-x-1"
          >
            <span>View All Applicants</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Candidate</th>
                <th className="py-3 px-3">Applied Role</th>
                <th className="py-3 px-3">Match Score</th>
                <th className="py-3 px-3">Top Skills</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentApps.map(app => (
                <tr key={app.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-3">
                    <p className="font-bold text-white">{app.candidate_name}</p>
                    <p className="text-[10px] text-slate-400">{app.candidate_location} • {app.candidate_experience} yrs exp</p>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-200">{app.job_title}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-mono">
                      {app.match_score}%
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex flex-wrap gap-1">
                      {app.candidate_skills.slice(0, 3).map((s, i) => (
                        <span key={i} className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      app.status === 'Offer' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                      app.status === 'Interview' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                      app.status === 'Under Review' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' :
                      app.status === 'Rejected' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                      'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-slate-200 text-[11px] rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
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
