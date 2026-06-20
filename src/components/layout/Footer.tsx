'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/builder' || pathname === '/login') {
    return null;
  }

  return (
    <footer className="bg-white border-t border-gray-200/50 dark:bg-black dark:border-white/10 pt-16 pb-8 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8">
          <div className="w-full md:w-1/3">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">CVPilot</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              The modern, AI-powered resume builder. Create professional, ATS-friendly resumes in minutes.
            </p>
          </div>
          
          <div className="flex flex-row gap-16 md:gap-24">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-left">Product</h3>
              <ul className="space-y-3">
              <li><Link href="/features" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/templates" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Templates</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/builder" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Resume Builder</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-left">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">About</Link></li>
                <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookie-policy" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200/50 dark:border-white/10 mt-12 pt-8 flex justify-center items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} CVPilot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
