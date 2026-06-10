import {
  BriefcaseBusiness,
  FileText,
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
    key: 'services',
    label: 'Services',
    icon: <Sparkles size={18} />,
    fields: [
      { name: 'title', label: 'Service title' },
      { name: 'slug', label: 'Slug' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'highlights', label: 'Highlights', placeholder: 'Admin dashboards, API integrations' },
      { name: 'technologies', label: 'Technologies', placeholder: 'React, Node.js, MongoDB' },
      { name: 'icon', label: 'Icon' },
      { name: 'displayOrder', label: 'Display order', type: 'number' },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'projects',
    label: 'Projects',
    icon: <FolderKanban size={18} />,
    fields: [
      { name: 'title', label: 'Project title' },
      { name: 'slug', label: 'Slug' },
      { name: 'company', label: 'Company' },
      { name: 'client', label: 'Client' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'yourRole', label: 'Your role' },
      { name: 'techStack', label: 'Tech stack', placeholder: 'React, Node.js, MongoDB' },
      { name: 'liveUrl', label: 'Live URL', type: 'url' },
      { name: 'githubUrl', label: 'GitHub URL', type: 'url' },
      { name: 'image', label: 'Main image URL', type: 'url' },
      { name: 'gallery', label: 'Gallery image URLs', placeholder: 'https://..., https://...' },
      { name: 'startDate', label: 'Start date' },
      { name: 'endDate', label: 'End date' },
      { name: 'status', label: 'Status', placeholder: 'draft, published, archived' },
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
      { name: 'position', label: 'Position' },
      { name: 'company', label: 'Company' },
      { name: 'location', label: 'Location' },
      { name: 'startDate', label: 'Start date' },
      { name: 'endDate', label: 'End date' },
      { name: 'currentlyWorking', label: 'Currently working', type: 'checkbox' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'responsibilities', label: 'Responsibilities', placeholder: 'Built APIs, Improved performance' },
      { name: 'technologies', label: 'Technologies', placeholder: 'React, PHP, MySQL' },
      { name: 'companyUrl', label: 'Company URL', type: 'url' },
      { name: 'logo', label: 'Logo URL', type: 'url' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'skills',
    label: 'Skills',
    icon: <Wrench size={18} />,
    fields: [
      { name: 'name', label: 'Skill name' },
      { name: 'category', label: 'Category', placeholder: 'Backend, Frontend, Database, Messaging & Streaming, Cloud, Observability & Tools, AI Tools' },
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
    key: 'resume',
    label: 'Resume',
    icon: <FileText size={18} />,
    fields: [
      { name: 'title', label: 'Resume title' },
      { name: 'fileUrl', label: 'File URL', type: 'url' },
      { name: 'version', label: 'Version' },
      { name: 'isPrimary', label: 'Primary resume', type: 'checkbox' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'contactMessages',
    label: 'Contact Messages',
    icon: <FileText size={18} />,
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'email', label: 'Email' },
      { name: 'message', label: 'Message', type: 'textarea' },
      { name: 'status', label: 'Status', placeholder: 'new, read, archived' }
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
