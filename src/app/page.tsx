'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, FileText, ArrowRight, Mail, MapPin, Globe, User, Briefcase, Award } from 'lucide-react';

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

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 relative z-10 w-full">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mt-8 md:mt-12 max-w-4xl mx-auto"
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

          <motion.div variants={itemVariants} className="mt-8 flex justify-center">
            <a href="https://skillnora.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-300 px-6 py-3 rounded-xl font-medium text-sm hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors">
              <span>🎓 Want to build a career in Tech? Learn coding with Skillnora</span>
              <ArrowRight className="w-4 h-4" />
            </a>
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
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
            <div className="h-12 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-white/10 flex items-center px-4 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            
            {/* The Resume Preview */}
            <div className="h-[500px] overflow-y-auto bg-white text-gray-900 font-sans selection:bg-blue-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <div className="flex flex-col md:flex-row w-full min-h-full bg-white">
                {/* Left Column (Sidebar) */}
                <div className="w-full md:w-1/3 bg-[#232E35] text-white p-8 md:p-10 flex flex-col space-y-8">
                  <div className="flex justify-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300" alt="Sarah Jenkins" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight text-center">Sarah<br/>Jenkins</h2>
                    <p className="text-blue-400 font-semibold text-sm mt-2 tracking-wide text-center uppercase">Principal Engineer</p>
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-300 font-medium">
                    <div className="flex items-center"><Mail className="w-4 h-4 mr-3 text-gray-400"/> sarah.j@example.com</div>
                    <div className="flex items-center"><MapPin className="w-4 h-4 mr-3 text-gray-400"/> San Francisco, CA</div>
                    <div className="flex items-center"><Globe className="w-4 h-4 mr-3 text-gray-400"/> sarahjenkins.dev</div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-600 pb-2 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Go', 'Rust', 'Kubernetes', 'AWS', 'Kafka', 'System Design', 'GraphQL'].map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-white/10 border border-white/5 text-white text-xs font-semibold rounded-md shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-600 pb-2 mb-4">Education</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-bold text-white text-sm">M.S. Computer Science</p>
                        <p className="text-gray-400 text-xs font-medium mt-1">Stanford University, 2012-2014</p>
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">B.S. Computer Science</p>
                        <p className="text-gray-400 text-xs font-medium mt-1">UC Berkeley, 2008-2012</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-600 pb-2 mb-4">Languages</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-gray-200">English</span>
                        <span className="text-xs text-gray-400 font-medium">Native</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-gray-200">Spanish</span>
                        <span className="text-xs text-gray-400 font-medium">Professional</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-600 pb-2 mb-4">Certifications</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-bold text-white text-sm">AWS Certified Solutions Architect - Professional</p>
                        <p className="text-gray-400 text-xs font-medium mt-1">Amazon Web Services, 2021</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (Main Content) */}
                <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col space-y-8 bg-white">
                  <div>
                    <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest border-b border-gray-200 pb-2 mb-4 flex items-center">
                      <User className="w-4 h-4 mr-2"/> Professional Summary
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-medium">
                      Visionary Principal Software Engineer with 12+ years of experience architecting highly available distributed systems and leading global engineering organizations. Proven track record of designing infrastructure that scales to millions of concurrent users while reducing operational costs.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest border-b border-gray-200 pb-2 mb-4 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2"/> Work Experience
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Job 1 */}
                      <div>
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="font-bold text-gray-900 text-base">Principal Engineer <span className="text-gray-500 font-medium">at InnovateCorp</span></h4>
                          <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-md">2018 - Present</span>
                        </div>
                        <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-2 font-medium">
                          <li>Architected a multi-region active-active cloud infrastructure on AWS, increasing system reliability to 99.999% for 50M+ active users.</li>
                          <li>Directed a 40-person engineering org across 4 cross-functional teams, reducing time-to-market for core features by 60%.</li>
                        </ul>
                      </div>
                      
                      {/* Job 2 */}
                      <div>
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="font-bold text-gray-900 text-base">Senior Software Engineer <span className="text-gray-500 font-medium">at CloudSync</span></h4>
                          <span className="text-xs text-gray-500 font-bold bg-gray-50 px-2 py-1 rounded-md border border-gray-100">2014 - 2018</span>
                        </div>
                        <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-2 font-medium">
                          <li>Designed and implemented a distributed event-streaming platform using Apache Kafka, processing 5B+ events daily with sub-10ms latency.</li>
                          <li>Optimized database indexing strategies and query execution plans, resulting in a 45% reduction in RDS cloud costs.</li>
                        </ul>
                      </div>
                      
                      {/* Job 3 */}
                      <div>
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="font-bold text-gray-900 text-base">Software Engineer <span className="text-gray-500 font-medium">at StartUp Inc</span></h4>
                          <span className="text-xs text-gray-500 font-bold bg-gray-50 px-2 py-1 rounded-md border border-gray-100">2012 - 2014</span>
                        </div>
                        <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-2 font-medium">
                          <li>Developed core backend microservices in Go, handling concurrent transaction processing for the flagship payment gateway.</li>
                          <li>Built robust CI/CD pipelines using Jenkins and Docker, enabling multiple seamless deployments per day.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Projects Section */}
                  <div>
                    <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest border-b border-gray-200 pb-2 mb-4 flex items-center">
                      <FileText className="w-4 h-4 mr-2"/> Key Projects
                    </h3>
                    
                    <div className="space-y-5">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">E-Commerce Analytics Dashboard</h4>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed">Designed and built a comprehensive analytics dashboard for sellers using Next.js, Tailwind CSS, and Recharts, processing over 1M data points daily.</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">Open Source Contribution: React-Router</h4>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed">Contributed core bug fixes and performance improvements to the routing algorithm, directly impacting over 5M+ weekly downloads.</p>
                      </div>
                    </div>
                  </div>

                  {/* Accomplishments Section */}
                  <div>
                    <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest border-b border-gray-200 pb-2 mb-4 flex items-center">
                      <Award className="w-4 h-4 mr-2"/> Accomplishments
                    </h3>
                    <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-2 font-medium">
                      <li>Awarded "Engineer of the Year" out of 150+ employees at InnovateCorp in 2022.</li>
                      <li>First place winner at the global TechCrunch Disrupt Hackathon in 2019.</li>
                    </ul>
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
