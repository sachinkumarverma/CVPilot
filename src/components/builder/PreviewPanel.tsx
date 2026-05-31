'use client';

import { useResumeStore } from '@/store/useResumeStore';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PreviewPanel() {
  const { data, activeTemplate } = useResumeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="w-full h-full bg-gray-200/50 dark:bg-gray-900 overflow-y-auto p-4 md:p-8 flex justify-center print:bg-white print:p-0 print:overflow-visible">
      <div id="resume-preview-container" className="w-full max-w-[850px] transition-all duration-300 print:max-w-none print:w-full">
        {renderTemplate()}
      </div>
    </div>
  );
}
