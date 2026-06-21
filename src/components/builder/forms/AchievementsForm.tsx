'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';

export default function AchievementsForm() {
  const { data, addAchievement, updateAchievement, removeAchievement } = useResumeStore();
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const handleGenerate = async (id: string, text: string) => {
    if (!text) return;

    try {
      setGeneratingId(id);
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'enhance_bullet',
          payload: { text, type: 'achievement' }
        })
      });
      
      const result = await res.json();
      if (result.error) {
        alert("AI Error: " + result.error);
        return;
      }
      if (result.result) {
        updateAchievement(id, { description: result.result });
      }
    } catch (error) {
      console.error("Failed to enhance achievement", error);
      alert("Failed to connect to AI service.");
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {data.achievements.map((ach, index) => (
        <div key={ach.id} className="p-4 border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 relative group">
          <button 
            onClick={() => removeAchievement(ach.id)}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Achievement Description</label>
              <button 
                onClick={() => handleGenerate(ach.id, ach.description)}
                disabled={generatingId === ach.id || !ach.description}
                title={!ach.description ? "Please enter an achievement description first" : "Enhance with AI"}
                className="flex items-center space-x-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generatingId === ach.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                <span>{generatingId === ach.id ? 'Enhancing...' : 'AI Enhance'}</span>
              </button>
            </div>
            <textarea 
              value={ach.description}
              onChange={(e) => updateAchievement(ach.id, { description: e.target.value })}
              placeholder="e.g. Won 1st place in national hackathon..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y"
            />
          </div>
        </div>
      ))}
      
      <button 
        onClick={addAchievement}
        className="flex items-center justify-center space-x-2 w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors font-medium text-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Add Achievement</span>
      </button>
    </div>
  );
}
