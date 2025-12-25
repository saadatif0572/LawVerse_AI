const Sidebar = () => {
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
      <p style={{
        fontWeight: 'bold',
        color: '#00d4ff',
        marginBottom: '1.5rem'
      }}>📚 Features</p>
      <ul style={{ listStyle: 'none' }}>
        <li style={{
          padding: '0.75rem',
          borderRadius: '4px',
          borderLeft: '4px solid #00d4ff',
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          color: '#64b5f6',
          cursor: 'pointer',
          transition: 'all 0.3s',
          marginBottom: '0.5rem'
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#00d4ff'
          e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#64b5f6'
          e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.1)'
        }}
        >
          <span style={{ color: '#00d4ff', marginRight: '0.5rem' }}>⚡</span> Instant Legal Insights
        </li>
        <li style={{
          padding: '0.75rem',
          borderRadius: '4px',
          borderLeft: '4px solid #00d4ff',
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          color: '#64b5f6',
          cursor: 'pointer',
          transition: 'all 0.3s',
          marginBottom: '0.5rem'
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#00d4ff'
          e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#64b5f6'
          e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.1)'
        }}
        >
          <span style={{ color: '#00d4ff', marginRight: '0.5rem' }}>🔒</span> Secure Document Analysis
        </li>
        <li style={{
          padding: '0.75rem',
          borderRadius: '4px',
          borderLeft: '4px solid #00d4ff',
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          color: '#64b5f6',
          cursor: 'pointer',
          transition: 'all 0.3s',
          marginBottom: '0.5rem'
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#00d4ff'
          e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#64b5f6'
          e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.1)'
        }}
        >
          <span style={{ color: '#00d4ff', marginRight: '0.5rem' }}>📋</span> Contract Review
        </li>
        <li style={{
          padding: '0.75rem',
          borderRadius: '4px',
          borderLeft: '4px solid #00d4ff',
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          color: '#64b5f6',
          cursor: 'pointer',
          transition: 'all 0.3s',
          marginBottom: '0.5rem'
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#00d4ff'
          e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#64b5f6'
          e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.1)'
        }}
        >
          <span style={{ color: '#00d4ff', marginRight: '0.5rem' }}>🤖</span> AI-Powered Research
        </li>
      </ul>

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
