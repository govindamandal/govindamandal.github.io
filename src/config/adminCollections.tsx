import {
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Medal,
  Settings,
  Sparkles,
  UserRound,
  Wrench
} from 'lucide-react'
import type { CollectionConfig } from '../types/portfolio'

export const collectionConfigs: CollectionConfig[] = [
  {
    key: 'projects',
    label: 'Projects',
    icon: <FolderKanban size={18} />,
    fields: [
      { name: 'title', label: 'Project title' },
      { name: 'company', label: 'Company or client' },
      { name: 'role', label: 'Your role' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'technologies', label: 'Technologies', placeholder: 'React, Node.js, MongoDB' },
      { name: 'liveUrl', label: 'Live URL', type: 'url' },
      { name: 'imageUrl', label: 'Image URL', type: 'url' },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'experiences',
    label: 'Experience',
    icon: <BriefcaseBusiness size={18} />,
    fields: [
      { name: 'title', label: 'Job title' },
      { name: 'company', label: 'Company' },
      { name: 'location', label: 'Location' },
      { name: 'startDate', label: 'Start date' },
      { name: 'endDate', label: 'End date' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'technologies', label: 'Technologies', placeholder: 'React, PHP, MySQL' },
      { name: 'companyUrl', label: 'Company URL', type: 'url' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'skills',
    label: 'Skills',
    icon: <Wrench size={18} />,
    fields: [
      { name: 'name', label: 'Skill name' },
      { name: 'category', label: 'Category' },
      { name: 'proficiency', label: 'Proficiency', type: 'number' },
      { name: 'displayOrder', label: 'Display order', type: 'number' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'certifications',
    label: 'Certifications',
    icon: <Medal size={18} />,
    fields: [
      { name: 'title', label: 'Certification title' },
      { name: 'issuer', label: 'Issuer' },
      { name: 'issuedAt', label: 'Issued at' },
      { name: 'credentialUrl', label: 'Credential URL', type: 'url' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'courses',
    label: 'Courses',
    icon: <GraduationCap size={18} />,
    fields: [
      { name: 'title', label: 'Course title' },
      { name: 'provider', label: 'Provider' },
      { name: 'completedAt', label: 'Completed at' },
      { name: 'courseUrl', label: 'Course URL', type: 'url' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    icon: <Sparkles size={18} />,
    fields: [
      { name: 'name', label: 'Person name' },
      { name: 'role', label: 'Person role' },
      { name: 'company', label: 'Company' },
      { name: 'quote', label: 'Quote', type: 'textarea' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: <UserRound size={18} />,
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'title', label: 'Professional title' },
      { name: 'summary', label: 'Summary', type: 'textarea' },
      { name: 'location', label: 'Location' },
      { name: 'email', label: 'Email' },
      { name: 'linkedInUrl', label: 'LinkedIn URL', type: 'url' },
      { name: 'githubUrl', label: 'GitHub URL', type: 'url' },
      { name: 'resumeUrl', label: 'Resume URL', type: 'url' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'siteSettings',
    label: 'Settings',
    icon: <Settings size={18} />,
    fields: [
      { name: 'key', label: 'Settings key', placeholder: 'default' },
      { name: 'headline', label: 'Hero headline', type: 'textarea' },
      { name: 'subheadline', label: 'Hero subheadline', type: 'textarea' },
      { name: 'availability', label: 'Availability text' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  }
]
