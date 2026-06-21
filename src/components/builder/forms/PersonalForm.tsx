'use client';

import { useResumeStore } from '@/store/useResumeStore';

export default function PersonalForm() {
  const { data, updatePersonal } = useResumeStore();
  const { personal } = data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
        <input 
          type="text" 
          value={personal.fullName}
          onChange={(e) => updatePersonal({ fullName: e.target.value })}
          placeholder="e.g. Jane Doe"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
        <input 
          type="email" 
          value={personal.email}
          onChange={(e) => updatePersonal({ email: e.target.value })}
          placeholder="e.g. jane@example.com"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
        <input 
          type="tel" 
          value={personal.phone}
          onChange={(e) => updatePersonal({ phone: e.target.value })}
          placeholder="e.g. +1 234 567 890"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
        <input 
          type="text" 
          value={personal.location}
          onChange={(e) => updatePersonal({ location: e.target.value })}
          placeholder="e.g. San Francisco, CA"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Website / Portfolio</label>
        <input 
          type="url" 
          value={personal.website}
          onChange={(e) => updatePersonal({ website: e.target.value })}
          placeholder="e.g. linkedin.com/in/janedoe"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Photo</label>
        <div className="flex items-center gap-4">
          {personal.photoUrl && (
            <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
              <img src={personal.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1">
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    updatePersonal({ photoUrl: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400"
            />
          </div>
          {personal.photoUrl && (
            <button 
              onClick={() => updatePersonal({ photoUrl: '' })}
              className="text-sm text-red-500 hover:text-red-700 whitespace-nowrap font-medium px-2"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
