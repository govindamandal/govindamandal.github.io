const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-api-seven-topaz.vercel.app'
const ADMIN_TOKEN_KEY = 'portfolio_admin_token'

function authHeaders() {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY)
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function shouldRedirectToAdminLogin(path: string, status: number, error?: string) {
  if (status !== 401 || path === '/api/auth/login') {
    return false
  }

  const isAdminPage = window.location.hash.startsWith('#/admin')
  const isAdminRequest = path.startsWith('/api/admin') || path === '/api/auth/me'
  const isExpiredSession = error === 'Invalid or expired session' || error === 'Authentication required'
  return isAdminPage && isAdminRequest && isExpiredSession
}

function redirectToAdminLogin() {
  localStorage.removeItem(ADMIN_TOKEN_KEY)

  if (window.location.hash !== '#/admin/login') {
    window.location.hash = '#/admin/login'
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')

  for (const [key, value] of Object.entries(authHeaders())) {
    headers.set(key, value)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    if (shouldRedirectToAdminLogin(path, response.status, body.error)) {
      redirectToAdminLogin()
    }
    throw new Error(body.error || 'Request failed')
  }

  return response.json()
}
