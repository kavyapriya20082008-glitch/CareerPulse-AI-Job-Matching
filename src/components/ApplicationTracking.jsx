import React, { useState, useEffect } from 'react';
import { 
  FileText, Clock, CheckCircle2, Award, XCircle, ChevronRight, 
  Building2, Calendar, Sparkles, Filter, AlertCircle
} from 'lucide-react';
import { fetchApplications } from '../services/api';

export default function ApplicationTracking({ candidateId = 'cand_1', onSelectJob }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchApplications({ candidate_id: candidateId }).then(data => {
      setApplications(data);
      setLoading(false);
    });
  }, [candidateId]);

  const stages = ['Applied', 'Under Review', 'Interview', 'Offer'];

  const getStageIndex = (status) => {
    if (status === 'Rejected') return -1;
    return stages.indexOf(status);
  };

  const filteredApps = statusFilter === 'All' 
    ? applications 
    : applications.filter(a => a.status === statusFilter);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Application Tracker</h1>
          <p className="text-xs text-slate-400 mt-1">Track the real-time status of your submitted job applications across the hiring pipeline.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {['All', 'Applied', 'Under Review', 'Interview', 'Offer', 'Rejected'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st} ({st === 'All' ? applications.length : applications.filter(a => a.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Application Cards List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-panel p-6 rounded-2xl animate-pulse h-40"></div>
          ))}
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-3">
          <FileText className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No applications match status "{statusFilter}"</h3>
          <p className="text-xs text-slate-400">Apply to recommended jobs to see them appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredApps.map(app => {
            const currentStageIdx = getStageIndex(app.status);
            const isRejected = app.status === 'Rejected';

            return (
              <div 
                key={app.id}
                className="glass-panel glass-panel-hover p-6 rounded-3xl border border-slate-800 space-y-6"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 
                        onClick={() => onSelectJob(app.job_id)}
                        className="text-lg font-bold text-white hover:text-indigo-400 cursor-pointer transition"
                      >
                        {app.job_title}
                      </h3>
                      <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                        {app.match_score}% Match
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 flex items-center space-x-2 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>{app.company}</span>
                      <span>•</span>
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Applied on {app.applied_date}</span>
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center space-x-1.5 ${
                      app.status === 'Offer' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                      app.status === 'Interview' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                      app.status === 'Under Review' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' :
                      app.status === 'Rejected' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                      'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    }`}>
                      {app.status === 'Offer' && <Award className="w-4 h-4" />}
                      {app.status === 'Interview' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                      {app.status === 'Under Review' && <Clock className="w-4 h-4 text-yellow-400" />}
                      {app.status === 'Rejected' && <XCircle className="w-4 h-4 text-red-400" />}
                      <span>{app.status}</span>
                    </span>
                  </div>
                </div>

                {/* MODERN PIPELINE VISUALIZATION STAGES */}
                {!isRejected ? (
                  <div className="pt-2">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-3">Hiring Progress Pipeline</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      {stages.map((stageName, idx) => {
                        const isPassed = idx <= currentStageIdx;
                        const isCurrent = idx === currentStageIdx;

                        return (
                          <div key={stageName} className="space-y-2">
                            <div className="flex items-center space-x-1">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                isCurrent ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20 animate-pulse' :
                                isPassed ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'
                              }`}>
                                {isPassed ? '✓' : idx + 1}
                              </div>
                              <div className={`h-1 flex-1 rounded-full ${isPassed ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>
                            </div>
                            <span className={`text-[11px] font-semibold block truncate ${
                              isCurrent ? 'text-indigo-400' : isPassed ? 'text-white' : 'text-slate-500'
                            }`}>
                              {stageName}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-xs text-red-300 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Application closed. {app.notes}</span>
                  </div>
                )}

                {/* Recruiter Notes */}
                {app.notes && !isRejected && (
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Recruiter Status Update Note:</span>
                    <p className="italic text-indigo-200">"{app.notes}"</p>
                  </div>
                )}

                {/* Footer action */}
                <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-xs">
                  <span className="text-slate-500 text-[11px]">Last updated on {app.updated_at}</span>
                  <button
                    onClick={() => onSelectJob(app.job_id)}
                    className="text-indigo-400 hover:underline font-semibold flex items-center space-x-1"
                  >
                    <span>View Job Posting</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
