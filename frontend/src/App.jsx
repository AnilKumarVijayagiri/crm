import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import LeadsPage from './pages/LeadsPage.jsx'
import LeadDetailPage from './pages/LeadDetailPage.jsx'

function RequireAuth({ children }) {
  const token = localStorage.getItem('access')
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RequireAuth><LeadsPage /></RequireAuth>} />
      <Route path="/leads/:id" element={<RequireAuth><LeadDetailPage /></RequireAuth>} />
    </Routes>
  )
}