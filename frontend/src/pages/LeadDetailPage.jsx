import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../services/api'

export default function LeadDetailPage() {
  const { id } = useParams()
  const qc = useQueryClient()
  const [statusName, setStatusName] = useState('')
  const [note, setNote] = useState('')
  const [file, setFile] = useState(null)
  const [quotationAmount, setQuotationAmount] = useState('')

  const leadQuery = useQuery({
    queryKey: ['lead', id],
    queryFn: async () => (await api.get(`/leads/${id}`)).data
  })

  const notesQuery = useQuery({
    queryKey: ['notes', id],
    queryFn: async () => (await api.get(`/notes/${id}`)).data
  })

  const attachmentsQuery = useQuery({
    queryKey: ['atts', id],
    queryFn: async () => (await api.get(`/attachments/${id}`)).data
  })

  const statusesQuery = useQuery({
    queryKey: ['statuses'],
    queryFn: async () => (await api.get('/statuses')).data
  })

  const addNote = useMutation({
    mutationFn: async () => (await api.post(`/notes/${id}`, { note })).data,
    onSuccess: () => { setNote(''); qc.invalidateQueries({ queryKey: ['notes', id] }) }
  })

  const changeStatus = useMutation({
    mutationFn: async () => (await api.post(`/leads/${id}/status`, { statusName, quotationAmount: Number(quotationAmount) || undefined })).data,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['lead', id] }) }
  })

  const uploadFile = useMutation({
    mutationFn: async () => {
      const fd = new FormData()
      fd.append('file', file)
      return (await api.post(`/attachments/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })).data
    },
    onSuccess: () => { setFile(null); qc.invalidateQueries({ queryKey: ['atts', id] }) }
  })

  if (leadQuery.isLoading) return <p>Loading...</p>
  const lead = leadQuery.data

  return (
    <div style={{ padding: 16 }}>
      <h2>Lead: {lead.name}</h2>
      <p>Status: <b>{lead.status?.name}</b></p>
      <p>Email: {lead.email || '-'}</p>
      <p>Phone: {lead.phone || '-'}</p>
      <p>City: {lead.city || '-'}</p>
      <p>Category: {lead.category || '-'}</p>

      <div style={{ margin: '12px 0' }}>
        <select value={statusName} onChange={e => setStatusName(e.target.value)}>
          <option value="">Change status...</option>
          {['Registered','Contacted','Call Back','Follow-Up','Not Interested','Enrolled'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input placeholder="Quotation Amount (if Enrolled)" value={quotationAmount} onChange={e => setQuotationAmount(e.target.value)} />
        <button onClick={() => changeStatus.mutate()}>Update Status</button>
      </div>

      <h3>Notes</h3>
      <div>
        <input placeholder="Add note" value={note} onChange={e => setNote(e.target.value)} />
        <button onClick={() => addNote.mutate()}>Save Note</button>
      </div>
      <ul>
        {notesQuery.data?.map(n => <li key={n._id}>{new Date(n.createdAt).toLocaleString()} — {n.note}</li>)}
      </ul>

      <h3>Attachments</h3>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button disabled={!file} onClick={() => uploadFile.mutate()}>Upload</button>
      <ul>
        {attachmentsQuery.data?.map(a => <li key={a._id}><a href={a.fileUrl} target="_blank">File</a> — {new Date(a.uploadedAt).toLocaleString()}</li>)}
      </ul>
    </div>
  )
}