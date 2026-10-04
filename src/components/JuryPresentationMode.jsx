import React, { useState } from 'react';
import { 
  Award, BrainCircuit, Sparkles, CheckCircle2, ArrowRight, Play, 
  Layers, Code, Cpu, Database, Network, LineChart, FileText, ChevronRight
} from 'lucide-react';
import { runPipelineDemo } from '../services/api';

export default function JuryPresentationMode() {
  const [candText, setCandText] = useState('Experienced Data Scientist with 3+ years in Python, Machine Learning, SQL, Deep Learning, TensorFlow, NLP.');
  const [candSkills, setCandSkills] = useState(['Python', 'Machine Learning', 'SQL', 'NLP', 'TensorFlow']);
  const [jobTitle, setJobTitle] = useState('Senior Data Scientist - AI & NLP');
  const [jobDesc, setJobDesc] = useState('NeuralPulse Tech is seeking a Senior Data Scientist skilled in Python, NLP algorithms, SQL, and machine learning models.');
  const [jobSkills, setJobSkills] = useState(['Python', 'Machine Learning', 'SQL', 'NLP', 'TensorFlow', 'Scikit-Learn']);

  const [pipelineOutput, setPipelineOutput] = useState(null);
  const [runningDemo, setRunningDemo] = useState(false);

  const handleRunPipeline = async () => {
    setRunningDemo(true);
    const data = await runPipelineDemo({
      candidate_summary: candText,
      candidate_skills: candSkills,
      job_title: jobTitle,
      job_description: jobDesc,
      job_skills: jobSkills
    });
    setRunningDemo(false);
    setPipelineOutput(data);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      
      {/* JURY HERO BANNER */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/40 bg-gradient-to-r from-purple-950/50 via-indigo-950/40 to-slate-900 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Award className="w-48 h-48 text-purple-400" />
        </div>

        <div className="inline-flex items-center space-x-2 text-xs font-bold text-yellow-300 bg-yellow-500/10 px-3.5 py-1.5 rounded-full border border-yellow-500/30">
          <Award className="w-4 h-4 text-yellow-400" />
          <span>COLLEGE FINAL PROJECT DEMONSTRATION & JURY PRESENTATION MODE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          CareerPulse: AI-Driven Job Matching System
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Primary Source of Truth: <strong className="text-indigo-300">DS_PROJECT_REPORT.docx</strong>. This presentation dashboard visualizes the candidate-job NLP matching architecture, TF-IDF vectorization math, multi-signal compatibility scoring, and future roadmap.
        </p>
      </div>

      {/* PIPELINE ARCHITECTURE FLOW visualizer */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center space-x-2">
          <BrainCircuit className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">System Architecture & Pipeline Flow</h2>
        </div>

        {/* Workflow Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 items-center text-center text-xs">
          
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <User className="w-5 h-5 text-indigo-400 mx-auto" />
            <span className="font-bold text-white block">1. Candidate Profile</span>
            <span className="text-[10px] text-slate-400">Vector representation</span>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block mx-auto" />

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <Database className="w-5 h-5 text-blue-400 mx-auto" />
            <span className="font-bold text-white block">2. Job Dataset</span>
            <span className="text-[10px] text-slate-400">Text Corpus</span>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block mx-auto" />

          <div className="p-3 bg-purple-950/80 rounded-2xl border border-purple-500/40 space-y-1">
            <Code className="w-5 h-5 text-purple-400 mx-auto" />
            <span className="font-bold text-white block">3. NLP TF-IDF</span>
            <span className="text-[10px] text-purple-300">Text Cleaning & N-grams</span>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block mx-auto" />

          <div className="p-3 bg-emerald-950/80 rounded-2xl border border-emerald-500/40 space-y-1">
            <Sparkles className="w-5 h-5 text-emerald-400 mx-auto" />
            <span className="font-bold text-white block">4. Cosine Similarity</span>
            <span className="text-[10px] text-emerald-300">Signal Fusion Engine</span>
          </div>

        </div>
      </div>

      {/* PROTOTYPE vs AI LAYER vs FUTURE ROADMAP MATRIX TABLE */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-purple-400" />
          <span>Implementation Scope vs Proposed System Roadmap</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">System Tier</th>
                <th className="py-3 px-4">Current Prototype State</th>
                <th className="py-3 px-4">AI Matching Engine Specs</th>
                <th className="py-3 px-4">Future Production Enhancements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-4 px-4 font-bold text-indigo-300">Frontend Interface</td>
                <td className="py-4 px-4 text-slate-300">Interactive SaaS UI, responsive layout, glassmorphic design, dashboard charts</td>
                <td className="py-4 px-4 text-slate-300">Real-time match % score preview, progress bars</td>
                <td className="py-4 px-4 text-slate-400">Mobile native app, push notifications</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-4 px-4 font-bold text-purple-300">NLP & Matching Engine</td>
                <td className="py-4 px-4 text-slate-300">Representative candidate-job vector dataset</td>
                <td className="py-4 px-4 text-emerald-300 font-semibold">TF-IDF Vectorizer + Cosine Similarity + Multi-Signal Fusion</td>
                <td className="py-4 px-4 text-slate-400">BERT / Dense Semantic Embeddings, Learning-to-Rank (LTR)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-4 px-4 font-bold text-blue-300">Backend & Storage</td>
                <td className="py-4 px-4 text-slate-300">Node.js Express REST API, in-memory JSON DB</td>
                <td className="py-4 px-4 text-slate-300">Python FastAPI microservice API integration</td>
                <td className="py-4 px-4 text-slate-400">PostgreSQL + pgvector / Pinecone Vector DB</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-4 px-4 font-bold text-emerald-300">Resume & Auth</td>
                <td className="py-4 px-4 text-slate-300">Role-based login simulator (Candidate / Recruiter)</td>
                <td className="py-4 px-4 text-slate-300">Resume PDF preview & skill extractor simulator</td>
                <td className="py-4 px-4 text-slate-400">OCR & SpaCy Resume Named Entity Recognition (NER)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* INTERACTIVE LIVE NLP TF-IDF PIPELINE TESTER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 to-slate-900 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Live NLP TF-IDF Matrix Tester</h2>
          </div>
          <span className="text-xs text-emerald-400 font-mono bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
            Interactive Jury Tool
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Enter custom candidate text and job description to run real-time TF-IDF tokenization, cosine similarity calculation, and signal matrix generation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Candidate Profile Summary</label>
            <textarea
              rows="3"
              value={candText}
              onChange={(e) => setCandText(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Job Posting Description</label>
            <textarea
              rows="3"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>
        </div>

        <button
          onClick={handleRunPipeline}
          disabled={runningDemo}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{runningDemo ? 'Computing TF-IDF Matrix...' : 'Run Live NLP Matrix Analysis'}</span>
        </button>

        {/* PIPELINE OUTPUT DISPLAY */}
        {pipelineOutput && (
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
            
            {/* Top Cosine Result */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/30">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Cosine Similarity Score</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {pipelineOutput.step_3_cosine_similarity.percentage_similarity}%
                </span>
                <span className="text-slate-300 text-xs ml-2">
                  (Raw Cosine Sim: {pipelineOutput.step_3_cosine_similarity.raw_cosine_similarity})
                </span>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full">
                Match Verified
              </span>
            </div>

            {/* Step 1 Preprocessing */}
            <div className="space-y-1">
              <span className="font-bold text-purple-300">Step 1: Data Preprocessing & Cleaning</span>
              <p className="text-slate-400 text-[11px]">
                Candidate tokens: {pipelineOutput.step_1_cleaning.cand_cleaned_tokens_count} • Job tokens: {pipelineOutput.step_1_cleaning.job_cleaned_tokens_count}
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg text-slate-300 font-mono text-[10px]">
                Cleaned sample: "{pipelineOutput.step_1_cleaning.sample_cleaned_candidate_text}"
              </div>
            </div>

            {/* Step 2 TF-IDF N-grams */}
            <div className="space-y-2">
              <span className="font-bold text-indigo-300">Step 2: Top Vector N-grams & TF-IDF Weights</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {pipelineOutput.step_2_vectorization.top_matching_ngrams.map((item, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-white">{item.token}</span>
                    <span className="font-mono text-indigo-400 font-bold">{item.product}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}

function User(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
