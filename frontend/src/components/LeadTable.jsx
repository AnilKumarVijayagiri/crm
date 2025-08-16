export default function LeadTable({ leads, onOpen }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Lead ID</th>
          <th>Source</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>City</th>
          <th>Category</th>
          <th>Status</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        {leads?.map(l => (
          <tr key={l._id} style={{ cursor: 'pointer' }} onClick={() => onOpen(l)}>
            <td>{l._id}</td>
            <td>{l.source || '-'}</td>
            <td>{l.name}</td>
            <td>{l.phone || '-'}</td>
            <td>{l.email || '-'}</td>
            <td>{l.city || '-'}</td>
            <td>{l.category || '-'}</td>
            <td>{l.status?.name}</td>
            <td>{new Date(l.updatedAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}