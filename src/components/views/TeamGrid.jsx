import React from 'react';

const TeamGrid = () => {
  const team = [
    { name: 'Dr. James Wilson', role: 'Founder & CEO', specialty: 'Legal AI' },
    { name: 'Sarah Mitchell', role: 'CTO', specialty: 'Machine Learning' },
    { name: 'Robert Chang', role: 'Lead Developer', specialty: 'Full-Stack' },
    { name: 'Emily Rodriguez', role: 'Legal Advisor', specialty: 'Corporate Law' },
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

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid #00d4ff',
    borderRadius: '12px',
    padding: '30px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const avatarStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00d4ff 0%, #0096c7 100%)',
    margin: '0 auto 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#fff',
  };

  const nameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '5px',
  };

  const roleStyle = {
    fontSize: '13px',
    color: '#00d4ff',
    marginBottom: '8px',
  };

  const specialtyStyle = {
    fontSize: '13px',
    color: '#cbd5e0',
  };

  return (
    <section style={containerStyle}>
      <h2 style={titleStyle}>Meet Our Team</h2>
      <div style={gridStyle}>
        {team.map((member, idx) => (
          <div
            key={idx}
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#333333';
              e.currentTarget.style.background = 'rgba(0, 102, 204, 0.15)';
              e.currentTarget.style.transform = 'translateY(-10px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#0066cc';
              e.currentTarget.style.background = 'rgba(0, 102, 204, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={avatarStyle}>{member.name.charAt(0)}</div>
            <div style={nameStyle}>{member.name}</div>
            <div style={roleStyle}>{member.role}</div>
            <div style={specialtyStyle}>{member.specialty}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamGrid;
