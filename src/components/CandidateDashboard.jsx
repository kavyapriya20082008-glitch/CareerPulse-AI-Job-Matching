import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Briefcase, FileText, CheckCircle2, Bookmark, Clock, ArrowUpRight, 
  Search, ShieldAlert, Award, User, MapPin, ChevronRight, SlidersHorizontal
} from 'lucide-react';
import { fetchRecommendations, fetchApplications, submitApplication, fetchCandidateProfile } from '../services/api';

export default function CandidateDashboard({ candidateId = 'cand_1', setCurrentTab, onSelectJob }) {
  const [profile, setProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState(['job_1', 'job_3']);

  useEffect(() => {
    // Fetch profile, recommendations, applications
    fetchCandidateProfile(candidateId).then(p => setProfile(p));
    
    fetchRecommendations(candidateId).then(data => {
      setRecommendations(data.jobs || []);
      setLoadingRecs(false);
    });

    fetchApplications({ candidate_id: candidateId }).then(apps => {
      setApplications(apps);
      setAppliedJobIds(apps.map(a => a.job_id));
    });
  }, [candidateId]);

  const handleApply = async (job) => {
    if (appliedJobIds.includes(job.id)) return;
    const res = await submitApplication({
      candidate_id: candidateId,
      job_id: job.id,
      match_score: job.match_score
    });

    if (res && !res.error) {
      setAppliedJobIds([...appliedJobIds, job.id]);
      setApplications([res, ...applications]);
    }
  };

  const toggleSave = (jobId) => {
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds(savedJobIds.filter(id => id !== jobId));
    } else {
      setSavedJobIds([...savedJobIds, jobId]);
    }
  };

  // Stat counts
  const totalApps = applications.length;
  const underReviewCount = applications.filter(a => a.status === 'Under Review').length;
  const interviewCount = applications.filter(a => a.status === 'Interview').length;
  const offerCount = applications.filter(a => a.status === 'Offer').length;

  return (
    <div className="space-y-8 pb-12">
      
      {/* HEADER GREETING */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI MATCHING ENGINE LIVE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good morning, <span className="text-gradient">{profile ? profile.name : 'Priya Sharma'}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Target Role: <span className="text-slate-200 font-semibold">{profile?.target_role || 'Data Scientist / AI Engineer'}</span> • Location Preference: <span className="text-indigo-300 font-medium">{profile?.preferred_location || 'Bangalore'} ({profile?.preferred_work_type || 'Remote'})</span>
          </p>
        </div>

        {/* Profile Completion Widget */}
        <div className="flex items-center space-x-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" className="text-slate-800" fill="transparent" />
              <circle 
                cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" 
                className="text-indigo-500" 
                fill="transparent" 
                strokeDasharray="125.6" 
                strokeDashoffset={125.6 - (125.6 * (profile?.profile_completion || 85)) / 100} 
              />
            </svg>
            <span className="absolute text-xs font-bold text-white">{profile?.profile_completion || 85}%</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Profile Completion</p>
            <button 
              onClick={() => setCurrentTab('candidate-profile')}
              className="text-[11px] text-indigo-400 hover:underline flex items-center space-x-1"
            >
              <span>Improve Profile</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* SUMMARY STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Applications */}
        <div 
          onClick={() => setCurrentTab('applications')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-800 cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Applications</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{totalApps}</div>
          <p className="text-[11px] text-slate-400">Applications submitted</p>
        </div>

        {/* Under Review */}
        <div 
          onClick={() => setCurrentTab('applications')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-800 cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Under Review</span>
            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{underReviewCount}</div>
          <p className="text-[11px] text-slate-400">Recruiters reviewing profile</p>
        </div>

        {/* Interviews */}
        <div 
          onClick={() => setCurrentTab('applications')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-800 cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Interviews</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{interviewCount}</div>
          <p className="text-[11px] text-slate-400">Technical rounds scheduled</p>
        </div>

        {/* Offers */}
        <div 
          onClick={() => setCurrentTab('applications')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-800 cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Offers Received</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{offerCount}</div>
          <p className="text-[11px] text-slate-400">Active job offers</p>
        </div>

      </div>

      {/* AI RECOMMENDED JOBS SECTION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Top AI-Recommended Jobs for You</span>
            </h2>
            <p className="text-xs text-slate-400">Ranked by TF-IDF text similarity and candidate signal compatibility.</p>
          </div>
          <button
            onClick={() => setCurrentTab('recommendations')}
            className="text-xs font-semibold text-indigo-400 hover:underline flex items-center space-x-1"
          >
            <span>View All AI Matches</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {loadingRecs ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="glass-panel p-6 rounded-2xl space-y-3 animate-pulse">
                <div className="h-5 bg-slate-800 rounded w-2/3"></div>
                <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                <div className="h-12 bg-slate-800 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.slice(0, 6).map(job => {
              const isApplied = appliedJobIds.includes(job.id);
              const isSaved = savedJobIds.includes(job.id);

              return (
                <div 
                  key={job.id}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between space-y-4 relative"
                >
                  <div>
                    {/* Top Row: Title, Company & Match % Badge */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 
                          onClick={() => onSelectJob(job.id)}
                          className="text-base font-bold text-white hover:text-indigo-400 transition cursor-pointer"
                        >
                          {job.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">{job.company}</p>
                      </div>

                      <div className="text-right">
                        <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full border shadow-sm ${
                          job.match_score >= 90
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                        }`}>
                          AI Match: {job.match_score}%
                        </span>
                      </div>
                    </div>

                    {/* Metadata Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3 text-[11px] text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">{job.location}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">{job.work_type}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">{job.experience_required} yrs exp</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-semibold text-emerald-400">{job.salary_range}</span>
                    </div>

                    {/* EXPLAINABLE RECOMMENDATION BLOCK */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1.5 mb-3">
                      <div className="flex items-center space-x-1.5 text-indigo-300 font-semibold text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Why this matches you:</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed italic">
                        "{job.explanation || `Strong match based on Python, SQL, Machine Learning and your preferred remote work type.`}"
                      </p>

                      {/* Mini Breakdown Indicators */}
                      {job.breakdown && (
                        <div className="pt-2 grid grid-cols-3 gap-2 border-t border-slate-800/80 text-[10px]">
                          <div>
                            <span className="text-slate-400 block">Skills Match</span>
                            <span className="font-bold text-indigo-300">{job.breakdown.skills_match}%</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Role Match</span>
                            <span className="font-bold text-purple-300">{job.breakdown.role_match}%</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Location Match</span>
                            <span className="font-bold text-emerald-300">{job.breakdown.location_match}%</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Skills Chips */}
                    <div className="flex flex-wrap gap-1">
                      {job.required_skills.slice(0, 5).map((skill, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => toggleSave(job.id)}
                      className={`p-2 rounded-lg border transition ${
                        isSaved ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                      title={isSaved ? 'Saved to bookmarks' : 'Save job'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onSelectJob(job.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => handleApply(job)}
                        disabled={isApplied}
                        className={`px-4 py-1.5 text-xs font-semibold rounded-lg shadow transition flex items-center space-x-1.5 ${
                          isApplied
                            ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Applied</span>
                          </>
                        ) : (
                          <span>Quick Apply</span>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
