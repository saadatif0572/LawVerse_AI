const AboutView1 = () => {
  return (
    <section className="fade-in" style={{
      background: '#1a2a42',
      borderRadius: '8px',
      padding: '2rem',
      marginBottom: '2rem'
    }}>
      <h3 style={{
        color: '#00d4ff',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem'
      }}>Our Mission</h3>
      <p style={{
        lineHeight: '1.6',
        color: '#e0e0e0',
        marginBottom: '1rem'
      }}>
        At LawVerse AI, we believe legal services should be intelligent, accessible, and efficient. Our mission is to democratize legal intelligence by combining advanced AI with domain expertise. We empower lawyers, paralegals, and businesses to make smarter decisions, reduce risk, and accelerate outcomes through cutting-edge AI technology.
      </p>
      <p style={{
        lineHeight: '1.6',
        color: '#e0e0e0'
      }}>
        By analyzing thousands of legal documents and precedents, our AI provides actionable insights that would traditionally take hours to uncover—all in seconds.
      </p>
    </section>
  )
}

export default AboutView1
