import React, { useState, useEffect } from 'react';
import { Briefcase, PlusCircle, Building2, MapPin, Users, CheckCircle2, XCircle, Edit, Eye } from 'lucide-react';
import { fetchJobs, createJob } from '../services/api';

export default function RecruiterJobManagement({ setCurrentTab, onSelectJob, initialMode = 'list' }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(initialMode); // 'list' or 'post'

  // Post Job Form State
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('NeuralPulse Tech');
  const [industry, setIndustry] = useState('AI & Machine Learning');
  const [location, setLocation] = useState('Bangalore');
  const [workType, setWorkType] = useState('Remote');
  const [expRequired, setExpRequired] = useState(3.0);
  const [salaryRange, setSalaryRange] = useState('₹18,00,000 - ₹26,00,000 P.A.');
  const [skillsInput, setSkillsInput] = useState('Python, Machine Learning, SQL, NLP, TensorFlow');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState('Design NLP pipelines\nDeploy PyTorch models to production');
  const [requirements, setRequirements] = useState('3+ years Python experience\nB.Tech/M.Tech in CS');
  const [benefits, setBenefits] = useState('100% Remote\nHealth Insurance\nESOPs');
  
  const [submitting, setSubmitting] = useState(false);
  const [postedSuccess, setPostedSuccess] = useState(false);

  useEffect(() => {
    fetchJobs().then(data => {
      setJobs(data);
      setLoading(false);
    });
  }, []);

  const handlePostJob = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const skillsArray = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    const respArray = responsibilities.split('\n').filter(Boolean);
    const reqArray = requirements.split('\n').filter(Boolean);
    const benArray = benefits.split('\n').filter(Boolean);

    const newJobObj = {
      title,
      company,
      industry,
      location,
      work_type: workType,
      experience_required: parseFloat(expRequired),
      salary_range: salaryRange,
      required_skills: skillsArray,
      description,
      responsibilities: respArray,
      requirements: reqArray,
      benefits: benArray,
      recruiter_id: 'rec_1'
    };

    const created = await createJob(newJobObj);
    setSubmitting(false);

    if (created) {
      setJobs([created, ...jobs]);
      setPostedSuccess(true);
      setTimeout(() => {
        setPostedSuccess(false);
        setMode('list');
      }, 1500);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Header & Tab switcher */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Recruiter Job Management</h1>
          <p className="text-xs text-slate-400 mt-1">Post new job requisitions or manage existing active job listings.</p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setMode('list')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition ${
              mode === 'list' ? 'bg-purple-600 text-white border-purple-500 shadow-md' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            My Job Postings ({jobs.length})
          </button>
          <button
            onClick={() => setMode('post')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition flex items-center space-x-1.5 ${
              mode === 'post' ? 'bg-purple-600 text-white border-purple-500 shadow-md' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Post a Job</span>
          </button>
        </div>
      </div>

      {mode === 'post' ? (
        /* POST A JOB FORM WIZARD */
        <form onSubmit={handlePostJob} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white">Create & Publish Job Requisition</h2>
            <p className="text-xs text-slate-400">Filled details will be processed into TF-IDF job vector corpus automatically.</p>
          </div>

          {postedSuccess && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Job Requisition published successfully! AI candidate match vector updated.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Job Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Data Scientist - AI & NLP"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Company / Organization</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
              >
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Software SaaS">Software SaaS</option>
                <option value="Fintech">Fintech</option>
                <option value="Data & Analytics">Data & Analytics</option>
                <option value="Cybersecurity">Cybersecurity</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Work Type Setup</label>
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Required Minimum Experience (Years)</label>
              <input
                type="number"
                step="0.5"
                value={expRequired}
                onChange={(e) => setExpRequired(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="text-xs space-y-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Salary Range / Band</label>
              <input
                type="text"
                placeholder="e.g. ₹18,00,000 - ₹26,00,000 P.A."
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                placeholder="e.g. Python, Machine Learning, SQL, PyTorch, Docker"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Job Description</label>
              <textarea
                rows="4"
                required
                placeholder="Detailed description of the job requisition..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 transition flex items-center justify-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{submitting ? 'Publishing Requisition...' : 'Publish Job Posting'}</span>
          </button>
        </form>
      ) : (
        /* MY JOBS LIST TABLE */
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">Job Requisition</th>
                  <th className="py-3 px-3">Location & Type</th>
                  <th className="py-3 px-3">Required Exp</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Posted Date</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {jobs.map(job => (
                  <tr key={job.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-white hover:text-indigo-400 cursor-pointer" onClick={() => onSelectJob(job.id)}>
                        {job.title}
                      </p>
                      <p className="text-[10px] text-slate-400">{job.company}</p>
                    </td>
                    <td className="py-3.5 px-3 text-slate-300">
                      <span>{job.location}</span> • <span className="text-indigo-300">{job.work_type}</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-300 font-mono">{job.experience_required} yrs</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-400">{job.posted_date}</td>
                    <td className="py-3.5 px-3 text-right space-x-2">
                      <button
                        onClick={() => onSelectJob(job.id)}
                        className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700"
                        title="View Job Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setCurrentTab('applicant-management')}
                        className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-[11px]"
                      >
                        Applicants
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
