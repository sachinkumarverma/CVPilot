'use client';

import { useState } from 'react';
import EditorPanel from '@/components/builder/EditorPanel';
import PreviewPanel from '@/components/builder/PreviewPanel';
import { useResumeStore } from '@/store/useResumeStore';
import { Download, Sparkles, Layout, X, Check } from 'lucide-react';

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const { activeTemplate, setTemplate } = useResumeStore();
  
  const handleTemplateSelect = (templateId: string) => {
    setTemplate(templateId);
    setIsTemplatesModalOpen(false);
  };

  return (
    <div className="flex flex-col flex-1 h-[calc(100vh-64px)] overflow-hidden bg-gray-50 dark:bg-gray-950 relative print:h-auto print:bg-white print:block">
      {/* Builder Toolbar */}
      <div className="flex-none h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 sm:px-6 shadow-sm z-10 print:hidden">
        <div className="flex items-center space-x-4">
          <h1 className="font-semibold text-gray-900 dark:text-white hidden sm:block">Untitled Resume</h1>
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'editor' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              Editor
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors sm:hidden ${activeTab === 'preview' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              Preview
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800/50">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">AI Optimize</span>
          </button>
          
          <button 
            onClick={() => setIsTemplatesModalOpen(true)}
            className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 shadow-sm"
          >
            <Layout className="w-4 h-4" />
            <span className="hidden sm:inline">Templates</span>
          </button>
          
          <button 
            onClick={() => window.print()}
            className="flex items-center space-x-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-lg shadow-sm print:hidden"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden print:overflow-visible print:block">
        {/* Editor Panel (Left) */}
        <div className={`w-full md:w-1/2 lg:w-[45%] h-full border-r border-gray-200 dark:border-white/10 bg-white dark:bg-black overflow-y-auto ${activeTab === 'preview' ? 'hidden md:block' : 'block'} print:hidden`}>
          <EditorPanel />
        </div>
        
        {/* Preview Panel (Right) */}
        <div className={`w-full md:w-1/2 lg:w-[55%] h-full bg-gray-100 dark:bg-gray-900 overflow-y-auto p-4 sm:p-8 flex justify-center ${activeTab === 'editor' ? 'hidden md:flex' : 'flex'} print:w-full print:block print:p-0`}>
          <PreviewPanel />
        </div>
      </div>

      {/* Templates Modal Overlay */}
      {isTemplatesModalOpen && (
        <div className="absolute inset-0 z-50 flex bg-black/50 backdrop-blur-sm">
          {/* Drawer from right */}
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <Layout className="w-5 h-5 mr-2" />
                Select Template
              </h2>
              <button 
                onClick={() => setIsTemplatesModalOpen(false)}
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Template: Modern */}
              <button 
                onClick={() => handleTemplateSelect('modern')}
                className={`w-full group text-left rounded-xl border-2 transition-all p-4 relative ${
                  activeTemplate === 'modern' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-black'
                }`}
              >
                {activeTemplate === 'modern' && (
                  <div className="absolute top-4 right-4 text-blue-500">
                    <Check className="w-5 h-5" />
                  </div>
                )}
                <div className="font-bold text-gray-900 dark:text-white mb-1">Modern Professional</div>
                <div className="text-sm text-gray-500 mb-4">Clean, two-column style with prominent headers.</div>
                {/* Mini preview dummy */}
                <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-2 flex flex-col gap-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </button>
              
              {/* Template: Minimal */}
              <button 
                onClick={() => handleTemplateSelect('minimal')}
                className={`w-full group text-left rounded-xl border-2 transition-all p-4 relative ${
                  activeTemplate === 'minimal' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-black'
                }`}
              >
                {activeTemplate === 'minimal' && (
                  <div className="absolute top-4 right-4 text-blue-500">
                    <Check className="w-5 h-5" />
                  </div>
                )}
                <div className="font-bold text-gray-900 dark:text-white mb-1">Minimalist Serif</div>
                <div className="text-sm text-gray-500 mb-4">Traditional, clean formatting ideal for executives.</div>
                {/* Mini preview dummy */}
                <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-2 flex flex-col gap-2 items-center">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
                  <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
