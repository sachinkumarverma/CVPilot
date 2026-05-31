import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type ResumeSectionType = 'personal' | 'summary' | 'experience' | 'education' | 'skills';

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
}

interface ResumeState {
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
};

const defaultSections: ResumeSectionType[] = ['personal', 'summary', 'experience', 'education', 'skills'];

export const useResumeStore = create<ResumeState>((set) => ({
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
    
  reorderSections: (sections) => set({ sections }),
  
  setTemplate: (activeTemplate) => set({ activeTemplate }),
}));
