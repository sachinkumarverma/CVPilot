import { ResumeData } from '@/store/useResumeStore';
import { Mail, Phone, MapPin, Globe, User, Briefcase, Award, GraduationCap, FileText } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="w-full min-h-[1131px] bg-white text-gray-900 font-sans flex mx-auto max-w-[800px] shadow-2xl relative overflow-hidden">

      {/* Left Column (Sidebar) */}
      <div className="w-[35%] bg-[#232E35] text-white p-8 flex flex-col space-y-6">

        {/* Photo, Name, Title */}
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-slate-700 border-4 border-white/10 shadow-lg overflow-hidden shrink-0 flex items-center justify-center mb-4">
            {personal.photoUrl ? (
              <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-slate-400 text-sm">Photo</span>
            )}
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
            {personal.fullName?.split(' ').map((name, i) => (
              <span key={i}>{name}{i === 0 ? <br /> : ' '}</span>
            )) || 'Your Name'}
          </h2>
          <p className="text-blue-400 font-semibold text-sm mt-2 tracking-wide uppercase">
            {experience[0]?.position || 'Professional Title'}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-sm text-gray-300 font-medium w-full">
          {personal.email && (
            <div className="flex items-center"><Mail className="w-4 h-4 mr-3 text-gray-400 shrink-0" /> <span className="truncate">{personal.email}</span></div>
          )}
          {personal.phone && (
            <div className="flex items-center"><Phone className="w-4 h-4 mr-3 text-gray-400 shrink-0" /> <span className="truncate">{personal.phone}</span></div>
          )}
          {personal.location && (
            <div className="flex items-center"><MapPin className="w-4 h-4 mr-3 text-gray-400 shrink-0" /> <span className="truncate">{personal.location}</span></div>
          )}
          {personal.website && (
            <div className="flex items-center"><Globe className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
              <span className="truncate">{personal.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-600 pb-1.5 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-2.5 py-1 bg-white/10 border border-white/5 text-white text-xs font-semibold rounded-md shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-600 pb-1.5 mb-3 flex items-center">
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <p className="font-bold text-white text-[13px]">{edu.degree || 'Degree Name'}</p>
                  <p className="text-gray-400 text-[11px] font-medium mt-0.5">
                    {edu.institution || 'University Name'}, {edu.startDate || 'Start'} {edu.endDate ? `- ${edu.endDate}` : ''}
                    {edu.score && <span className="ml-2 pl-2 border-l border-gray-600 text-gray-300">Score: {edu.score}</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}




        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-600 pb-1.5 mb-3">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="font-bold text-white text-sm">{cert.name || 'Certification Name'}</p>
                  <p className="text-gray-400 text-xs font-medium mt-1">
                    {cert.issuer || 'Issuer'}{cert.date ? `, ${cert.date}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column (Main Content) */}
      <div className="w-[65%] p-10 flex flex-col space-y-6 bg-white">

        {/* Professional Summary */}
        {summary && (
          <div>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-gray-200 pb-1.5 mb-3 flex items-center">
              <User className="w-4 h-4 mr-2" /> Professional Summary
            </h3>
            <p className="text-gray-700 text-[13px] leading-[1.4] font-medium text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-gray-200 pb-1.5 mb-3 flex items-center">
              <Briefcase className="w-4 h-4 mr-2" /> Work Experience
            </h3>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-start mb-1.5">
                    <div className="flex flex-col">
                      <h4 className="font-bold text-gray-900 text-[14px]">
                        {exp.position || 'Job Title'}
                      </h4>
                      <span className="text-gray-500 font-medium text-[12px]">{exp.company || 'Company'}</span>
                    </div>
                    <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap ml-4 mt-0.5">
                      {exp.startDate || 'Start'} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-outside ml-4 text-[13px] leading-[1.5] text-gray-600 space-y-1 font-medium">
                      {exp.description.split('\n').filter(line => line.trim() !== '').map((line, i) => {
                        const cleanLine = line.replace(/^- /, '');
                        return <li key={i}>{cleanLine}</li>;
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-gray-200 pb-1.5 mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2" /> Key Projects
            </h3>
            
            <div className="space-y-3.5">
              {projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex items-center mb-1">
                    <h4 className="font-bold text-gray-900 text-[14px] mr-2">{proj.name || 'Project Name'}</h4>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors" title={proj.link}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-[11px] font-bold text-blue-600/80 mb-1">
                      {proj.technologies}
                    </div>
                  )}
                  <p className="text-[13px] leading-[1.5] text-gray-600 font-medium">
                    {proj.description || 'Project description goes here.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-gray-200 pb-1.5 mb-3 flex items-center">
              <Award className="w-4 h-4 mr-2" /> Accomplishments
            </h3>
            <ul className="list-disc list-outside ml-4 text-[13px] leading-[1.5] text-gray-600 space-y-1 font-medium">
              {achievements.map((ach) => (
                <li key={ach.id}>{ach.description || 'Achievement description'}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
