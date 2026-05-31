import { ResumeData } from '@/store/useResumeStore';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const { personal, summary, experience, education, skills } = data;

  return (
    <div className="w-full min-h-[1131px] bg-white text-gray-900 font-sans flex mx-auto max-w-[800px] shadow-2xl relative overflow-hidden">
      
      {/* Left Sidebar (Dark) */}
      <div className="w-[35%] bg-slate-800 text-white p-8 flex flex-col gap-8">
        
        {/* Placeholder Photo */}
        <div className="w-32 h-32 rounded-full bg-slate-600 border-4 border-slate-700 mx-auto overflow-hidden shrink-0">
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">Photo</div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3 mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-600 pb-1 mb-2">Contact</h2>
          {personal.phone && (
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="break-all">{personal.phone}</span>
            </div>
          )}
          {personal.email && (
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="break-all">{personal.email}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="break-all">{personal.location}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Globe className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} className="break-all hover:text-white transition-colors">
                {personal.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>

        {/* Education */}
        {education.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-600 pb-1 mb-2">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="text-sm">
                <div className="font-bold text-white mb-0.5">{edu.degree || 'Degree Name'}</div>
                <div className="text-slate-300 mb-0.5">{edu.institution || 'University Name'}</div>
                <div className="text-slate-400 text-xs uppercase tracking-wider">
                  {edu.startDate || 'Start'} {edu.endDate ? `— ${edu.endDate}` : ''}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-600 pb-1 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-slate-700 text-white px-2 py-1 text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content (White) */}
      <div className="w-[65%] p-10 flex flex-col">
        
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-slate-900 mb-2 leading-none">
            {personal.fullName || 'YOUR NAME'}
          </h1>
          <div className="text-lg font-medium text-blue-600 uppercase tracking-widest">
            {experience[0]?.position || 'PROFESSIONAL TITLE'}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900 mb-3 flex items-center">
              <span className="bg-slate-900 text-white px-2 py-1 mr-3 rounded-sm">Profile</span>
              <div className="flex-1 border-b-2 border-slate-100"></div>
            </h2>
            <p className="text-[0.85rem] text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900 mb-5 flex items-center">
              <span className="bg-slate-900 text-white px-2 py-1 mr-3 rounded-sm">Experience</span>
              <div className="flex-1 border-b-2 border-slate-100"></div>
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                  <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-1.5 border-2 border-white"></div>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-[1rem] font-bold text-slate-900 leading-tight">{exp.position || 'Job Title'}</h3>
                      <div className="text-[0.85rem] font-semibold text-blue-600 mt-0.5">{exp.company || 'Company Name'}</div>
                    </div>
                    <span className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap bg-slate-100 px-2 py-1 rounded">
                      {exp.startDate || 'Start'} {exp.endDate ? `— ${exp.endDate}` : '— Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <ul className="text-[0.85rem] text-slate-600 leading-relaxed list-disc list-outside ml-4 mt-2 space-y-1">
                      {exp.description.split('\n').filter(line => line.trim() !== '').map((line, i) => {
                        const cleanLine = line.replace(/^- /, '');
                        return <li key={i} className="pl-1 marker:text-slate-400">{cleanLine}</li>;
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
