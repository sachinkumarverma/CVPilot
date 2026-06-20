'use client';

import { useResumeStore } from '@/store/useResumeStore';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function SkillsForm() {
  const { data, updateSkills } = useResumeStore();
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    if ('key' in e && e.key !== 'Enter') return;
    
    e.preventDefault();
    const trimmedSkill = newSkill.trim();
    
    if (trimmedSkill && !data.skills.includes(trimmedSkill)) {
      updateSkills([...data.skills, trimmedSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateSkills(data.skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Add Skills</label>
        <input 
          type="text" 
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleAddSkill}
          onBlur={handleAddSkill}
          placeholder="Type a skill and press Enter (e.g. React, Python, Project Management)"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {data.skills.map((skill, idx) => (
          <div 
            key={idx} 
            className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-full text-sm border border-gray-200 dark:border-white/5"
          >
            <span>{skill}</span>
            <button 
              onClick={() => removeSkill(skill)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white ml-1 focus:outline-none"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        {data.skills.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">No skills added yet.</p>
        )}
      </div>
    </div>
  );
}
