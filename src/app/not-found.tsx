'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="z-10 flex flex-col items-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 tracking-tighter">
          404
        </h1>
        
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Page not found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or perhaps never existed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
          <Link 
            href="/" 
            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 w-full sm:w-auto"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <button 
            onClick={() => router.back()}
            className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white px-8 py-3.5 rounded-xl font-medium transition-all w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
