import React from 'react';
import { Shield, Lock, EyeOff, CheckCircle2, FileText, Sparkles, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto mb-2">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Privacy, Ethics & Security Statement</h1>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          CareerPulse enforces non-discriminatory AI matching, robust role-based access control, and absolute candidate data privacy.
        </p>
      </div>

      {/* KEY ETHICAL PRINCIPLES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Zero Sensitive Attributes */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <EyeOff className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white">Zero Sensitive Attribute Signals</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our recommendation algorithms strictly exclude sensitive demographics such as age, gender, race, ethnicity, marital status, or photo metadata. Candidate matching is 100% merit-based.
          </p>
        </div>

        {/* Merit-Based Signal Weighting */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white">Merit-Based Signal Weighting</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Recommendation scores rely exclusively on five core professional dimensions: Technical Skill Overlap (30%), Job Title & Role Fit (15%), TF-IDF Text Similarity (35%), Location Compatibility (10%), and Experience Level (10%).
          </p>
        </div>

        {/* Explainable AI */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white">Transparent & Explainable AI</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Candidates and recruiters receive human-readable explanations detailing why a match score was assigned, eliminating black-box bias and building trust in automated job recommendations.
          </p>
        </div>

        {/* Role-Based Data Protection */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white">Strict Role-Based Access Control</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Candidate resumes and contact credentials can only be viewed by recruiters associated with active job applications submitted directly by the candidate.
          </p>
        </div>

      </div>

      {/* DETAILED POLICY DETAILS */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 text-xs text-slate-300 leading-relaxed">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Candidate Data Rights</h3>
        <p>
          Candidates maintain full control over their profile data, preferred locations, target salary bands, and resume documents. At any point, candidates can update or purge their vector embeddings from the matching database.
        </p>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider pt-2">Audit-Friendly Application Status Logging</h3>
        <p>
          Every status transition (`Applied` → `Under Review` → `Interview` → `Offer` / `Rejected`) is timestamped and recorded in immutable logs to ensure compliance and auditability.
        </p>
      </div>

    </div>
  );
}
