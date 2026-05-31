'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Sparkles, Loader2 } from 'lucide-react';

export default function SummaryForm() {
  const { data, updateSummary } = useResumeStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    // Collect context for the AI
    const context = `
      Name: ${data.personal.fullName}
      Current Skills: ${data.skills.join(', ')}
      Recent Experience: ${data.experience.map(e => e.position).join(', ')}
    `;

    try {
      setIsGenerating(true);
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: context, type: 'summary' })
      });
      
      const result = await res.json();
      if (result.content) {
        updateSummary(result.content);
      }
    } catch (error) {
      console.error("Failed to generate summary", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Write a brief 2-3 sentence summary of your professional background.</p>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center space-x-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
          <span>{isGenerating ? 'Writing...' : 'AI Write'}</span>
        </button>
      </div>
      
      <textarea 
        value={data.summary}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="e.g. Dedicated software engineer with 5+ years of experience in full-stack development..."
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
      />
    </div>
  );
}
