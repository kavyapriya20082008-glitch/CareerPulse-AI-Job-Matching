import React, { useState, useEffect } from 'react';
import { 
  Building2, MapPin, Briefcase, Award, CheckCircle2, Bookmark, 
  ArrowLeft, Sparkles, Send, ShieldCheck, Check
} from 'lucide-react';
import { fetchJobDetails, submitApplication } from '../services/api';

export default function JobDetailsPage({ jobId, onBack, candidateId = 'cand_1' }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [applyModal, setApplyModal] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (jobId) {
      fetchJobDetails(jobId).then(j => {
        setJob(j);
        setLoading(false);
      });
    }
  }, [jobId]);

  if (loading) {
    return (
      <div className="glass-panel p-12 rounded-3xl animate-pulse space-y-4 max-w-4xl mx-auto">
        <div className="h-8 bg-slate-800 rounded w-1/2"></div>
        <div className="h-4 bg-slate-800 rounded w-1/4"></div>
        <div className="h-32 bg-slate-800 rounded w-full"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="glass-panel p-8 text-center rounded-3xl">
        <p className="text-white">Job posting not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs">Back to Jobs</button>
      </div>
    );
  }

  // Simulated AI Match breakdown metrics for this specific job
  const matchScore = 94;
  const breakdown = {
    skills: 94,
    role: 90,
    location: 100,
    experience: 85
  };

  const handleConfirmApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await submitApplication({
      candidate_id: candidateId,
      job_id: job.id,
      match_score: matchScore
    });
    setSubmitting(false);
    setApplied(true);
    setApplyModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Top Back Navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Search & Recommendations</span>
      </button>

      {/* Main Job Title & Company Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-semibold rounded-full border border-indigo-500/20">
              {job.industry || 'Technology'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{job.title}</h1>
            <p className="text-sm text-slate-300 font-semibold flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>{job.company}</span>
            </p>
          </div>

          {/* AI Match Score Badge */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center justify-center min-w-[140px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AI Compatibility</span>
            <span className="text-3xl font-black text-emerald-400 font-mono mt-0.5">{matchScore}%</span>
            <span className="text-[10px] text-emerald-300/80 mt-0.5">Very High Match</span>
          </div>
        </div>

        {/* Key Job Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
            <span className="text-slate-400 block text-[10px] uppercase">Location</span>
            <span className="font-semibold text-white">{job.location}</span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
            <span className="text-slate-400 block text-[10px] uppercase">Work Setup</span>
            <span className="font-semibold text-indigo-300">{job.work_type}</span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
            <span className="text-slate-400 block text-[10px] uppercase">Experience</span>
            <span className="font-semibold text-white">{job.experience_required} Years Min</span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
            <span className="text-slate-400 block text-[10px] uppercase">Compensation</span>
            <span className="font-semibold text-emerald-400">{job.salary_range}</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center space-x-3 pt-2">
          <button
            onClick={() => setApplyModal(true)}
            disabled={applied}
            className={`px-6 py-3 rounded-xl text-xs font-semibold shadow-lg transition flex items-center space-x-2 ${
              applied
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {applied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Application Submitted</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Apply Now</span>
              </>
            )}
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className={`px-4 py-3 rounded-xl text-xs font-semibold border transition flex items-center space-x-2 ${
              saved ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{saved ? 'Saved' : 'Save Job'}</span>
          </button>
        </div>
      </div>

      {/* AI EXPLANATION SECTION: "WHY THIS JOB MATCHES YOU" */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 to-slate-900 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Why This Job Matches You</h3>
              <p className="text-xs text-slate-400">Natural language NLP similarity breakdown based on candidate profile.</p>
            </div>
          </div>
          <span className="text-xs text-indigo-300 font-mono bg-indigo-950 px-2.5 py-1 rounded border border-indigo-800">
            Explainable AI
          </span>
        </div>

        {/* Signal Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Skills Match */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Skills Match</span>
              <span className="font-bold text-indigo-400 font-mono">{breakdown.skills}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${breakdown.skills}%` }}></div>
            </div>
            <p className="text-[11px] text-slate-400">High overlap on Python, Machine Learning, SQL & NLP.</p>
          </div>

          {/* Role Match */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Role Match</span>
              <span className="font-bold text-purple-400 font-mono">{breakdown.role}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full transition-all duration-1000" style={{ width: `${breakdown.role}%` }}></div>
            </div>
            <p className="text-[11px] text-slate-400">Matches target designation: Data Scientist / AI Engineer.</p>
          </div>

          {/* Location Match */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Location Match</span>
              <span className="font-bold text-emerald-400 font-mono">{breakdown.location}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${breakdown.location}%` }}></div>
            </div>
            <p className="text-[11px] text-slate-400">Matches preferred location: Bangalore & Remote preference.</p>
          </div>

          {/* Experience Match */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Experience Match</span>
              <span className="font-bold text-blue-400 font-mono">{breakdown.experience}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${breakdown.experience}%` }}></div>
            </div>
            <p className="text-[11px] text-slate-400">Candidate experience (3.5 yrs) satisfies requirement (3 yrs).</p>
          </div>

        </div>

      </div>

      {/* JOB DESCRIPTION DETAILS */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div>
          <h3 className="text-base font-bold text-white mb-2">Job Overview</h3>
          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{job.description}</p>
        </div>

        {/* Required Skills */}
        <div>
          <h3 className="text-base font-bold text-white mb-3">Required Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.required_skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-800 text-indigo-300 border border-slate-700 rounded-lg text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Key Responsibilities */}
        {job.responsibilities && (
          <div>
            <h3 className="text-base font-bold text-white mb-3">Key Responsibilities</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {job.responsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {job.requirements && (
          <div>
            <h3 className="text-base font-bold text-white mb-3">Candidate Requirements</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {job.requirements.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {job.benefits && (
          <div>
            <h3 className="text-base font-bold text-white mb-3">Perks & Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {job.benefits.map((b, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* APPLY MODAL */}
      {applyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Confirm Job Application</h3>
            <p className="text-xs text-slate-400">
              Applying for <span className="text-white font-semibold">{job.title}</span> at <span className="text-indigo-400 font-semibold">{job.company}</span>.
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <p className="text-slate-400">Selected Resume attached:</p>
              <p className="text-indigo-300 font-mono font-semibold">Priya_Sharma_Resume_DataScientist.pdf</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Optional Note for Recruiter</label>
              <textarea
                rows="3"
                placeholder="Briefly state why you're interested in this role..."
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              ></textarea>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setApplyModal(false)}
                className="w-1/2 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmApply}
                disabled={submitting}
                className="w-1/2 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/30 flex items-center justify-center space-x-1"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
