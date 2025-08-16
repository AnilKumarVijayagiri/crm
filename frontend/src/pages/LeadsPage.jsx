import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import api from '../services/api'
import LeadTable from '../components/LeadTable.jsx'

export default function LeadsPage() {
  const qc = useQueryClient()
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [filter, setFilter] = useState('')

  const leadsQuery = useQuery({
    queryKey: ['leads', filter],
    queryFn: async () => {
      const { data } = await api.get('/leads', { params: filter ? { status: filter } : {} })
      return data
    }
  })

  const statusesQuery = useQuery({
    queryKey: ['statuses'],
    queryFn: async () => (await api.get('/statuses')).data
  })

  const createLead = useMutation({
    mutationFn: async (payload) => (await api.post('/leads', payload)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] })
  })

  const onOpen = (lead) => window.location.href = `/leads/${lead._id}`

  return (
    <div style={{ padding: 16 }}>
      <h2>Leads</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <select onChange={e => setFilter(e.target.value)} defaultValue="">
          <option value="">All Statuses</option>
          {statusesQuery.data?.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
        <button onClick={() => qc.invalidateQueries({ queryKey: ['leads'] })}>Refresh</button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} />
        <input placeholder="Email" value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} />
        <input placeholder="Phone" value={form.phone} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))} />
        <button onClick={() => createLead.mutate(form)}>Add Lead</button>
      </div>

      {leadsQuery.isLoading ? <p>Loading...</p> : <LeadTable leads={leadsQuery.data} onOpen={onOpen} />}
    </div>
  )
}