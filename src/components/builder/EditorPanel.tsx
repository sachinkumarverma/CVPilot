'use client';
import { useResumeStore } from '@/store/useResumeStore';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { GripVertical, User, FileText, Briefcase, GraduationCap, Code, FolderGit2, Award, Trophy } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Individual Forms
import PersonalForm from './forms/PersonalForm';
import SummaryForm from './forms/SummaryForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';

import AchievementsForm from './forms/AchievementsForm';

const sectionIcons: Record<string, React.ReactNode> = {
  personal: <User className="w-5 h-5" />,
  summary: <FileText className="w-5 h-5" />,
  experience: <Briefcase className="w-5 h-5" />,
  education: <GraduationCap className="w-5 h-5" />,
  skills: <Code className="w-5 h-5" />,
  projects: <FolderGit2 className="w-5 h-5" />,
  certifications: <Award className="w-5 h-5" />,

  achievements: <Trophy className="w-5 h-5" />
};

const sectionTitles: Record<string, string> = {
  personal: 'Personal Information',
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',

  achievements: 'Achievements'
};

function SortableSection({ id }: { id: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderForm = () => {
    switch (id) {
      case 'personal': return <PersonalForm />;
      case 'summary': return <SummaryForm />;
      case 'experience': return <ExperienceForm />;
      case 'education': return <EducationForm />;
      case 'skills': return <SkillsForm />;
      case 'projects': return <ProjectsForm />;
      case 'certifications': return <CertificationsForm />;

      case 'achievements': return <AchievementsForm />;
      default: return null;
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl mb-6 shadow-sm overflow-hidden group">
      <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-white/10">
        <div 
          {...attributes} 
          {...listeners}
          className="cursor-grab p-1 mr-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 opacity-50 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="w-5 h-5" />
        </div>
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium">
          {sectionIcons[id]}
          <span>{sectionTitles[id]}</span>
        </div>
      </div>
      <div className="p-5">
        {renderForm()}
      </div>
    </div>
  );
}

export default function EditorPanel() {
  const { sections, reorderSections } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sections.indexOf(active.id);
      const newIndex = sections.indexOf(over.id);
      reorderSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto pb-32">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Details</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Fill in your information to generate a professional resume.</p>
      </div>

      <DndContext 
        id="resume-dnd"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={sections}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((sectionId) => (
            <SortableSection key={sectionId} id={sectionId} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
