const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0f1c2e 0%, #1a2a42 100%)',
      color: '#aaa',
      borderTop: '2px solid #00d4ff',
      marginTop: 'auto',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Brand */}
          <div>
            <h3 style={{
              color: '#00d4ff',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              marginBottom: '0.5rem'
            }}>LawVerse AI</h3>
            <p style={{ fontSize: '0.9rem' }}>AI-Powered Legal Services at Your Fingertips</p>
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontWeight: 'bold',
              color: '#00d4ff',
              marginBottom: '0.5rem'
            }}>Contact</p>
            <p style={{ fontSize: '0.9rem' }}>📧 contact@lawverse-ai.com</p>
            <p style={{ fontSize: '0.9rem' }}>📱 +1 (555) 123-4567</p>
          </div>

          {/* Links */}
          <div>
            <p style={{
              fontWeight: 'bold',
              color: '#00d4ff',
              marginBottom: '0.5rem'
            }}>Quick Links</p>
            <ul style={{ fontSize: '0.9rem', listStyle: 'none', lineHeight: '1.8' }}>
              <li><a href="#" style={{ color: '#00d4ff', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: '#00d4ff', textDecoration: 'none' }}>Terms of Service</a></li>
              <li><a href="#" style={{ color: '#00d4ff', textDecoration: 'none' }}>Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #1a2a42',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.85rem'
        }}>
          <small>© {new Date().getFullYear()} LawVerse AI. All rights reserved.</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
