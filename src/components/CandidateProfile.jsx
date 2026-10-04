import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, Sparkles, 
  Plus, X, Upload, CheckCircle2, Shield, ArrowUpRight, AlertCircle, Save
} from 'lucide-react';
import { fetchCandidateProfile, updateCandidateProfile } from '../services/api';

export default function CandidateProfile({ candidateId = 'cand_1' }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newSkill, setNewSkill] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState([]);
  const [prefLoc, setPrefLoc] = useState('');
  const [prefWorkType, setPrefWorkType] = useState('Remote');
  const [expYears, setExpYears] = useState(3.5);
  const [education, setEducation] = useState('');

  useEffect(() => {
    fetchCandidateProfile(candidateId).then(p => {
      if (p) {
        setProfile(p);
        setName(p.name || '');
        setEmail(p.email || '');
        setTargetRole(p.target_role || '');
        setSummary(p.summary || '');
        setSkills(p.skills || []);
        setPrefLoc(p.preferred_location || '');
        setPrefWorkType(p.preferred_work_type || 'Remote');
        setExpYears(p.experience_years || 3);
        setEducation(p.education || '');
      }
      setLoading(false);
    });
  }, [candidateId]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    const updated = await updateCandidateProfile(candidateId, {
      name,
      email,
      target_role: targetRole,
      summary,
      skills,
      preferred_location: prefLoc,
      preferred_work_type: prefWorkType,
      experience_years: parseFloat(expYears),
      education
    });
    setSaving(false);
    if (updated) {
      setProfile(updated);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="glass-panel p-8 rounded-3xl animate-pulse space-y-4 max-w-4xl mx-auto">
        <div className="h-6 bg-slate-800 rounded w-1/3"></div>
        <div className="h-32 bg-slate-800 rounded w-full"></div>
      </div>
    );
  }

  const completionPercent = profile?.profile_completion || 85;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Profile Header & Completion Gauge */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/20">
            {name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">{name}</h1>
            <p className="text-xs text-indigo-400 font-semibold">{targetRole}</p>
            <p className="text-xs text-slate-400">{email} • {prefLoc}</p>
          </div>
        </div>

        {/* Completion Gauge */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center space-x-4">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Profile Strength</span>
            <p className="text-xl font-black text-emerald-400 font-mono">{completionPercent}% Complete</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center font-bold text-xs text-emerald-400">
            {completionPercent}%
          </div>
        </div>
      </div>

      {/* IMPROVE PROFILE SUGGESTIONS BANNER */}
      {completionPercent < 100 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-indigo-950/40 to-slate-900 border border-amber-500/30 flex items-start space-x-3 text-xs">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-300">Improve Profile to Boost Recommendation Accuracy</h4>
            <p className="text-slate-300">
              Adding 2 more core technical skills and uploading an updated resume will increase your AI Job Match scores by up to +15%.
            </p>
          </div>
        </div>
      )}

      {/* SUCCESS FEEDBACK TOAST */}
      {successMsg && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Candidate profile updated successfully! AI recommendation vector updated.</span>
        </div>
      )}

      {/* MAIN PROFILE FORM */}
      <form onSubmit={handleSaveProfile} className="space-y-8">
        
        {/* PERSONAL INFORMATION */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <User className="w-4 h-4 text-indigo-400" />
            <span>Personal Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* PROFESSIONAL INFORMATION */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span>Professional Summary & Designation</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Target Designation / Role Title</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Data Scientist / AI Engineer"
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Professional Executive Summary (Used for TF-IDF Vectorization)</label>
              <textarea
                rows="4"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Describe your technical background, domain projects, and key achievements..."
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-300 mb-1">Total Commercial Experience (Years)</label>
                <input
                  type="number"
                  step="0.5"
                  value={expYears}
                  onChange={(e) => setExpYears(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Highest Education Degree</label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="e.g. B.Tech in Computer Science - IIT Bombay"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SKILLS MANAGEMENT */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Technical Skills & Expertise</span>
          </h3>

          <p className="text-xs text-slate-400">Skills are weighted heavily in AI match score calculations.</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center space-x-1.5">
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-red-400 p-0.5 rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          {/* Add skill input */}
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="text"
              placeholder="Add skill (e.g. PyTorch, Docker, Kafka)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </button>
          </div>
        </div>

        {/* WORK PREFERENCES */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Job Preferences</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Preferred Location</label>
              <select
                value={prefLoc}
                onChange={(e) => setPrefLoc(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Pune">Pune</option>
                <option value="Remote">Remote Only</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Preferred Work Setup</label>
              <select
                value={prefWorkType}
                onChange={(e) => setPrefWorkType(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>
        </div>

        {/* RESUME UPLOAD UI */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Upload className="w-4 h-4 text-blue-400" />
            <span>Resume / CV Document</span>
          </h3>

          <div className="p-6 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl text-center bg-slate-950/60 space-y-2 cursor-pointer transition">
            <Upload className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-xs font-semibold text-white">Drag & drop your updated PDF resume or click to upload</p>
            <p className="text-[11px] text-slate-400">Current attached file: <span className="text-indigo-300 font-mono">Priya_Sharma_Resume_DataScientist.pdf</span></p>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={saving}
          className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-xl shadow-indigo-600/30 transition flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving Candidate Profile...' : 'Save Profile & Recalculate AI Vectors'}</span>
        </button>

      </form>

    </div>
  );
}
