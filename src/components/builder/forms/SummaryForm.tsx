'use client';

import { useState, useEffect } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Sparkles, Loader2 } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

export default function SummaryForm() {
  const { data, updateSummary } = useResumeStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasContext = data.skills.length > 0 || data.experience.some(e => e.position || e.description);

  if (!mounted) return null;

  const handleGenerate = async () => {
    if (!data.summary && !hasContext) {
      alert("Please add some Skills or Work Experience first so the AI can write an accurate summary tailored to you!");
      return;
    }

    // Collect context for the AI
    const context = `
      Name: ${data.personal.fullName}
      Current Skills: ${data.skills.join(', ')}
      Recent Experience: ${data.experience.map(e => e.position).join(', ')}
    `;

    try {
      setIsGenerating(true);
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'enhance_bullet',
          payload: { text: data.summary || context, type: 'summary' }
        })
      });
      
      const result = await res.json();
      if (result.error) {
        alert("AI Error: " + result.error);
        return;
      }
      if (result.result) {
        updateSummary(result.result);
      }
    } catch (error) {
      console.error("Failed to generate summary", error);
      alert("Failed to connect to AI service.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Write a brief 2-3 sentence summary of your professional background.</p>
        <div className="relative group">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !hasContext}
            className="flex items-center space-x-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            <span>{isGenerating ? 'Writing...' : 'AI Write'}</span>
          </button>
          
          {/* Custom Tooltip */}
          {!hasContext && (
            <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 dark:bg-gray-800 text-white text-[10px] leading-tight rounded shadow-lg z-20 text-center pointer-events-none">
              Add Skills or Work Experience below to unlock AI generation
              <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        {!hasContext && !data.summary && !isManual && (
          <div className="absolute inset-0 z-10 bg-white/60 dark:bg-black/60 backdrop-blur-[2px] rounded-md flex flex-col items-center justify-center p-4 text-center border border-dashed border-amber-300 dark:border-amber-700/50">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col items-center max-w-sm">
              <AlertCircle className="w-6 h-6 text-amber-500 mb-2" />
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                Please add <strong className="text-blue-600 dark:text-blue-400">Skills</strong> or <strong className="text-blue-600 dark:text-blue-400">Work Experience</strong> below to unlock the AI Summary Generator.
              </p>
              <button 
                onClick={() => setIsManual(true)} 
                className="mt-3 text-xs font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline transition-colors"
              >
                Or click here to type manually
              </button>
            </div>
          </div>
        )}
        
        <textarea 
          value={data.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="e.g. Dedicated software engineer with 5+ years of experience in full-stack development..."
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y relative z-0"
        />
      </div>
    </div>
  );
}
