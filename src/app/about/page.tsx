import Link from 'next/link';
import { ArrowLeft, Sparkles, Code, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">About CVPilot</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            We&apos;re on a mission to democratize career growth by providing an intelligent, beautifully designed, and accessible resume builder.
          </p>
        </div>

        <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            Building a modern, Applicant Tracking System (ATS) friendly resume shouldn&apos;t require an advanced degree in design or hours of frustration formatting tables in a word processor. 
            CVPilot was created to solve this problem.
          </p>
          <p>
            By leveraging cutting-edge AI, we help you translate your raw experience into compelling, professional language that stands out to recruiters and hiring managers. 
            Our platform handles the layout, the typography, and the optimizations—you just focus on your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">AI-Powered</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Smart content suggestions tailored to your industry.</p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">ATS-Optimized</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Clean, parsable code so robots can read your resume easily.</p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">User-Centric</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Beautifully crafted templates designed for readability.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
