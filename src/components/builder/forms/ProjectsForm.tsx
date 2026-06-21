'use client';

import { useResumeStore } from '@/store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function ProjectsForm() {
  const { data, addProject, updateProject, removeProject } = useResumeStore();

  return (
    <div className="flex flex-col gap-2">
      {data.projects.map((proj) => (
        <div key={proj.id} className="p-4 border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 relative group">
          <button 
            onClick={() => removeProject(proj.id)}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Name</label>
              <input 
                type="text" 
                value={proj.name}
                onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                placeholder="e.g. E-Commerce Platform"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Link</label>
              <input 
                type="url" 
                value={proj.link}
                onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                placeholder="e.g. github.com/user/project"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea 
              value={proj.description}
              onChange={(e) => updateProject(proj.id, { description: e.target.value })}
              placeholder="e.g. Built a full-stack platform using Next.js and Node..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y"
            />
          </div>
          
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Technologies Used</label>
            <input 
              type="text" 
              value={proj.technologies || ''}
              onChange={(e) => updateProject(proj.id, { technologies: e.target.value })}
              placeholder="e.g. React, Node.js, MongoDB"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      ))}
      
      <button 
        onClick={addProject}
        className="flex items-center justify-center space-x-2 w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors font-medium text-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Add Project</span>
      </button>
    </div>
  );
}
