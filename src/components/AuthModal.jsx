import React, { useState } from 'react';
import { X, Mail, Lock, User, Briefcase, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState('candidate');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [targetRole, setTargetRole] = useState('Data Scientist / Engineer');
  const [company, setCompany] = useState('Tech Solutions Inc');
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotModal, setForgotModal] = useState(false);

  // Errors & Loading
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!email) errs.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email address';

    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';

    if (isSignUp) {
      if (!name) errs.name = 'Full name is required';
      if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        role: selectedRole,
        user: {
          id: selectedRole === 'candidate' ? 'cand_1' : 'rec_1',
          name: name || (selectedRole === 'candidate' ? 'Priya Sharma' : 'Dr. Vikram Sethi'),
          email,
          company: selectedRole === 'recruiter' ? company : undefined,
          target_role: selectedRole === 'candidate' ? targetRole : undefined
        }
      });
      onClose();
    }, 600);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setForgotModal(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-b border-slate-800 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Career<span className="text-indigo-400">Pulse</span></span>
          </div>

          <p className="text-xs text-slate-400">
            {isSignUp ? 'Create your account to unlock AI-powered job matching' : 'Welcome back! Sign in to access your dashboard'}
          </p>

          {/* Role selector tabs */}
          <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setSelectedRole('candidate')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                selectedRole === 'candidate'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Candidate</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('recruiter')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                selectedRole === 'recruiter'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Recruiter</span>
            </button>
          </div>
        </div>

        {/* Main Form */}
        <div className="p-6 space-y-4">
          
          {forgotModal ? (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <h3 className="text-sm font-semibold text-white">Reset Your Password</h3>
              <p className="text-xs text-slate-400">Enter your registered email address and we'll send a password reset verification link.</p>
              
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {forgotSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-xs text-emerald-400 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Reset link sent to your email!</span>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setForgotModal(false)}
                  className="w-1/2 py-2 text-xs font-medium text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700"
                >
                  Back to Sign In
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {isSignUp && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder={selectedRole === 'candidate' ? 'e.g. Priya Sharma' : 'e.g. Dr. Vikram Sethi'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 bg-slate-950 border ${errors.name ? 'border-red-500' : 'border-slate-800'} rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500`}
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-red-400 mt-0.5">{errors.name}</p>}
                </div>
              )}

              {isSignUp && selectedRole === 'candidate' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Role / Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Data Scientist / Full Stack Dev"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              {isSignUp && selectedRole === 'recruiter' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization Name</label>
                  <input
                    type="text"
                    placeholder="e.g. NeuralPulse Tech"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder={selectedRole === 'candidate' ? 'priya.sharma@example.com' : 'vikram.sethi@neuralpulse.ai'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 bg-slate-950 border ${errors.email ? 'border-red-500' : 'border-slate-800'} rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-400 mt-0.5">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 bg-slate-950 border ${errors.password ? 'border-red-500' : 'border-slate-800'} rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500`}
                  />
                </div>
                {errors.password && <p className="text-[11px] text-red-400 mt-0.5">{errors.password}</p>}
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 bg-slate-950 border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-800'} rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500`}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-[11px] text-red-400 mt-0.5">{errors.confirmPassword}</p>}
                </div>
              )}

              {!isSignUp && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500 text-xs"
                    />
                    <span className="text-xs text-slate-400">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModal(true)}
                    className="text-xs text-indigo-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{isSignUp ? `Register as ${selectedRole === 'candidate' ? 'Candidate' : 'Recruiter'}` : 'Sign In to CareerPulse'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Demo quick auto-fill buttons */}
              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-500 mb-2">Or Quick Fill Demo Account Credentials:</p>
                <div className="flex justify-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('candidate');
                      setEmail('priya.sharma@example.com');
                      setPassword('password123');
                    }}
                    className="px-2.5 py-1 text-[11px] bg-slate-800 text-indigo-300 rounded-lg border border-slate-700 hover:bg-slate-700"
                  >
                    Demo Candidate
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('recruiter');
                      setEmail('vikram.sethi@neuralpulse.ai');
                      setPassword('password123');
                    }}
                    className="px-2.5 py-1 text-[11px] bg-slate-800 text-purple-300 rounded-lg border border-slate-700 hover:bg-slate-700"
                  >
                    Demo Recruiter
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* Social login UI */}
          {!forgotModal && (
            <div className="pt-4 border-t border-slate-800 text-center">
              <p className="text-[11px] text-slate-500 mb-2">Or continue with single sign-on</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmail(selectedRole === 'candidate' ? 'priya.sharma@example.com' : 'vikram.sethi@neuralpulse.ai');
                    setPassword('password123');
                  }}
                  className="py-1.5 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 hover:bg-slate-800 flex items-center justify-center space-x-2"
                >
                  <span className="font-bold text-red-400">G</span>
                  <span>Google SSO</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail(selectedRole === 'candidate' ? 'priya.sharma@example.com' : 'vikram.sethi@neuralpulse.ai');
                    setPassword('password123');
                  }}
                  className="py-1.5 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 hover:bg-slate-800 flex items-center justify-center space-x-2"
                >
                  <span className="font-bold text-blue-400">in</span>
                  <span>LinkedIn SSO</span>
                </button>
              </div>
            </div>
          )}

          <div className="text-center pt-2">
            <button
              onClick={() => { setIsSignUp(!isSignUp); setErrors({}); }}
              className="text-xs text-slate-400 hover:text-indigo-400 transition"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
