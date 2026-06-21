'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';

export default function ExperienceForm() {
  const { data, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const handleGenerate = async (id: string, position: string, company: string, currentDesc: string) => {
    if (!position && !currentDesc) return;

    const context = `
      Job Title: ${position}
      Company: ${company}
      Current Description/Notes: ${currentDesc}
    `;

    try {
      setGeneratingId(id);
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'enhance_bullet',
          payload: { text: context, type: 'experience' }
        })
      });
      
      const result = await res.json();
      if (result.error) {
        alert("AI Error: " + result.error);
        return;
      }
      if (result.result) {
        updateExperience(id, { description: result.result });
      }
    } catch (error) {
      console.error("Failed to generate experience bullet points", error);
      alert("Failed to connect to AI service.");
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {data.experience.map((exp, index) => (
        <div key={exp.id} className="p-4 border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 relative group">
          <button 
            onClick={() => removeExperience(exp.id)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Title</label>
              <input 
                type="text" 
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                placeholder="Software Engineer"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
              <input 
                type="text" 
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                placeholder="Tech Corp"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
              <input 
                type="text" 
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                placeholder="Jan 2020"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
              <input 
                type="text" 
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                placeholder="Present"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <button 
                onClick={() => handleGenerate(exp.id, exp.position, exp.company, exp.description)}
                disabled={generatingId === exp.id || (!exp.position && !exp.description)}
                title={(!exp.position && !exp.description) ? "Please enter a Job Title or Description first" : "Enhance with AI"}
                className="flex items-center space-x-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generatingId === exp.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                <span>{generatingId === exp.id ? 'Writing...' : 'AI Enhance'}</span>
              </button>
            </div>
            <textarea 
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
              placeholder="- Developed new features using React..."
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y"
            />
          </div>
        </div>
      ))}
      
      <button 
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-gray-400 hover:text-gray-800 dark:hover:border-gray-500 dark:hover:text-gray-200 transition-colors flex items-center justify-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add Experience</span>
      </button>
    </div>
  );
}
