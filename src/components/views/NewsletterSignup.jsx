import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  const containerStyle = {
    padding: '60px 20px',
    background: 'linear-gradient(135deg, #0a0e17 0%, #0f1c2e 100%)',
    borderTop: '2px solid #00d4ff',
    borderBottom: '2px solid #00d4ff',
  };

  const contentStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: '15px',
  };

  const descriptionStyle = {
    fontSize: '16px',
    color: '#cbd5e0',
    marginBottom: '30px',
  };

  const formStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  };

  const inputStyle = {
    flex: 1,
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '2px solid #00d4ff',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
  };

  const buttonStyle = {
    padding: '12px 30px',
    background: '#00d4ff',
    color: '#0a0e17',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const messageStyle = {
    fontSize: '14px',
    color: '#4ade80',
    fontWeight: 'bold',
  };

  return (
    <section style={containerStyle}>
      <div style={contentStyle}>
        <h2 style={titleStyle}>Stay Updated</h2>
        <p style={descriptionStyle}>Get the latest news and insights about legal AI delivered to your inbox.</p>

        {submitted ? (
          <div style={messageStyle}>✓ Thank you! Check your email for updates.</div>
        ) : (
          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => {
                e.target.style.background = '#00a8cc';
                e.target.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#00d4ff';
                e.target.style.boxShadow = 'none';
              }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSignup;
