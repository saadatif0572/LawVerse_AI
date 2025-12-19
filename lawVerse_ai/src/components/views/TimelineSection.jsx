import React from 'react';

const TimelineSection = () => {
  const events = [
    { year: '2015', title: 'Company Founded', description: 'Started with a vision to revolutionize legal tech' },
    { year: '2018', title: 'AI Integration', description: 'Launched our first AI-powered legal research tool' },
    { year: '2021', title: 'Series A Funding', description: 'Raised $10M to expand globally' },
    { year: '2024', title: 'Market Leader', description: 'Trusted by 5,000+ legal professionals worldwide' },
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

  const timelineStyle = {
    maxWidth: '800px',
    margin: '0 auto',
  };

  const timelineItemStyle = (isLast) => ({
    display: 'flex',
    marginBottom: isLast ? 0 : '40px',
    position: 'relative',
  });

  const connectorStyle = (isLast) => ({
    position: 'absolute',
    left: '40px',
    top: '80px',
    width: '2px',
    height: isLast ? 0 : '60px',
    background: '#00d4ff',
  });

  const dotStyle = {
    width: '80px',
    height: '80px',
    minWidth: '80px',
    background: 'linear-gradient(135deg, #00d4ff 0%, #0096c7 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0a0e17',
    fontWeight: 'bold',
    fontSize: '18px',
    border: '3px solid #0a0e17',
    marginRight: '30px',
  };

  const contentStyle = {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid #00d4ff',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '10px',
    transition: 'all 0.3s ease',
  };

  const yearStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: '5px',
  };

  const eventTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '8px',
  };

  const descriptionStyle = {
    fontSize: '14px',
    color: '#666666',
  };

  return (
    <section style={containerStyle}>
      <h2 style={titleStyle}>Our Journey</h2>
      <div style={timelineStyle}>
        {events.map((event, idx) => (
          <div key={idx} style={timelineItemStyle(idx === events.length - 1)}>
            <div style={connectorStyle(idx === events.length - 1)} />
            <div style={dotStyle}>{event.year}</div>
            <div style={contentStyle}>
              <div style={eventTitleStyle}>{event.title}</div>
              <div style={descriptionStyle}>{event.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;
