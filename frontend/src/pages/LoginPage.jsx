import { useState } from 'react'
import api from '../services/api'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      // const { data } = await api.post('http://localhost:8000/api/auth/login', { email, password })
      const { data } = await api.post('/auth/login', { email, password })

      localStorage.setItem('access', data.token)
      window.location.href = '/'
    } catch (e) {
      setError(e.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '5rem auto' }}>
      <h2>SKY_CRM Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button>Login</button>
      </form>
    </div>
  )
}