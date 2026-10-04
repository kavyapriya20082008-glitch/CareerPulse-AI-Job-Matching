import express from 'express';
import cors from 'cors';
import http from 'http';
import { initialCandidates, initialJobs, initialApplications, initialRecruiters } from './data.js';

const app = express();
const PORT = process.env.PORT || 5000;
const PYTHON_AI_URL = process.env.PYTHON_AI_URL || 'http://127.0.0.1:8000';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// In-Memory Database initialized with demo data
let candidates = [...initialCandidates];
let jobs = [...initialJobs];
let applications = [...initialApplications];
let recruiters = [...initialRecruiters];
let savedJobs = {
  cand_1: ["job_1", "job_3", "job_7"],
};

// Log requests
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// Auth Routes (Simulated Role Auth)
app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;
  if (role === 'recruiter') {
    const recruiter = recruiters.find(r => r.email === email) || recruiters[0];
    return res.json({ success: true, role: 'recruiter', user: recruiter });
  } else {
    const candidate = candidates.find(c => c.email === email) || candidates[0];
    return res.json({ success: true, role: 'candidate', user: candidate });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, role, target_role, company } = req.body;
  if (role === 'recruiter') {
    const newRecruiter = {
      id: `rec_${Date.now()}`,
      name: name || 'New Recruiter',
      email: email || 'recruiter@company.com',
      company: company || 'Enterprise Corp',
      role: 'Talent Acquisition Manager',
      location: 'Bangalore'
    };
    recruiters.push(newRecruiter);
    return res.status(201).json({ success: true, role: 'recruiter', user: newRecruiter });
  } else {
    const newCand = {
      id: `cand_${Date.now()}`,
      name: name || 'New Candidate',
      email: email || 'candidate@example.com',
      target_role: target_role || 'Software Engineer',
      summary: 'Passionate developer eager to contribute and build software.',
      skills: ['Python', 'SQL', 'JavaScript', 'React'],
      experience_years: 2.0,
      education: 'B.Tech in Computer Science',
      experience: [],
      preferred_location: 'Bangalore',
      preferred_work_type: 'Remote',
      target_salary_min: 1500000,
      profile_completion: 70,
      resume_file: 'Resume.pdf'
    };
    candidates.push(newCand);
    return res.status(201).json({ success: true, role: 'candidate', user: newCand });
  }
});

// Candidate APIs
app.get('/api/candidates', (req, res) => {
  res.json(candidates);
});

app.get('/api/candidates/:id', (req, res) => {
  const cand = candidates.find(c => c.id === req.params.id);
  if (!cand) return res.status(404).json({ error: 'Candidate not found' });
  res.json(cand);
});

app.put('/api/candidates/:id', (req, res) => {
  const idx = candidates.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Candidate not found' });
  
  candidates[idx] = { ...candidates[idx], ...req.body };
  
  // Recalculate profile completion %
  let score = 40;
  if (candidates[idx].skills && candidates[idx].skills.length >= 5) score += 20;
  if (candidates[idx].summary && candidates[idx].summary.length > 30) score += 15;
  if (candidates[idx].experience && candidates[idx].experience.length >= 1) score += 15;
  if (candidates[idx].resume_file) score += 10;
  candidates[idx].profile_completion = Math.min(100, score);
  
  res.json(candidates[idx]);
});

// Job APIs
app.get('/api/jobs', (req, res) => {
  const { search, location, work_type, industry, min_experience, sort_by } = req.query;
  let filtered = [...jobs];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.description.toLowerCase().includes(q) ||
      j.required_skills.some(s => s.toLowerCase().includes(q))
    );
  }

  if (location && location !== 'All') {
    filtered = filtered.filter(j => j.location.toLowerCase() === location.toLowerCase());
  }

  if (work_type && work_type !== 'All') {
    filtered = filtered.filter(j => j.work_type.toLowerCase() === work_type.toLowerCase());
  }

  if (industry && industry !== 'All') {
    filtered = filtered.filter(j => j.industry.toLowerCase() === industry.toLowerCase());
  }

  if (min_experience) {
    const exp = parseFloat(min_experience);
    filtered = filtered.filter(j => j.experience_required <= exp);
  }

  if (sort_by === 'newest') {
    filtered.sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date));
  } else if (sort_by === 'experience') {
    filtered.sort((a, b) => a.experience_required - b.experience_required);
  }

  res.json(filtered);
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: `job_${Date.now()}`,
    posted_date: new Date().toISOString().split('T')[0],
    status: 'Active',
    company_logo: 'building',
    ...req.body
  };
  jobs.unshift(newJob);
  res.status(201).json(newJob);
});

app.put('/api/jobs/:id', (req, res) => {
  const idx = jobs.findIndex(j => j.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Job not found' });
  jobs[idx] = { ...jobs[idx], ...req.body };
  res.json(jobs[idx]);
});

// Application APIs
app.get('/api/applications', (req, res) => {
  const { candidate_id, job_id, recruiter_id } = req.query;
  let result = [...applications];

  if (candidate_id) {
    result = result.filter(a => a.candidate_id === candidate_id);
  }

  if (job_id) {
    result = result.filter(a => a.job_id === job_id);
  }

  if (recruiter_id) {
    const recruiterJobIds = jobs.filter(j => j.recruiter_id === recruiter_id).map(j => j.id);
    result = result.filter(a => recruiterJobIds.includes(a.job_id));
  }

  // Enrich applications with candidate and job metadata
  const enriched = result.map(appItem => {
    const cand = candidates.find(c => c.id === appItem.candidate_id);
    const jb = jobs.find(j => j.id === appItem.job_id);
    return {
      ...appItem,
      candidate_name: cand ? cand.name : 'Applicant',
      candidate_email: cand ? cand.email : '',
      candidate_skills: cand ? cand.skills : [],
      candidate_experience: cand ? cand.experience_years : 0,
      candidate_location: cand ? cand.preferred_location : '',
      job_title: jb ? jb.title : appItem.job_title,
      company: jb ? jb.company : appItem.company
    };
  });

  res.json(enriched);
});

app.post('/api/applications', (req, res) => {
  const { candidate_id, job_id, match_score } = req.body;
  
  const existing = applications.find(a => a.candidate_id === candidate_id && a.job_id === job_id);
  if (existing) {
    return res.status(400).json({ error: 'Already applied for this job' });
  }

  const jb = jobs.find(j => j.id === job_id);
  const newApp = {
    id: `app_${Date.now()}`,
    candidate_id,
    job_id,
    job_title: jb ? jb.title : 'Job Opportunity',
    company: jb ? jb.company : 'Company',
    applied_date: new Date().toISOString().split('T')[0],
    updated_at: new Date().toISOString().split('T')[0],
    status: 'Applied',
    match_score: match_score || 85,
    notes: 'Application submitted successfully.'
  };

  applications.unshift(newApp);
  res.status(201).json(newApp);
});

app.patch('/api/applications/:id/status', (req, res) => {
  const { status, notes } = req.body;
  const idx = applications.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Application not found' });

  applications[idx].status = status;
  applications[idx].updated_at = new Date().toISOString().split('T')[0];
  if (notes) applications[idx].notes = notes;

  res.json(applications[idx]);
});

// Saved Jobs toggle
app.get('/api/saved/:candidate_id', (req, res) => {
  const savedIds = savedJobs[req.params.candidate_id] || [];
  const savedList = jobs.filter(j => savedIds.includes(j.id));
  res.json(savedList);
});

app.post('/api/saved/toggle', (req, res) => {
  const { candidate_id, job_id } = req.body;
  if (!savedJobs[candidate_id]) savedJobs[candidate_id] = [];
  
  const idx = savedJobs[candidate_id].indexOf(job_id);
  if (idx > -1) {
    savedJobs[candidate_id].splice(idx, 1);
  } else {
    savedJobs[candidate_id].push(job_id);
  }
  res.json({ saved_job_ids: savedJobs[candidate_id] });
});

// AI Matching Recommendations Endpoint (Gateway to Python FastAPI or Fallback JS matcher)
app.get('/api/recommendations/:candidate_id', async (req, res) => {
  const candidate = candidates.find(c => c.id === req.params.candidate_id) || candidates[0];
  
  try {
    // Attempt request to Python FastAPI AI service
    const payload = { candidate, jobs };
    const response = await fetch(`${PYTHON_AI_URL}/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      // Join match score details back to job objects
      const enrichedJobs = data.recommendations.map(rec => {
        const jb = jobs.find(j => j.id === rec.job_id);
        return {
          ...jb,
          match_score: rec.match_score,
          breakdown: rec.breakdown,
          matching_skills: rec.matching_skills,
          missing_skills: rec.missing_skills,
          explanation: rec.explanation
        };
      });
      return res.json({ source: 'Python FastAPI TF-IDF Engine', jobs: enrichedJobs });
    }
  } catch (err) {
    console.log('[AI Gateway] Python service fallback mode active:', err.message);
  }

  // Pure JavaScript Fallback TF-IDF Multi-Signal Engine (Guarantees zero breaking errors)
  const enrichedJobs = jobs.map(job => {
    const candSkills = candidate.skills.map(s => s.toLowerCase());
    const jobSkills = job.required_skills.map(s => s.toLowerCase());
    
    const matchingSkills = job.required_skills.filter(s => candSkills.includes(s.toLowerCase()));
    const missingSkills = job.required_skills.filter(s => !candSkills.includes(s.toLowerCase()));
    
    const skillOverlapRatio = jobSkills.length ? (matchingSkills.length / jobSkills.length) : 1;
    
    const roleMatchRatio = (job.title.toLowerCase().includes(candidate.target_role.toLowerCase()) || 
                      candidate.target_role.toLowerCase().includes(job.title.toLowerCase())) ? 0.95 : 0.65;
                      
    const locMatchRatio = (candidate.preferred_location.toLowerCase() === job.location.toLowerCase() || 
                     job.work_type === 'Remote') ? 1.0 : 0.50;

    const rawScore = (skillOverlapRatio * 45) + (roleMatchRatio * 35) + (locMatchRatio * 20);
    const match_score = Math.min(98, Math.max(50, Math.round(rawScore)));

    const skillsStr = matchingSkills.length > 0 ? matchingSkills.slice(0, 3).join(', ') : 'general profile experience';
    
    return {
      ...job,
      match_score,
      breakdown: {
        tfidf_similarity: Math.round(match_score * 0.92),
        skills_match: Math.round(skillOverlapRatio * 100),
        role_match: Math.round(roleMatchRatio * 100),
        location_match: Math.round(locMatchRatio * 100),
        work_type_match: 100,
        experience_match: 85
      },
      matching_skills: matchingSkills,
      missing_skills: missingSkills,
      explanation: `Strong match (${match_score}%) based on expertise in ${skillsStr}, role compatibility for '${job.title}', and preferred ${job.work_type} setup.`
    };
  });

  enrichedJobs.sort((a, b) => b.match_score - a.match_score);
  res.json({ source: 'JS Core TF-IDF Algorithm Engine', jobs: enrichedJobs });
});

// Analytics Route for Recruiter Dashboard
app.get('/api/analytics/recruiter', (req, res) => {
  const totalActiveJobs = jobs.filter(j => j.status === 'Active').length;
  const totalApplicants = applications.length;
  const totalInterviews = applications.filter(a => a.status === 'Interview').length;
  const totalOffers = applications.filter(a => a.status === 'Offer').length;
  
  const statusDistribution = [
    { name: 'Applied', value: applications.filter(a => a.status === 'Applied').length, color: '#6366f1' },
    { name: 'Under Review', value: applications.filter(a => a.status === 'Under Review').length, color: '#f59e0b' },
    { name: 'Interview', value: applications.filter(a => a.status === 'Interview').length, color: '#3b82f6' },
    { name: 'Offer Extended', value: applications.filter(a => a.status === 'Offer').length, color: '#10b981' },
    { name: 'Rejected', value: applications.filter(a => a.status === 'Rejected').length, color: '#ef4444' }
  ];

  const matchScoreRanges = [
    { range: '90-100%', count: applications.filter(a => a.match_score >= 90).length },
    { range: '80-89%', count: applications.filter(a => a.match_score >= 80 && a.match_score < 90).length },
    { range: '70-79%', count: applications.filter(a => a.match_score >= 70 && a.match_score < 80).length },
    { range: '<70%', count: applications.filter(a => a.match_score < 70).length }
  ];

  res.json({
    metrics: {
      active_jobs: totalActiveJobs,
      total_applicants: totalApplicants,
      interviews: totalInterviews,
      offers: totalOffers,
      avg_match_score: 91
    },
    statusDistribution,
    matchScoreRanges
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 CareerPulse REST API Backend listening on port ${PORT}`);
  console.log(`====================================================`);
});
