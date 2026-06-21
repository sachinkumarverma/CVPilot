import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function MarketingPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.toLowerCase();
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const getContent = () => {
    switch(slug) {
      case 'features':
        return (
          <>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              CVPilot offers a comprehensive suite of tools designed to elevate your job search. Our AI-powered resume builder goes beyond simple formatting to actively enhance your content, ensuring you stand out to both human recruiters and Applicant Tracking Systems (ATS).
            </p>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">AI Content Generation</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Struggling to find the right words? Our integrated Google Gemini AI engine analyzes your career history and target job titles to generate powerful, action-oriented bullet points and compelling professional summaries. It automatically identifies weak phrasing and replaces it with industry-standard terminology.
            </p>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">ATS-Optimized Templates</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Beautiful design shouldn&apos;t come at the cost of readability. Every template in our library has been rigorously tested against industry-leading Applicant Tracking Systems (like Workday, Taleo, and Greenhouse) to ensure 100% parseability. Your data will never get lost in translation.
            </p>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Real-Time Preview</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              See exactly how your resume will look as you type. Our split-screen editor provides a true WYSIWYG (What You See Is What You Get) experience, rendering a pixel-perfect PDF preview instantly. No more guessing how page breaks will affect your layout.
            </p>
          </>
        );
      case 'pricing':
        return (
          <>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Simple, transparent pricing designed for job seekers at every stage of their career. Start for free and upgrade when you need advanced features.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12 mb-12">
              <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-8 bg-white dark:bg-gray-900 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Basic</h3>
                <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">$0<span className="text-lg font-normal text-gray-500">/mo</span></div>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-8">
                  <li>✓ 1 Resume Template</li>
                  <li>✓ PDF Exports</li>
                  <li>✓ Basic Formatting</li>
                  <li className="text-gray-400">✗ AI Content Generation</li>
                </ul>
                <button className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors">Current Plan</button>
              </div>
              <div className="border-2 border-blue-500 rounded-2xl p-8 bg-blue-50/50 dark:bg-blue-900/10 shadow-md relative">
                <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">Most Popular</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pro</h3>
                <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">$12<span className="text-lg font-normal text-gray-500">/mo</span></div>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-8">
                  <li>✓ All Premium Templates</li>
                  <li>✓ Unlimited PDF Exports</li>
                  <li>✓ Advanced Formatting</li>
                  <li>✓ Unlimited AI Generation</li>
                </ul>
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">Upgrade to Pro</button>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center">All plans include a 14-day money-back guarantee.</p>
          </>
        );
      case 'privacy':
      case 'terms':
      case 'cookie-policy':
        return (
          <>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">1. Information We Collect</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              When you use CVPilot, we collect information that you voluntarily provide to us, including your name, email address, phone number, work history, and educational background. This data is strictly used for the purpose of generating your resume documents and improving our AI models if you opt-in.
            </p>
            <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">2. Data Security</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              We implement industry-standard security measures to protect your personal information. Your resume data is encrypted in transit and at rest using AES-256 encryption. We do not sell your personal data to third-party data brokers or marketing agencies.
            </p>
            <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">3. Third-Party Services</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              We utilize Google&apos;s Gemini API to power our AI features and Supabase for secure authentication. By using CVPilot, you acknowledge that your data may be processed by these sub-processors in accordance with their respective privacy policies.
            </p>
          </>
        );
      default:
        notFound();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10">
          <div className="px-8 py-10 sm:p-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
              {title}
            </h1>
            
            <div className="prose prose-blue dark:prose-invert max-w-none">
              {getContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
