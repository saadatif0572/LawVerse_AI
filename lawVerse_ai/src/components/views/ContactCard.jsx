import React from 'react';

const ContactCard = () => {
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
    maxWidth: '1000px',
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

  const iconStyle = {
    fontSize: '36px',
    marginBottom: '15px',
  };

  const typeStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: '10px',
  };

  const detailStyle = {
    fontSize: '15px',
    color: '#cbd5e0',
    marginBottom: '10px',
  };

  const linkStyle = {
    color: '#00d4ff',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const contacts = [
    { icon: '📧', type: 'Email', detail: 'support@lawverse.ai', link: 'mailto:support@lawverse.ai' },
    { icon: '📞', type: 'Phone', detail: '+1 (555) 123-4567', link: 'tel:+15551234567' },
    { icon: '📍', type: 'Address', detail: '123 Legal St, NY 10001', link: '#' },
  ];

  return (
    <section style={containerStyle}>
      <h2 style={titleStyle}>Get In Touch</h2>
      <div style={gridStyle}>
        {contacts.map((contact, idx) => (
          <div key={idx} style={cardStyle}>
            <div style={iconStyle}>{contact.icon}</div>
            <div style={typeStyle}>{contact.type}</div>
            <a href={contact.link} style={{ ...detailStyle, ...linkStyle }}>
              {contact.detail}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactCard;
