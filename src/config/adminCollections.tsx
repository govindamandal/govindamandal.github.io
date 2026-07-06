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
      { name: 'description', label: 'Description', type: 'editor' },
      { name: 'highlights', label: 'Highlights', placeholder: 'Admin dashboards, API integrations' },
      { name: 'technologies', label: 'Technologies', placeholder: 'React, Node.js, MongoDB' },
      { name: 'icon', label: 'Icon', type: 'file', accept: 'image/*' },
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
      { name: 'projectType', label: 'Project type', type: 'radio', options: [
        { label: 'Personal Project', value: 'personal' },
        { label: 'Company/Client Project', value: 'company-client' }
      ] },
      { name: 'description', label: 'Description', type: 'editor' },
      { name: 'yourRole', label: 'Your role' },
      { name: 'techStack', label: 'Tech stack', placeholder: 'React, Node.js, MongoDB' },
      { name: 'liveUrl', label: 'Live URL', type: 'url' },
      { name: 'githubUrl', label: 'GitHub URL', type: 'url' },
      { name: 'image', label: 'Main image', type: 'file', accept: 'image/*' },
      { name: 'gallery', label: 'Gallery images', type: 'file', accept: 'image/*', multiple: true },
      { name: 'startDate', label: 'Start date', type: 'month' },
      { name: 'endDate', label: 'End date', type: 'month' },
      { name: 'status', label: 'Project status', type: 'radio', options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' }
      ] },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'experiences',
    label: 'Experience',
    icon: <BriefcaseBusiness size={18} />,
    fields: [
      { name: 'position', label: 'Position' },
      { name: 'company', label: 'Company' },
      { name: 'location', label: 'Location' },
      { name: 'currentlyWorking', label: 'Currently working', type: 'checkbox' },
      { name: 'startDate', label: 'Start date', type: 'month' },
      { name: 'endDate', label: 'End date', type: 'month', disabledWhen: { field: 'currentlyWorking', value: true } },
      { name: 'description', label: 'Description', type: 'editor' },
      { name: 'responsibilities', label: 'Responsibilities', placeholder: 'Built APIs, Improved performance' },
      { name: 'technologies', label: 'Technologies', placeholder: 'React, PHP, MySQL' },
      { name: 'companyUrl', label: 'Company URL', type: 'url' },
      { name: 'logo', label: 'Company Logo', type: 'file', accept: 'image/*' },
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
      { name: 'proficiency', label: 'Proficiency', type: 'range', min: 0, max: 100 },
      { name: 'icon', label: 'Icon', type: 'file', accept: 'image/*' },
      { name: 'status', label: 'Status', type: 'radio', options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
      ] },
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
      { name: 'issuedAt', label: 'Issue Date', type: 'date' },
      { name: 'credentialUrl', label: 'Credential URL', type: 'url' },
      { name: 'imageUrl', label: 'Certificate image', type: 'file', accept: 'image/*,application/pdf' },
      { name: 'description', label: 'Description', type: 'editor' },
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
      { name: 'certificateUrl', label: 'Certificate file', type: 'file', accept: 'image/*,application/pdf' },
      { name: 'description', label: 'Description', type: 'editor' },
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
      { name: 'avatarUrl', label: 'Avatar', type: 'file', accept: 'image/*' },
      { name: 'quote', label: 'Quote', type: 'editor' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'resume',
    label: 'Resume',
    icon: <FileText size={18} />,
    fields: [
      { name: 'title', label: 'Resume title' },
      { name: 'fileUrl', label: 'Resume file', type: 'file', accept: 'application/pdf,.pdf,.doc,.docx' },
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
      { name: 'message', label: 'Message', type: 'editor' },
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
      { name: 'summary', label: 'Summary', type: 'editor' },
      { name: 'location', label: 'Location' },
      { name: 'email', label: 'Email' },
      { name: 'linkedInUrl', label: 'LinkedIn URL', type: 'url' },
      { name: 'githubUrl', label: 'GitHub URL', type: 'url' },
      { name: 'resumeUrl', label: 'Resume file', type: 'file', accept: 'application/pdf,.pdf,.doc,.docx' },
      { name: 'avatarUrl', label: 'Avatar', type: 'file', accept: 'image/*' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'siteSettings',
    label: 'Settings',
    icon: <Settings size={18} />,
    fields: [
      { name: 'key', label: 'Settings key', placeholder: 'default' },
      { name: 'headline', label: 'Hero headline' },
      { name: 'subheadline', label: 'Hero subheadline', type: 'editor' },
      { name: 'availability', label: 'Availability text' },
      { name: 'ogImage', label: 'Open Graph image', type: 'file', accept: 'image/*' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  }
]
