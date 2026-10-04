import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import numpy as np
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(
    title="CareerPulse AI Matching Engine",
    description="Python FastAPI NLP service using TF-IDF and Multi-Signal Fusion for Candidate-Job Matching",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class CandidateProfile(BaseModel):
    id: Optional[str] = "cand_1"
    name: Optional[str] = "Candidate"
    target_role: str
    summary: str
    skills: List[str]
    experience_years: float
    preferred_location: str
    preferred_work_type: str

class JobPosting(BaseModel):
    id: str
    title: str
    company: str
    description: str
    required_skills: List[str]
    experience_required: float
    location: str
    work_type: str
    industry: Optional[str] = "Technology"

class MatchRequest(BaseModel):
    candidate: CandidateProfile
    jobs: List[JobPosting]

class PipelineDemoRequest(BaseModel):
    candidate_summary: str
    candidate_skills: List[str]
    job_title: str
    job_description: str
    job_skills: List[str]

def clean_text(text: str) -> str:
    """Preprocess and clean text for TF-IDF vectorization."""
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s#\+]', ' ', text)  # Keep # and + for C#, C++
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def calculate_skills_overlap(cand_skills: List[str], job_skills: List[str]):
    cand_set = {clean_text(s) for s in cand_skills if s}
    job_set = {clean_text(s) for s in job_skills if s}
    
    if not job_set:
        return 1.0, list(cand_skills), []
        
    matching = cand_set.intersection(job_set)
    missing = job_set - cand_set
    
    overlap_score = len(matching) / len(job_set) if job_set else 0.0
    return overlap_score, [s for s in cand_skills if clean_text(s) in matching], [s for s in job_skills if clean_text(s) in missing]

def calculate_location_score(pref_loc: str, job_loc: str, pref_wt: str, job_wt: str) -> float:
    pref_loc_clean = clean_text(pref_loc)
    job_loc_clean = clean_text(job_loc)
    pref_wt_clean = clean_text(pref_wt)
    job_wt_clean = clean_text(job_wt)
    
    if "remote" in job_wt_clean or "remote" in pref_wt_clean:
        return 1.0
    if pref_loc_clean == job_loc_clean or "anywhere" in pref_loc_clean or "remote" in pref_loc_clean:
        return 1.0
    if pref_loc_clean in job_loc_clean or job_loc_clean in pref_loc_clean:
        return 0.85
    return 0.40

def calculate_work_type_score(pref_wt: str, job_wt: str) -> float:
    p = clean_text(pref_wt)
    j = clean_text(job_wt)
    if p == j or "any" in p or "remote" in p:
        return 1.0
    if ("hybrid" in p and "on-site" in j) or ("on-site" in p and "hybrid" in j):
        return 0.75
    return 0.50

def calculate_exp_score(cand_exp: float, job_exp: float) -> float:
    if cand_exp >= job_exp:
        return 1.0
    diff = job_exp - cand_exp
    if diff <= 1.0:
        return 0.85
    elif diff <= 2.0:
        return 0.65
    else:
        return 0.40

@app.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "CareerPulse AI Matching Engine",
        "engine": "TF-IDF + Cosine Similarity + Multi-Signal Fusion",
        "version": "1.0.0"
    }

@app.post("/match")
def match_candidate_jobs(req: MatchRequest):
    cand = req.candidate
    jobs = req.jobs
    
    if not jobs:
        return {"recommendations": []}

    # Prepare document texts for TF-IDF
    cand_text = f"{clean_text(cand.target_role)} {' '.join([clean_text(s) for s in cand.skills])} {clean_text(cand.summary)}"
    
    job_texts = []
    for j in jobs:
        j_text = f"{clean_text(j.title)} {' '.join([clean_text(s) for s in j.required_skills])} {clean_text(j.description)}"
        job_texts.append(j_text)
        
    corpus = [cand_text] + job_texts
    
    # TF-IDF Vectorization
    vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
    tfidf_matrix = vectorizer.fit_transform(corpus)
    
    cand_vec = tfidf_matrix[0:1]
    job_vecs = tfidf_matrix[1:]
    
    cosine_sims = cosine_similarity(cand_vec, job_vecs)[0]
    
    results = []
    for idx, job in enumerate(jobs):
        tfidf_score = float(cosine_sims[idx])
        
        # Calculate sub-scores
        skills_score, matching_skills, missing_skills = calculate_skills_overlap(cand.skills, job.required_skills)
        
        # Role score
        cand_role = clean_text(cand.target_role)
        job_role = clean_text(job.title)
        role_score = 1.0 if cand_role in job_role or job_role in cand_role else (0.70 if any(w in job_role for w in cand_role.split()) else 0.40)
        
        location_score = calculate_location_score(cand.preferred_location, job.location, cand.preferred_work_type, job.work_type)
        wt_score = calculate_work_type_score(cand.preferred_work_type, job.work_type)
        exp_score = calculate_exp_score(cand.experience_years, job.experience_required)
        
        # Multi-signal fused score (0-100 scale)
        weighted_score = (
            (tfidf_score * 0.35) +
            (skills_score * 0.30) +
            (role_score * 0.15) +
            (location_score * 0.10) +
            (wt_score * 0.05) +
            (exp_score * 0.05)
        )
        
        # Convert to percentage integer 50-98 for realism
        match_percentage = int(np.clip(round(weighted_score * 100), 45, 99))
        
        # Create human-readable explainable text
        skills_str = ", ".join(matching_skills[:4]) if matching_skills else "general profile background"
        explanation = f"Strong match ({match_percentage}%) based on expertise in {skills_str}, matching target role '{job.title}', and preferred {job.work_type} work setup."

        results.append({
            "job_id": job.id,
            "match_score": match_percentage,
            "breakdown": {
                "tfidf_similarity": int(round(tfidf_score * 100)),
                "skills_match": int(round(skills_score * 100)),
                "role_match": int(round(role_score * 100)),
                "location_match": int(round(location_score * 100)),
                "work_type_match": int(round(wt_score * 100)),
                "experience_match": int(round(exp_score * 100))
            },
            "matching_skills": matching_skills,
            "missing_skills": missing_skills,
            "explanation": explanation
        })

    # Sort descending by match score
    results.sort(key=lambda x: x["match_score"], reverse=True)
    return {"recommendations": results}

@app.post("/pipeline-demo")
def pipeline_demo(req: PipelineDemoRequest):
    """Detailed NLP pipeline step preview for Jury Presentation."""
    cand_raw = f"{req.candidate_summary} {' '.join(req.candidate_skills)}"
    job_raw = f"{req.job_title} {req.job_description} {' '.join(req.job_skills)}"
    
    cand_clean = clean_text(cand_raw)
    job_clean = clean_text(job_raw)
    
    corpus = [cand_clean, job_clean]
    vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
    tfidf_matrix = vectorizer.fit_transform(corpus)
    
    feature_names = vectorizer.get_feature_names_out()
    cand_vector_arr = tfidf_matrix[0].toarray()[0]
    job_vector_arr = tfidf_matrix[1].toarray()[0]
    
    # Extract top features with high weights
    top_tokens = []
    for i, feature in enumerate(feature_names):
        w_c = cand_vector_arr[i]
        w_j = job_vector_arr[i]
        if w_c > 0 or w_j > 0:
            top_tokens.append({
                "token": feature,
                "candidate_tfidf": float(round(w_c, 4)),
                "job_tfidf": float(round(w_j, 4)),
                "product": float(round(w_c * w_j, 4))
            })
            
    top_tokens.sort(key=lambda x: x["product"], reverse=True)
    cos_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    
    return {
        "step_1_cleaning": {
            "cand_cleaned_tokens_count": len(cand_clean.split()),
            "job_cleaned_tokens_count": len(job_clean.split()),
            "sample_cleaned_candidate_text": cand_clean[:180] + "..."
        },
        "step_2_vectorization": {
            "total_vocabulary_size": len(feature_names),
            "top_matching_ngrams": top_tokens[:12]
        },
        "step_3_cosine_similarity": {
            "raw_cosine_similarity": float(round(cos_sim, 4)),
            "percentage_similarity": int(round(cos_sim * 100))
        }
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
