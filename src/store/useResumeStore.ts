import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type ResumeSectionType = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'achievements';

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface AchievementItem {
  id: string;
  description: string;
}

export interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
}

interface ResumeState {
  documentName: string;
  setDocumentName: (name: string) => void;
  data: ResumeData;
  activeTemplate: string;
  sections: ResumeSectionType[];
  updatePersonal: (data: Partial<ResumeData['personal']>) => void;
  updateSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  updateSkills: (skills: string[]) => void;
  
  addProject: () => void;
  updateProject: (id: string, data: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;

  addCertification: () => void;
  updateCertification: (id: string, data: Partial<CertificationItem>) => void;
  removeCertification: (id: string) => void;


  addAchievement: () => void;
  updateAchievement: (id: string, data: Partial<AchievementItem>) => void;
  removeAchievement: (id: string) => void;

  reorderSections: (newOrder: ResumeSectionType[]) => void;
  setTemplate: (templateId: string) => void;
}

const initialData: ResumeData = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
};

const defaultSections: ResumeSectionType[] = ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'achievements'];

export const useResumeStore = create<ResumeState>((set) => ({
  documentName: 'Untitled Resume',
  setDocumentName: (name) => set({ documentName: name }),
  data: initialData,
  activeTemplate: 'modern',
  sections: defaultSections,
  
  updatePersonal: (personalData) => 
    set((state) => ({ data: { ...state.data, personal: { ...state.data.personal, ...personalData } } })),
    
  updateSummary: (summary) => 
    set((state) => ({ data: { ...state.data, summary } })),
    
  addExperience: () => 
    set((state) => ({
      data: {
        ...state.data,
        experience: [
          ...state.data.experience,
          { id: uuidv4(), company: '', position: '', startDate: '', endDate: '', description: '' }
        ]
      }
    })),
    
  updateExperience: (id, expData) => 
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map(exp => exp.id === id ? { ...exp, ...expData } : exp)
      }
    })),
    
  removeExperience: (id) => 
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.filter(exp => exp.id !== id)
      }
    })),

  addEducation: () => 
    set((state) => ({
      data: {
        ...state.data,
        education: [
          ...state.data.education,
          { id: uuidv4(), institution: '', degree: '', startDate: '', endDate: '' }
        ]
      }
    })),
    
  updateEducation: (id, eduData) => 
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map(edu => edu.id === id ? { ...edu, ...eduData } : edu)
      }
    })),
    
  removeEducation: (id) => 
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.filter(edu => edu.id !== id)
      }
    })),

  updateSkills: (skills) => 
    set((state) => ({ data: { ...state.data, skills } })),
    
  addProject: () => 
    set((state) => ({
      data: { ...state.data, projects: [...state.data.projects, { id: uuidv4(), name: '', description: '', link: '' }] }
    })),
  updateProject: (id, data) => 
    set((state) => ({
      data: { ...state.data, projects: state.data.projects.map(p => p.id === id ? { ...p, ...data } : p) }
    })),
  removeProject: (id) => 
    set((state) => ({
      data: { ...state.data, projects: state.data.projects.filter(p => p.id !== id) }
    })),

  addCertification: () => 
    set((state) => ({
      data: { ...state.data, certifications: [...state.data.certifications, { id: uuidv4(), name: '', issuer: '', date: '' }] }
    })),
  updateCertification: (id, data) => 
    set((state) => ({
      data: { ...state.data, certifications: state.data.certifications.map(c => c.id === id ? { ...c, ...data } : c) }
    })),
  removeCertification: (id) => 
    set((state) => ({
      data: { ...state.data, certifications: state.data.certifications.filter(c => c.id !== id) }
    })),


  addAchievement: () => 
    set((state) => ({
      data: { ...state.data, achievements: [...state.data.achievements, { id: uuidv4(), description: '' }] }
    })),
  updateAchievement: (id, data) => 
    set((state) => ({
      data: { ...state.data, achievements: state.data.achievements.map(a => a.id === id ? { ...a, ...data } : a) }
    })),
  removeAchievement: (id) => 
    set((state) => ({
      data: { ...state.data, achievements: state.data.achievements.filter(a => a.id !== id) }
    })),

  reorderSections: (sections) => set({ sections }),
  
  setTemplate: (activeTemplate) => set({ activeTemplate }),
}));

