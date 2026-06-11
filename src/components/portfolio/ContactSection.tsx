import type { FormEvent } from 'react'
import { useState } from 'react'
import { ExternalLink, Mail, MapPin } from 'lucide-react'
import { apiFetch } from '../../lib/api'
import type { PortfolioItem } from '../../types/portfolio'
import { Section } from './Section'

export function ContactSection({ profile }: { profile: PortfolioItem }) {
  return (
    <Section id="contact" title="Let us build something useful" copy="Messages will be stored in our database, so future inquiries stay available in the history.">
      <ContactForm profile={profile} />
    </Section>
  )
}

function ContactForm({ profile }: { profile: PortfolioItem }) {
  const [status, setStatus] = useState('')
  const email = String(profile.email || '')
  const location = String(profile.location || '')
  const linkedInUrl = String(profile.linkedInUrl || '')
  const githubUrl = String(profile.githubUrl || '')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    try {
      await apiFetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })
      setStatus('Message sent. I will get back to you soon.')
      event.currentTarget.reset()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not send message')
    }
  }

  return (
    <div className="card contact-band">
      <div className="contact-profile">
        <h3>Contact</h3>
        <p className="muted">Prefer email? Reach me at {email || 'your configured email'}.</p>
        <div className="contact-links">
          {email ? <a href={`mailto:${email}`}><Mail size={18} /> {email}</a> : null}
          {location ? <span><MapPin size={18} /> {location}</span> : null}
          {linkedInUrl ? <a href={linkedInUrl} target="_blank" rel="noreferrer"><ExternalLink size={18} /> LinkedIn</a> : null}
          {githubUrl ? <a href={githubUrl} target="_blank" rel="noreferrer"><ExternalLink size={18} /> GitHub</a> : null}
        </div>
      </div>
      <form className="form" onSubmit={submit}>
        <label className="field"><span>Name</span><input className="input" name="name" required /></label>
        <label className="field"><span>Email</span><input className="input" name="email" type="email" required /></label>
        <label className="field"><span>Message</span><textarea className="textarea" name="message" required /></label>
        <button className="button" type="submit"><Mail size={18} /> Send message</button>
        {status ? <p className="muted">{status}</p> : null}
      </form>
    </div>
  )
}
