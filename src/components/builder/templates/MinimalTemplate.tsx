import { ResumeData } from '@/store/useResumeStore';

interface MinimalTemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personal, summary, experience, education, skills } = data;

  return (
    <div className="w-full min-h-[1131px] bg-white text-gray-900 font-serif flex flex-col mx-auto max-w-[800px] shadow-2xl relative overflow-hidden">
      
      {/* Top Header */}
      <header className="flex flex-col items-center pt-12 pb-6 bg-white z-10 border-b-2 border-gray-300">
        <h1 className="text-5xl tracking-widest text-gray-700 mb-2 font-normal">
          {personal.fullName || 'Emma Moss'}
        </h1>
        <div className="text-sm tracking-[0.2em] uppercase text-gray-500 font-sans mb-4">
          {experience[0]?.position || 'PROFESSIONAL TITLE'}
        </div>
        
        {/* Contact Strip */}
        <div className="w-full bg-gray-100 py-2 mt-4 text-xs font-sans text-gray-600 flex justify-center gap-6 border-y border-gray-300">
          {personal.phone && <span>{personal.phone}</span>}
          {personal.email && <span>{personal.email}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && (
            <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`}>
              {personal.website.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>
      </header>

      {/* Main Body (Two Columns) */}
      <div className="flex flex-1">
        
        {/* Left Column (Light Gray) */}
        <div className="w-[35%] bg-gray-100/50 p-8 border-r border-gray-200">
          
          {/* Education */}
          {education.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-800 mb-6 text-center">Education</h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="text-center font-sans">
                    <h3 className="text-[0.8rem] font-bold text-gray-900 uppercase">{edu.degree || 'Degree Name'}</h3>
                    <div className="text-[0.85rem] text-gray-800 font-bold mb-1">{edu.institution || 'University Name'}</div>
                    <div className="text-[0.75rem] text-gray-600">
                      {edu.startDate || 'Start'} {edu.endDate ? `— ${edu.endDate}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-800 mb-6 text-center">Core Skills</h2>
              <div className="flex flex-col gap-3 items-center text-[0.85rem] font-sans text-gray-700">
                {skills.map((skill, index) => (
                  <span key={index} className="text-center w-full">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column (White) */}
        <div className="w-[65%] p-8">
          
          {/* Summary */}
          {summary && (
            <section className="mb-10">
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-800 mb-4">Career Summary</h2>
              <p className="text-[0.85rem] text-gray-700 leading-relaxed font-sans text-justify">
                {summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-800 mb-6">Professional Experience</h2>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="text-[0.85rem] font-bold text-gray-900 uppercase tracking-widest mb-1 font-sans">{exp.position || 'Professional Title'}</h3>
                    <div className="text-[0.85rem] font-bold text-gray-800 font-sans mb-3 flex flex-wrap gap-1">
                      {exp.company || 'Company Name'} <span className="font-normal text-gray-500">— {exp.startDate || 'Start'} {exp.endDate ? `— ${exp.endDate}` : '— Present'}</span>
                    </div>
                    {exp.description && (
                      <ul className="text-[0.85rem] text-gray-700 leading-relaxed list-disc list-outside ml-4 space-y-1.5 font-sans">
                        {exp.description.split('\n').filter(line => line.trim() !== '').map((line, i) => {
                          const cleanLine = line.replace(/^- /, '');
                          return <li key={i}>{cleanLine}</li>;
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
    </div>
  );
}
