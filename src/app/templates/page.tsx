'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, ArrowLeft, Star, Clock, CheckCircle } from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'A clean, two-column layout perfect for tech, marketing, and modern corporate roles.',
    image: 'bg-blue-50 dark:bg-blue-900/20',
    tags: ['ATS Optimized', 'Most Popular'],
    isPremium: false,
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    description: 'Stripped back and highly readable. Excellent for traditional industries and academic CVs.',
    image: 'bg-gray-50 dark:bg-gray-800',
    tags: ['Traditional', 'High ATS Score'],
    isPremium: false,
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Stand out with bold typography and a unique layout. Ideal for designers and creatives.',
    image: 'bg-purple-50 dark:bg-purple-900/20',
    tags: ['Design Focused'],
    isPremium: true,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Commanding and authoritative layout designed to highlight leadership and impact.',
    image: 'bg-slate-100 dark:bg-slate-800',
    tags: ['C-Suite', 'Experienced'],
    isPremium: true,
  }
];

export default function TemplatesPage() {
  const router = useRouter();
  const { activeTemplate, setTemplate } = useResumeStore();

  const handleSelectTemplate = (id: string) => {
    setTemplate(id);
    router.push('/builder');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Resume Templates
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Choose from our selection of ATS-friendly templates designed by HR experts. Switch anytime without losing your data.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-4">
             <Link href="/builder" className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
              Continue to Editor
            </Link>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {templates.map((template) => (
            <div 
              key={template.id}
              className={`group relative flex flex-col bg-white dark:bg-gray-900 rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                activeTemplate === template.id 
                  ? 'border-blue-500 shadow-md shadow-blue-500/10' 
                  : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:shadow-lg'
              }`}
            >
              {/* Template Preview Mockup */}
              <div className={`h-64 ${template.image} relative border-b border-gray-200 dark:border-white/10 flex items-center justify-center p-6 overflow-hidden`}>
                <div className="w-full h-full bg-white shadow-sm rounded-sm p-4 relative overflow-hidden flex flex-col">
                  {/* Mock content */}
                  <div className="w-1/2 h-4 bg-gray-900 rounded mb-4" />
                  <div className="w-full h-1.5 bg-gray-200 rounded mb-1" />
                  <div className="w-3/4 h-1.5 bg-gray-200 rounded mb-4" />
                  
                  <div className="w-1/3 h-3 bg-blue-800 rounded mb-2 mt-2" />
                  <div className="w-full h-1 bg-gray-200 rounded mb-1" />
                  <div className="w-full h-1 bg-gray-200 rounded mb-1" />
                  <div className="w-5/6 h-1 bg-gray-200 rounded mb-4" />
                </div>
                
                {/* Active Badge overlay */}
                {activeTemplate === template.id && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
                
                {template.isPremium && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center">
                    <Star className="w-3 h-3 mr-1 fill-white" />
                    PREMIUM
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {template.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 mb-6">{template.description}</p>
                
                <button 
                  onClick={() => handleSelectTemplate(template.id)}
                  className={`w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
                    activeTemplate === template.id
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                  }`}
                >
                  {activeTemplate === template.id ? 'Currently Selected' : 'Use Template'}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
