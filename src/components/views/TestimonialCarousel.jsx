import React, { useState } from 'react';

const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: 'John Smith',
      role: 'CEO, Legal Firm Inc.',
      text: 'LawVerse AI transformed our legal research process. Incredibly efficient.',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: 'Corporate Counsel',
      text: 'The accuracy and speed of document analysis is unmatched in the industry.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Legal Manager',
      text: 'Best investment we made for our firm. Highly recommended.',
      rating: 5,
    },
  ];

  const [current, setCurrent] = useState(0);

  const containerStyle = {
    padding: '60px 20px',
    background: '#0a0e17',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: '50px',
  };

  const carouselStyle = {
    maxWidth: '700px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid #00d4ff',
    borderRadius: '16px',
    padding: '40px 30px',
    minHeight: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  };

  const textStyle = {
    fontSize: '18px',
    color: '#cbd5e0',
    marginBottom: '20px',
    lineHeight: '1.6',
  };

  const authorStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: '5px',
  };

  const roleStyle = {
    fontSize: '13px',
    color: '#a0aec0',
  };

  const starsStyle = {
    fontSize: '18px',
    color: '#00d4ff',
    marginBottom: '15px',
  };

  const dotsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '30px',
  };

  const dotStyle = (isActive) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: isActive ? '#0066cc' : '#cccccc',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  });

  const arrowStyle = {
    fontSize: '24px',
    color: '#0066cc',
    cursor: 'pointer',
    marginTop: '20px',
  };

  return (
    <section style={containerStyle}>
      <h2 style={titleStyle}>What Our Clients Say</h2>
      <div style={carouselStyle}>
        <div style={starsStyle}>{'⭐'.repeat(testimonials[current].rating)}</div>
        <p style={textStyle}>"{testimonials[current].text}"</p>
        <div>
          <div style={authorStyle}>{testimonials[current].name}</div>
          <div style={roleStyle}>{testimonials[current].role}</div>
        </div>
      </div>
      <div style={dotsStyle}>
        {testimonials.map((_, idx) => (
          <div
            key={idx}
            style={dotStyle(idx === current)}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
      <div style={arrowStyle}>
        <span
          onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)}
          style={{ marginRight: '15px', cursor: 'pointer' }}
        >
          ←
        </span>
        <span
          onClick={() => setCurrent((current + 1) % testimonials.length)}
          style={{ cursor: 'pointer' }}
        >
          →
        </span>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
