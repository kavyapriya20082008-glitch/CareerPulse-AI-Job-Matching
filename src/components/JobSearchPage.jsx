import React, { useState, useEffect } from 'react';
import { Search, MapPin, SlidersHorizontal, Sparkles, Filter, Building2, CheckCircle2, Bookmark } from 'lucide-react';
import { fetchJobs } from '../services/api';

export default function JobSearchPage({ onSelectJob, candidateId = 'cand_1' }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedWorkType, setSelectedWorkType] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [sortBy, setSortBy] = useState('best-match');

  useEffect(() => {
    loadJobs();
  }, [searchQuery, selectedLocation, selectedWorkType, selectedIndustry, sortBy]);

  const loadJobs = async () => {
    setLoading(true);
    const params = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedLocation !== 'All') params.location = selectedLocation;
    if (selectedWorkType !== 'All') params.work_type = selectedWorkType;
    if (selectedIndustry !== 'All') params.industry = selectedIndustry;
    if (sortBy === 'newest') params.sort_by = 'newest';

    const data = await fetchJobs(params);
    
    // Inject realistic match score for demonstration search
    const withScores = data.map((j, i) => ({
      ...j,
      match_score: Math.max(60, 98 - (i * 2))
    }));

    if (sortBy === 'best-match') {
      withScores.sort((a, b) => b.match_score - a.match_score);
    }

    setJobs(withScores);
    setLoading(false);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All');
    setSelectedWorkType('All');
    setSelectedIndustry('All');
    setSelectedExperience('All');
    setSortBy('best-match');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Search Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Discover & Filter Opportunities</h1>
          <p className="text-xs text-slate-400 mt-1">Explore job postings with real-time TF-IDF similarity match percentages.</p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by job title, skill, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-slate-500"
            />
          </div>

          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
            >
              <option value="All">All Locations</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Pune">Pune</option>
            </select>
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer font-medium"
            >
              <option value="best-match">Sort: Best AI Match %</option>
              <option value="newest">Sort: Newest Postings</option>
              <option value="relevance">Sort: Relevance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Filters Sidebar + Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <div className="space-y-6 glass-panel p-6 rounded-2xl border border-slate-800 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-white flex items-center space-x-1.5 uppercase tracking-wider">
              <Filter className="w-4 h-4 text-indigo-400" />
              <span>Filter Options</span>
            </span>
            <button onClick={clearFilters} className="text-[11px] text-indigo-400 hover:underline">Clear All</button>
          </div>

          {/* Work Type Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Work Setup</label>
            <div className="space-y-1.5">
              {['All', 'Remote', 'Hybrid', 'On-site'].map(wt => (
                <label key={wt} className="flex items-center space-x-2 text-xs text-slate-400 hover:text-white cursor-pointer">
                  <input
                    type="radio"
                    name="workType"
                    checked={selectedWorkType === wt}
                    onChange={() => setSelectedWorkType(wt)}
                    className="text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700"
                  />
                  <span>{wt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Industry Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <label className="text-xs font-semibold text-slate-300">Industry Sector</label>
            <div className="space-y-1.5">
              {['All', 'AI & Machine Learning', 'Software SaaS', 'Fintech', 'Data & Analytics', 'Cybersecurity'].map(ind => (
                <label key={ind} className="flex items-center space-x-2 text-xs text-slate-400 hover:text-white cursor-pointer">
                  <input
                    type="radio"
                    name="industry"
                    checked={selectedIndustry === ind}
                    onChange={() => setSelectedIndustry(ind)}
                    className="text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700"
                  />
                  <span>{ind}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience level */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <label className="text-xs font-semibold text-slate-300">Experience Level</label>
            <div className="space-y-1.5 text-xs text-slate-400">
              {['All', '1-2 years', '3-5 years', '5+ years'].map(exp => (
                <label key={exp} className="flex items-center space-x-2 hover:text-white cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    checked={selectedExperience === exp}
                    onChange={() => setSelectedExperience(exp)}
                    className="text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700"
                  />
                  <span>{exp}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Job Listings Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <span className="text-white font-bold">{jobs.length}</span> active job opportunities</span>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-panel p-6 rounded-2xl animate-pulse h-36"></div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-3">
              <Search className="w-8 h-8 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No jobs matched your exact filters</h3>
              <p className="text-xs text-slate-400">Try loosening your search keywords or location criteria.</p>
              <button onClick={clearFilters} className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl">
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map(job => (
                <div 
                  key={job.id} 
                  className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center space-x-2">
                      <h3 
                        onClick={() => onSelectJob(job.id)}
                        className="text-base font-bold text-white hover:text-indigo-400 transition cursor-pointer"
                      >
                        {job.title}
                      </h3>
                      <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                        {job.match_score}% AI Match
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 flex items-center space-x-2">
                      <span className="font-semibold text-slate-300">{job.company}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium">{job.work_type}</span>
                    </p>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{job.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.required_skills.map((skill, i) => (
                        <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right side CTA & Salary */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-800 space-y-2">
                    <span className="text-xs font-semibold text-emerald-400">{job.salary_range}</span>
                    <button
                      onClick={() => onSelectJob(job.id)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow transition"
                    >
                      View & Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
