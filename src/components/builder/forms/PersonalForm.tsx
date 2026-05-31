'use client';

import { useResumeStore } from '@/store/useResumeStore';

export default function PersonalForm() {
  const { data, updatePersonal } = useResumeStore();
  const { personal } = data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
        <input 
          type="text" 
          value={personal.fullName}
          onChange={(e) => updatePersonal({ fullName: e.target.value })}
          placeholder="e.g. Jane Doe"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
        <input 
          type="email" 
          value={personal.email}
          onChange={(e) => updatePersonal({ email: e.target.value })}
          placeholder="e.g. jane@example.com"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
        <input 
          type="tel" 
          value={personal.phone}
          onChange={(e) => updatePersonal({ phone: e.target.value })}
          placeholder="e.g. +1 234 567 890"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
        <input 
          type="text" 
          value={personal.location}
          onChange={(e) => updatePersonal({ location: e.target.value })}
          placeholder="e.g. San Francisco, CA"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      
      <div className="space-y-1.5 sm:col-span-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Website / Portfolio</label>
        <input 
          type="url" 
          value={personal.website}
          onChange={(e) => updatePersonal({ website: e.target.value })}
          placeholder="e.g. linkedin.com/in/janedoe"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>
    </div>
  );
}
