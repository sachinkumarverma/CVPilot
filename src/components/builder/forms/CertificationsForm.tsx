'use client';

import { useResumeStore } from '@/store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function CertificationsForm() {
  const { data, addCertification, updateCertification, removeCertification } = useResumeStore();

  return (
    <div className="flex flex-col gap-2">
      {data.certifications.map((cert) => (
        <div key={cert.id} className="p-4 border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 relative group">
          <button 
            onClick={() => removeCertification(cert.id)}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Certification Name</label>
              <input 
                type="text" 
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                placeholder="e.g. AWS Solutions Architect"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Issuer</label>
              <input 
                type="text" 
                value={cert.issuer}
                onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                placeholder="e.g. Amazon Web Services"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
              <input 
                type="text" 
                value={cert.date}
                onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                placeholder="e.g. 2021"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
      ))}
      
      <button 
        onClick={addCertification}
        className="flex items-center justify-center space-x-2 w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors font-medium text-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Add Certification</span>
      </button>
    </div>
  );
}
