import React, { useState } from 'react';
import { 
  Sparkles, Briefcase, UserCheck, Shield, Award, 
  Menu, X, LogIn, LogOut, ChevronDown, Activity, PlusCircle, LayoutDashboard, Search
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  userRole, 
  setUserRole, 
  currentUser, 
  setIsAuthOpen,
  onLogout 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
  };

  const switchRole = (newRole) => {
    setUserRole(newRole);
    setRoleDropdownOpen(false);
    if (newRole === 'candidate') {
      setCurrentTab('candidate-dashboard');
    } else if (newRole === 'recruiter') {
      setCurrentTab('recruiter-dashboard');
    } else if (newRole === 'jury-demo') {
      setCurrentTab('jury-demo');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabClick('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Activity className="w-6 h-6 text-white animate-pulse-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-white">Career<span className="text-indigo-400">Pulse</span></span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded">AI Engine</span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Intelligent Job Application Matching</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => handleTabClick('landing')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'landing' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>

            {userRole === 'candidate' && (
              <>
                <button
                  onClick={() => handleTabClick('candidate-dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                    currentTab === 'candidate-dashboard' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => handleTabClick('jobs')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                    currentTab === 'jobs' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Find Jobs</span>
                </button>
                <button
                  onClick={() => handleTabClick('recommendations')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                    currentTab === 'recommendations' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>AI Recommendations</span>
                </button>
                <button
                  onClick={() => handleTabClick('applications')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentTab === 'applications' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Applications
                </button>
                <button
                  onClick={() => handleTabClick('candidate-profile')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentTab === 'candidate-profile' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  My Profile
                </button>
              </>
            )}

            {userRole === 'recruiter' && (
              <>
                <button
                  onClick={() => handleTabClick('recruiter-dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                    currentTab === 'recruiter-dashboard' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => handleTabClick('recruiter-jobs')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentTab === 'recruiter-jobs' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  My Job Postings
                </button>
                <button
                  onClick={() => handleTabClick('post-job')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                    currentTab === 'post-job' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <PlusCircle className="w-4 h-4 text-emerald-400" />
                  <span>Post Job</span>
                </button>
                <button
                  onClick={() => handleTabClick('applicant-management')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentTab === 'applicant-management' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Applicants
                </button>
              </>
            )}

            {/* Presentation Mode Link (College Jury Special) */}
            <button
              onClick={() => handleTabClick('jury-demo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase border transition-all flex items-center space-x-1.5 ${
                currentTab === 'jury-demo'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-md shadow-indigo-500/20'
                  : 'bg-slate-800/80 text-purple-300 border-purple-500/30 hover:bg-purple-900/30 hover:border-purple-400'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-yellow-400" />
              <span>Project Jury Demo</span>
            </button>

            <button
              onClick={() => handleTabClick('privacy')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'privacy' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 hover:text-white'
              }`}
            >
              Privacy
            </button>
          </div>

          {/* Right Controls: Role Switcher & Auth */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700/80 text-xs text-slate-200 px-3 py-1.5 rounded-full border border-slate-700 transition"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-medium capitalize">
                  {userRole === 'candidate' ? 'Candidate View' : userRole === 'recruiter' ? 'Recruiter View' : 'Jury Presentation'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-1 z-50">
                  <div className="px-3 py-2 border-b border-slate-700/60">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Switch Active Role</p>
                  </div>
                  <button
                    onClick={() => switchRole('candidate')}
                    className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-700 flex items-center justify-between"
                  >
                    <span className="flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-indigo-400" />
                      <span>Candidate View</span>
                    </span>
                    {userRole === 'candidate' && <span className="text-emerald-400 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => switchRole('recruiter')}
                    className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-700 flex items-center justify-between"
                  >
                    <span className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-purple-400" />
                      <span>Recruiter View</span>
                    </span>
                    {userRole === 'recruiter' && <span className="text-emerald-400 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => switchRole('jury-demo')}
                    className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-700 flex items-center justify-between"
                  >
                    <span className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span>Jury Presentation</span>
                    </span>
                    {userRole === 'jury-demo' && <span className="text-emerald-400 font-bold">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Auth Action */}
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-400 capitalize">{userRole}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md shadow-indigo-600/30 transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs text-slate-400">Current Role:</span>
            <div className="flex space-x-1">
              <button
                onClick={() => switchRole('candidate')}
                className={`px-2.5 py-1 text-xs rounded-md ${userRole === 'candidate' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                Candidate
              </button>
              <button
                onClick={() => switchRole('recruiter')}
                className={`px-2.5 py-1 text-xs rounded-md ${userRole === 'recruiter' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                Recruiter
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleTabClick('landing')}
              className="text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg"
            >
              Home
            </button>

            {userRole === 'candidate' && (
              <>
                <button onClick={() => handleTabClick('candidate-dashboard')} className="text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg">Dashboard</button>
                <button onClick={() => handleTabClick('jobs')} className="text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg">Find Jobs</button>
                <button onClick={() => handleTabClick('recommendations')} className="text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg">AI Recommendations</button>
                <button onClick={() => handleTabClick('applications')} className="text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg">My Applications</button>
                <button onClick={() => handleTabClick('candidate-profile')} className="text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg">My Profile</button>
              </>
            )}

            {userRole === 'recruiter' && (
              <>
                <button onClick={() => handleTabClick('recruiter-dashboard')} className="text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg">Recruiter Dashboard</button>
                <button onClick={() => handleTabClick('recruiter-jobs')} className="text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg">My Jobs</button>
                <button onClick={() => handleTabClick('post-job')} className="text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg">Post a Job</button>
                <button onClick={() => handleTabClick('applicant-management')} className="text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-lg">Applicants</button>
              </>
            )}

            <button onClick={() => handleTabClick('jury-demo')} className="text-left px-3 py-2 text-sm text-purple-300 font-semibold bg-purple-900/20 rounded-lg">
              🏆 Project Jury Demo Mode
            </button>
            <button onClick={() => handleTabClick('privacy')} className="text-left px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 rounded-lg">Privacy & Security</button>
          </div>

          <div className="pt-3 border-t border-slate-800">
            {!currentUser ? (
              <button
                onClick={() => { setIsAuthOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-2 bg-indigo-600 text-white font-medium text-sm rounded-lg text-center"
              >
                Sign In / Register
              </button>
            ) : (
              <button
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="w-full py-2 bg-slate-800 text-red-400 font-medium text-sm rounded-lg text-center"
              >
                Logout ({currentUser.name})
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
