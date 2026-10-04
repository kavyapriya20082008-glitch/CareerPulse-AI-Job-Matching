import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import LandingPage from './components/LandingPage';
import CandidateDashboard from './components/CandidateDashboard';
import JobSearchPage from './components/JobSearchPage';
import JobDetailsPage from './components/JobDetailsPage';
import ApplicationTracking from './components/ApplicationTracking';
import CandidateProfile from './components/CandidateProfile';
import RecruiterDashboard from './components/RecruiterDashboard';
import RecruiterJobManagement from './components/RecruiterJobManagement';
import ApplicantManagement from './components/ApplicantManagement';
import JuryPresentationMode from './components/JuryPresentationMode';
import PrivacyPage from './components/PrivacyPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState('landing');
  const [userRole, setUserRole] = useState('candidate'); // 'candidate' | 'recruiter' | 'jury-demo'
  const [currentUser, setCurrentUser] = useState({
    id: 'cand_1',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    target_role: 'Data Scientist / AI Engineer'
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleSelectJob = (jobId) => {
    setSelectedJobId(jobId);
    setCurrentTab('job-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = ({ role, user }) => {
    setUserRole(role);
    setCurrentUser(user);
    if (role === 'candidate') {
      setCurrentTab('candidate-dashboard');
    } else if (role === 'recruiter') {
      setCurrentTab('recruiter-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentTab('landing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userRole={userRole}
        setUserRole={setUserRole}
        currentUser={currentUser}
        setIsAuthOpen={setIsAuthOpen}
        onLogout={handleLogout}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {currentTab === 'landing' && (
          <LandingPage
            setCurrentTab={setCurrentTab}
            setIsAuthOpen={setIsAuthOpen}
            setUserRole={setUserRole}
            onSelectJob={handleSelectJob}
          />
        )}

        {currentTab === 'candidate-dashboard' && (
          <CandidateDashboard
            candidateId={currentUser?.id || 'cand_1'}
            setCurrentTab={setCurrentTab}
            onSelectJob={handleSelectJob}
          />
        )}

        {(currentTab === 'jobs' || currentTab === 'recommendations') && (
          <JobSearchPage
            onSelectJob={handleSelectJob}
            candidateId={currentUser?.id || 'cand_1'}
          />
        )}

        {currentTab === 'job-details' && (
          <JobDetailsPage
            jobId={selectedJobId || 'job_1'}
            onBack={() => setCurrentTab('jobs')}
            candidateId={currentUser?.id || 'cand_1'}
          />
        )}

        {currentTab === 'applications' && (
          <ApplicationTracking
            candidateId={currentUser?.id || 'cand_1'}
            onSelectJob={handleSelectJob}
          />
        )}

        {currentTab === 'candidate-profile' && (
          <CandidateProfile
            candidateId={currentUser?.id || 'cand_1'}
          />
        )}

        {currentTab === 'recruiter-dashboard' && (
          <RecruiterDashboard
            setCurrentTab={setCurrentTab}
            onSelectApplicant={() => setCurrentTab('applicant-management')}
          />
        )}

        {currentTab === 'recruiter-jobs' && (
          <RecruiterJobManagement
            setCurrentTab={setCurrentTab}
            onSelectJob={handleSelectJob}
            initialMode="list"
          />
        )}

        {currentTab === 'post-job' && (
          <RecruiterJobManagement
            setCurrentTab={setCurrentTab}
            onSelectJob={handleSelectJob}
            initialMode="post"
          />
        )}

        {currentTab === 'applicant-management' && (
          <ApplicantManagement />
        )}

        {currentTab === 'jury-demo' && (
          <JuryPresentationMode />
        )}

        {currentTab === 'privacy' && (
          <PrivacyPage />
        )}

      </main>

      {/* Global Footer */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
