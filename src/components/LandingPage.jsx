import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, CheckCircle2, Search, SlidersHorizontal, 
  BrainCircuit, Briefcase, ChevronRight, UserCheck, Shield, Award, MapPin, Zap, Building2
} from 'lucide-react';
import { fetchJobs } from '../services/api';

export default function LandingPage({ setCurrentTab, setIsAuthOpen, setUserRole, onSelectJob }) {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(1);
  const [roleTab, setRoleTab] = useState('candidates');

  useEffect(() => {
    fetchJobs().then(data => setFeaturedJobs(data.slice(0, 6)));
  }, []);

  // Auto animation loop for AI Matching visualization workflow
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflowStep(prev => (prev % 4) + 1);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glow background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-300 shadow-inner">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-spin-slow" />
              <span>Next-Gen AI-Driven Recruitment Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Find the Right Opportunity. <span className="text-gradient">Faster.</span>
            </h1>

            {/* Supporting text */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              CareerPulse uses intelligent job matching to connect your skills, experience and preferences with opportunities that fit you.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => { setUserRole('candidate'); setCurrentTab('candidate-dashboard'); }}
                className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentTab('jobs')}
                className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-sm rounded-xl shadow-lg transition flex items-center space-x-2"
              >
                <Search className="w-4 h-4 text-indigo-400" />
                <span>Explore Jobs</span>
              </button>
            </div>

            {/* Role quick log-ins */}
            <div className="pt-2 flex items-center justify-center space-x-4 text-xs text-slate-400">
              <button
                onClick={() => { setUserRole('candidate'); setIsAuthOpen(true); }}
                className="hover:text-indigo-400 underline decoration-indigo-500/50 flex items-center space-x-1"
              >
                <span>Candidate Login</span>
              </button>
              <span>•</span>
              <button
                onClick={() => { setUserRole('recruiter'); setIsAuthOpen(true); }}
                className="hover:text-purple-400 underline decoration-purple-500/50 flex items-center space-x-1"
              >
                <span>Recruiter Login</span>
              </button>
            </div>

          </div>

          {/* AI MATCHING VISUALIZATION PIPELINE */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <BrainCircuit className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-bold text-white tracking-wide">AI MATCHING ENGINE ARCHITECTURE</span>
                </div>
                <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium">
                  TF-IDF + Signal Fusion Active
                </span>
              </div>

              {/* Animated Workflow Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                
                {/* Step 1 */}
                <div 
                  onClick={() => setActiveWorkflowStep(1)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    activeWorkflowStep === 1
                      ? 'bg-indigo-950/80 border-indigo-500 shadow-lg shadow-indigo-500/20 scale-105'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-bold text-sm mb-3">1</div>
                  <h4 className="text-sm font-semibold text-white">Candidate Profile</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Skills, Experience, Location & Work Type Preferences</p>
                </div>

                {/* Step 2 */}
                <div 
                  onClick={() => setActiveWorkflowStep(2)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    activeWorkflowStep === 2
                      ? 'bg-purple-950/80 border-purple-500 shadow-lg shadow-purple-500/20 scale-105'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-600/30 text-purple-400 flex items-center justify-center font-bold text-sm mb-3">2</div>
                  <h4 className="text-sm font-semibold text-white">AI Matching Engine</h4>
                  <p className="text-[11px] text-slate-400 mt-1">TF-IDF Vectorizer + Cosine Similarity Scoring</p>
                </div>

                {/* Step 3 */}
                <div 
                  onClick={() => setActiveWorkflowStep(3)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    activeWorkflowStep === 3
                      ? 'bg-blue-950/80 border-blue-500 shadow-lg shadow-blue-500/20 scale-105'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-sm mb-3">3</div>
                  <h4 className="text-sm font-semibold text-white">Job Opportunities</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Curated Tech Corpus & Skill Requirements</p>
                </div>

                {/* Step 4 */}
                <div 
                  onClick={() => setActiveWorkflowStep(4)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    activeWorkflowStep === 4
                      ? 'bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-500/20 scale-105'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center font-bold text-sm mb-3">4</div>
                  <h4 className="text-sm font-semibold text-white">Recommendations</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Ranked Jobs with Explainable % Match</p>
                </div>

              </div>

              {/* Dynamic Live Output Box */}
              <div className="mt-6 p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs">
                <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping"></span>
                  <span className="text-slate-300 font-mono">
                    {activeWorkflowStep === 1 && "VECTORIZING: [Python, Machine Learning, SQL, Remote, Bangalore]..."}
                    {activeWorkflowStep === 2 && "COMPUTING: CosineSim(Cand_Vector, Job_Vector) = 0.941..."}
                    {activeWorkflowStep === 3 && "FILTERING: 20 Active Job Postings in Tech & AI Corpus..."}
                    {activeWorkflowStep === 4 && "EXPLAINING: 94% Match — Strong match based on Python & ML skills."}
                  </span>
                </div>
                <button
                  onClick={() => setCurrentTab('jury-demo')}
                  className="text-xs text-indigo-400 font-semibold hover:underline flex items-center space-x-1"
                >
                  <span>Inspect Code & Matrix</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* HOW CAREERPULSE WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">How CareerPulse Works</h2>
          <p className="text-sm text-slate-400 mt-2">A streamlined 4-step workflow connecting talent with top engineering roles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl space-y-3 relative group hover:border-indigo-500/50 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-base">1</div>
            <h3 className="text-base font-semibold text-white">1. Create Your Profile</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Input your technical skills, work experience, education, preferred locations, and work setup.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3 relative group hover:border-indigo-500/50 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-base">2</div>
            <h3 className="text-base font-semibold text-white">2. Discover Relevant Jobs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Search through curated tech job postings with multi-variable filters across top industries.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3 relative group hover:border-indigo-500/50 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-base">3</div>
            <h3 className="text-base font-semibold text-white">3. Get AI-Powered Matches</h3>
            <p className="text-xs text-slate-400 leading-relaxed">View instant TF-IDF similarity scores and clear breakdowns explaining why every job fits you.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3 relative group hover:border-indigo-500/50 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-base">4</div>
            <h3 className="text-base font-semibold text-white">4. Apply & Track Progress</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Apply in 1-click and monitor your status in real-time across review, interview, and offer stages.</p>
          </div>
        </div>
      </section>

      {/* WHY CAREERPULSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Why CareerPulse?</h2>
            <p className="text-sm text-slate-400 mt-2">Transparent, data-backed recruitment powered by explainable natural language processing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Intelligent Job Matching</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Transforms candidate profiles and job requirements into comparable TF-IDF TF vectors.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Explainable Recommendations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Never guess why a job appeared. See explicit percentage breakdowns for skills, role, and location compatibility.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
                <Search className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Smart Job Search</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Filter by industry, work type (Remote/Hybrid/On-site), experience level, and exact skill sets.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Application Tracking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Visual stage pipeline (Applied → Under Review → Interview → Offer) keeps candidates updated.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-2">
                <UserCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Recruiter Candidate Hub</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Recruiters get applicant rankings sorted by candidate match score to fast-track hiring.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center mb-2">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Ethical & Bias-Free AI</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Matching signals rely strictly on merit (skills, experience, job role) with zero sensitive personal attributes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED / TRENDING JOBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured & Trending Opportunities</h2>
            <p className="text-xs text-slate-400 mt-1">Live demo postings with simulated candidate match percentages.</p>
          </div>
          <button
            onClick={() => setCurrentTab('jobs')}
            className="text-xs text-indigo-400 font-semibold hover:underline flex items-center space-x-1 mt-2 sm:mt-0"
          >
            <span>View All Job Postings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredJobs.map(job => (
            <div 
              key={job.id} 
              className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-white hover:text-indigo-400 transition cursor-pointer" onClick={() => onSelectJob(job.id)}>
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>{job.company}</span>
                    </p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                    92% Match
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3 text-[11px] text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{job.location}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">{job.work_type}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">{job.experience_required} yrs exp</span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{job.description}</p>
                
                {/* Required Skills Badges */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {job.required_skills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded border border-slate-700/60">
                      {skill}
                    </span>
                  ))}
                  {job.required_skills.length > 4 && (
                    <span className="text-[10px] text-slate-500 font-mono">+{job.required_skills.length - 4}</span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">{job.salary_range}</span>
                <button
                  onClick={() => onSelectJob(job.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow transition"
                >
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROLE-BASED VALUE PROPOSITION TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 rounded-3xl border border-slate-800">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setRoleTab('candidates')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition ${
                roleTab === 'candidates' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              For Candidates
            </button>
            <button
              onClick={() => setRoleTab('recruiters')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition ${
                roleTab === 'recruiters' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              For Recruiters
            </button>
          </div>

          {roleTab === 'candidates' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Accelerate Your Career with AI Precision</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  CareerPulse eliminates endless manual job applications. Our AI engine analyzes your candidate vector—comprising skills, project experience, and work preferences—and compares it against active job postings using TF-IDF text vectorization.
                </p>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Get personalized job recommendations tailored to your stack</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>See transparent skill-gap explanations to improve candidate profile</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Track application milestones live from under review to offer</span>
                  </li>
                </ul>
                <button
                  onClick={() => { setUserRole('candidate'); setCurrentTab('candidate-dashboard'); }}
                  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg"
                >
                  Enter Candidate Experience
                </button>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">SAMPLE MATCH INSIGHT</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">94% Compatible</span>
                </div>
                <h4 className="text-sm font-semibold text-white">Senior Data Scientist — NeuralPulse Tech</h4>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex justify-between"><span>Skills Overlap</span><span className="text-white font-mono">94%</span></div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full"><div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '94%' }}></div></div>
                  <div className="flex justify-between"><span>Location Match (Bangalore)</span><span className="text-white font-mono">100%</span></div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }}></div></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Hire Top Engineering Talent in Half the Time</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Recruiters can post jobs, manage active requisitions, and instantly view candidates ranked by AI compatibility score. Reduce time-to-hire by focusing on high-matching talent.
                </p>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>Automated applicant ranking based on TF-IDF skill overlap</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>1-Click applicant status transitions with candidate notifications</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>Recruiter analytics dashboard for funnel metrics</span>
                  </li>
                </ul>
                <button
                  onClick={() => { setUserRole('recruiter'); setCurrentTab('recruiter-dashboard'); }}
                  className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg"
                >
                  Enter Recruiter Experience
                </button>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">RECRUITER HIRING FUNNEL</span>
                  <span className="text-xs text-purple-400 font-mono">48 Applicants Active</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300"><span>90%+ Match Score</span><span className="text-emerald-400 font-bold">12 Candidates</span></div>
                  <div className="flex justify-between text-slate-300"><span>Under Review</span><span className="text-yellow-400 font-bold">8 Candidates</span></div>
                  <div className="flex justify-between text-slate-300"><span>Interviews Scheduled</span><span className="text-indigo-400 font-bold">4 Candidates</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
