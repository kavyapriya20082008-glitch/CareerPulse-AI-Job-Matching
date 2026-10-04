import React from 'react';
import { Activity, Shield, Github, Sparkles, Heart } from 'lucide-react';

export default function Footer({ setCurrentTab }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Career<span className="text-indigo-400">Pulse</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-Driven Job Application Matching & Recommendation System. Powered by TF-IDF text vectorization, cosine similarity, and multi-signal candidate compatibility scoring.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2.5 py-1.5 rounded-lg w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Data Science Final Project Prototype</span>
            </div>
          </div>

          {/* Candidates Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">For Candidates</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('jobs')} className="hover:text-indigo-400 transition">Search Jobs</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('recommendations')} className="hover:text-indigo-400 transition">AI Recommendations</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('applications')} className="hover:text-indigo-400 transition">Application Tracker</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('candidate-profile')} className="hover:text-indigo-400 transition">Candidate Profile</button>
              </li>
            </ul>
          </div>

          {/* Recruiters Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">For Recruiters</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('recruiter-dashboard')} className="hover:text-indigo-400 transition">Recruiter Dashboard</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('post-job')} className="hover:text-indigo-400 transition">Post a Job</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('recruiter-jobs')} className="hover:text-indigo-400 transition">Manage Job Postings</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('applicant-management')} className="hover:text-indigo-400 transition">Applicant Matching</button>
              </li>
            </ul>
          </div>

          {/* Legal & Presentation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">System & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('jury-demo')} className="text-yellow-400 font-semibold hover:underline flex items-center space-x-1">
                  <span>🏆 Jury Presentation Mode</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('privacy')} className="hover:text-indigo-400 transition">Privacy & Ethics</button>
              </li>
              <li>
                <a href="#architecture" onClick={() => setCurrentTab('jury-demo')} className="hover:text-indigo-400 transition">NLP Architecture Doc</a>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                <Shield className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />
                Zero Sensitive Attributes Engine
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 CareerPulse AI System. Built strictly based on DS_PROJECT_REPORT.docx.</p>
          <p className="mt-2 sm:mt-0 flex items-center space-x-1">
            <span>Designed for College Jury Presentation</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
