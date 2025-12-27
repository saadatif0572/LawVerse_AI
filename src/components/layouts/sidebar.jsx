import { useNavigate } from 'react-router-dom'
import { useAuth } from '../commons/AuthProvider'

const Sidebar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <aside style={{
      background: '#051b3d',
      color: '#64b5f6',
      borderRight: '2px solid #00d4ff',
      padding: '1.5rem',
      minHeight: '100vh',
      display: 'none',
      width: '256px'
    }}>
      {!user && (
        <div
          style={{
            borderRadius: 12,
            border: '1px solid rgba(0, 212, 255, 0.25)',
            background: 'rgba(0, 212, 255, 0.08)',
            padding: '1rem',
            color: '#cfefff',
          }}
        >
          <div style={{ fontWeight: 900, letterSpacing: 0.2, marginBottom: 8 }}>
            Legal Quick Note
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: '#b7e9ff' }}>
            Laws and procedures can change by jurisdiction. Always verify:
            <ul style={{ marginTop: 8, paddingLeft: 18, color: '#b7e9ff' }}>
              <li>dates, deadlines, and limitation periods</li>
              <li>who has authority to sign and bind parties</li>
              <li>privacy/confidentiality obligations before sharing documents</li>
            </ul>
          </div>
        </div>
      )}

      {user && (
        <button
          type="button"
          onClick={() => navigate('/add-lawyer')}
          className="neon-hover"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: 10,
            background: 'rgba(0, 212, 255, 0.12)',
            color: '#cfefff',
            fontWeight: 800,
            border: '1px solid rgba(0, 212, 255, 0.35)',
            cursor: 'pointer',
          }}
        >
          Add yourself as a lawyer
        </button>
      )}

      <style>{`
        @media (min-width: 1024px) {
          aside { display: block !important; }
        }
        @media (max-width: 1023px) {
          aside { display: none !important; }
        }
      `}</style>
    </aside>
  )
}

export default Sidebar
