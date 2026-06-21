'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { X, Sparkles, Loader2, Target, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function AIAssistantModal({ onClose }: { onClose: () => void }) {
  const { data, updateSummary, updateSkills, addExperience, updateExperience, addProject, updateProject, setDocumentName } = useResumeStore();
  
  const [tab, setTab] = useState<'generate' | 'score'>('generate');
  const [loading, setLoading] = useState(false);
  
  // Generate State
  const [jobTitle, setJobTitle] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level');
  const [skills, setSkills] = useState('');
  
  // Score State
  const [scoreResult, setScoreResult] = useState<{score: number, good: string[], improvements: string[]} | null>(null);

  const handleGenerate = async () => {
    if (!jobTitle || !skills) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_resume',
          payload: { jobTitle, experienceLevel, skills }
        })
      });
      const generated = await res.json();
      
      if (generated.summary) updateSummary(generated.summary);
      if (generated.skills) updateSkills(generated.skills);
      
      if (generated.experience && generated.experience.length > 0) {
        generated.experience.forEach((exp: Record<string, string>) => {
          const id = uuidv4();
          addExperience();
          setTimeout(() => {
            updateExperience(id, {
              company: exp.company || '',
              position: exp.position || '',
              startDate: exp.startDate || '',
              endDate: exp.endDate || '',
              description: exp.description || ''
            });
          }, 100);
        });
      }
      
      if (generated.projects && generated.projects.length > 0) {
        generated.projects.forEach((proj: Record<string, string>) => {
          const id = uuidv4();
          addProject();
          setTimeout(() => {
            updateProject(id, {
              name: proj.name || '',
              description: proj.description || '',
              link: ''
            });
          }, 100);
        });
      }
      
      setDocumentName(`${jobTitle} Resume`);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScore = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'score_resume',
          payload: { resumeData: data }
        })
      });
      const result = await res.json();
      setScoreResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Resume Assistant</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button 
            onClick={() => setTab('generate')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${tab === 'generate' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Auto-Generate
          </button>
          <button 
            onClick={() => setTab('score')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${tab === 'score' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            ATS Score Checker
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {tab === 'generate' && (
            <div className="space-y-5">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Let AI build a foundational resume for you. Enter your role and skills, and we&apos;ll generate an ATS-optimized summary, experience bullet points, and project descriptions.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Job Title</label>
                  <input 
                    type="text" 
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                    placeholder="e.g. Frontend Developer"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience Level</label>
                  <select 
                    value={experienceLevel}
                    onChange={e => setExperienceLevel(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option>Entry Level (0-2 years)</option>
                    <option>Mid-Level (3-5 years)</option>
                    <option>Senior Level (5+ years)</option>
                    <option>Executive / Lead</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Core Skills (comma separated)</label>
                  <textarea 
                    value={skills}
                    onChange={e => setSkills(e.target.value)}
                    placeholder="e.g. React, Next.js, TypeScript, Tailwind CSS"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none resize-y"
                  />
                </div>
              </div>
              
              <button 
                onClick={handleGenerate}
                disabled={loading || !jobTitle || !skills}
                className="w-full mt-4 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-colors"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                <span>{loading ? 'Generating Resume...' : 'Generate Resume Content'}</span>
              </button>
            </div>
          )}

          {tab === 'score' && (
            <div className="space-y-6">
              {!scoreResult && !loading && (
                <div className="text-center py-10">
                  <Target className="w-16 h-16 text-blue-500 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Check ATS Compatibility</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
                    Our AI will analyze your resume for keywords, grammar, impact statements, and format structure to ensure it passes ATS filters.
                  </p>
                  <button 
                    onClick={handleScore}
                    className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                  >
                    Analyze My Resume
                  </button>
                </div>
              )}

              {loading && (
                <div className="text-center py-16 flex flex-col items-center">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Analyzing resume structure and semantics...</p>
                </div>
              )}

              {scoreResult && !loading && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                  <div className="flex items-center justify-between p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
                    <div>
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">Overall ATS Score</p>
                      <h3 className="text-4xl font-black text-gray-900 dark:text-white">
                        {scoreResult.score}<span className="text-xl text-gray-500">/100</span>
                      </h3>
                    </div>
                    <div className="w-20 h-20 rounded-full border-8 border-blue-500 flex items-center justify-center bg-white dark:bg-gray-900 shadow-inner">
                      <TrendingUp className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> What looks good
                    </h4>
                    <ul className="space-y-2">
                      {scoreResult.good.map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-green-500 mr-2 mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                      <AlertCircle className="w-5 h-5 text-amber-500 mr-2" /> Areas for improvement
                    </h4>
                    <ul className="space-y-2 bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30">
                      {scoreResult.improvements.map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-amber-500 font-bold mr-2 mt-0.5">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button onClick={handleScore} className="w-full py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
                    Re-evaluate Resume
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
