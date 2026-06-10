import type { FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../lib/api'

export function LoginPage() {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const formData = new FormData(event.currentTarget)
    try {
      const result = await apiFetch<{ token: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      })
      localStorage.setItem('portfolio_admin_token', result.token)
      navigate('/admin')
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login failed')
    }
  }

  return (
    <div className="login-page">
      <form className="card login-card form" onSubmit={submit}>
        <span className="eyebrow">Admin only</span>
        <h1>Sign in</h1>
        <p className="muted">Use the admin credentials you manually insert into MongoDB.</p>
        <label className="field"><span>Email</span><input className="input" name="email" type="email" autoComplete="email" required /></label>
        <label className="field"><span>Password</span><input className="input" name="password" type="password" autoComplete="current-password" required /></label>
        {error ? <p className="error">{error}</p> : null}
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  )
}
