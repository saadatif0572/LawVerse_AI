import React from 'react';

const FeaturesGrid = () => {
  const features = [
    { icon: '🔍', title: 'Smart Search', description: 'AI-powered legal document search with advanced filtering' },
    { icon: '📊', title: 'Analytics', description: 'Real-time insights into your cases and documents' },
    { icon: '🛡️', title: 'Security', description: 'Enterprise-grade encryption and compliance' },
    { icon: '⚡', title: 'Fast Processing', description: 'Analyze documents in seconds, not hours' },
    { icon: '🤝', title: 'Collaboration', description: 'Built-in tools for team collaboration and sharing' },
    { icon: '📱', title: 'Mobile Ready', description: 'Access your work anywhere, anytime' },
  ];

  const containerStyle = {
    padding: '60px 20px',
    background: '#0a0e17',
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#00d4ff',
    textAlign: 'center',
    marginBottom: '50px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const featureCardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid #00d4ff',
    borderRadius: '12px',
    padding: '30px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const iconStyle = {
    fontSize: '48px',
    marginBottom: '15px',
  };

  const featureTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    fontSize: '14px',
    color: '#cbd5e0',
    lineHeight: '1.6',
  };

  return (
    <section style={containerStyle}>
      <h2 style={titleStyle}>Powerful Features</h2>
      <div style={gridStyle}>
        {features.map((feature, idx) => (
          <div
            key={idx}
            style={featureCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#fff';
              e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#00d4ff';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={iconStyle}>{feature.icon}</div>
            <h3 style={featureTitleStyle}>{feature.title}</h3>
            <p style={descriptionStyle}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
