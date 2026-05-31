'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, FileText, ArrowRight } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as any }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-[500px] opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-transparent dark:from-blue-900/30" />
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10 w-full">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mt-12 md:mt-24 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-8 font-medium text-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Resume Generation</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            Land your dream job with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">perfect resume</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create professional, ATS-friendly resumes in minutes. Our advanced AI suggests content, improves grammar, and tailors your resume for your dream role.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/builder" className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              <span>Create My Resume</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/templates" className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-gray-900 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-white/10 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
              <span>View Templates</span>
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Free to start
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              ATS-friendly
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              No credit card required
            </div>
          </motion.div>
        </motion.div>

        {/* Product Preview Image / Mockup */}
        <motion.div 
          className="mt-20 md:mt-32 relative mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent z-10 bottom-0 h-32" />
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
            <div className="h-12 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-white/10 flex items-center px-4 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 h-[400px]">
              <div className="col-span-1 space-y-4">
                <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-md w-3/4" />
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-full" />
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-full" />
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-5/6" />
                
                <div className="pt-6">
                  <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded-md w-1/2 mb-4" />
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-full mb-2" />
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-full mb-2" />
                </div>
              </div>
              <div className="col-span-2 space-y-6">
                <div>
                  <div className="h-8 bg-blue-50 dark:bg-blue-900/30 rounded-md w-1/3 mb-4" />
                  <div className="h-24 bg-gray-50 dark:bg-gray-800 rounded-lg w-full border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                     <span className="text-gray-400 dark:text-gray-500 text-sm flex items-center"><Sparkles className="w-4 h-4 mr-2"/> AI generating summary...</span>
                  </div>
                </div>
                <div>
                  <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded-md w-1/4 mb-4" />
                  <div className="space-y-3">
                    <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-md w-full" />
                    <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-md w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <div id="features" className="py-24 mt-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Everything you need to stand out</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Our toolkit provides all the features necessary to build a compelling resume that passes ATS and wows recruiters.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI Content Generator</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Instantly generate professional summaries, bullet points, and skills tailored to your target job title.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">ATS-Friendly Templates</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Choose from a variety of modern, clean templates specifically designed to pass Applicant Tracking Systems.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Real-time Score</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Get instant feedback on your resume's strength and identify missing keywords based on job descriptions.</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
