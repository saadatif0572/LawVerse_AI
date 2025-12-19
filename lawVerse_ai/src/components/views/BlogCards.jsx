import React from 'react';

const BlogCards = () => {
  const blogs = [
    {
      title: 'AI Transforming Legal Industry',
      date: 'Dec 1, 2024',
      excerpt: 'Explore how artificial intelligence is reshaping legal practices and client experiences.',
      category: 'AI & Legal',
    },
    {
      title: 'Document Review Automation',
      date: 'Nov 28, 2024',
      excerpt: 'Learn how automation reduces document review time by 80% and improves accuracy.',
      category: 'Technology',
    },
    {
      title: 'Corporate Law Trends 2024',
      date: 'Nov 25, 2024',
      excerpt: 'Key trends and insights from the corporate legal sector this year.',
      category: 'News',
    },
  ];

  const containerStyle = {
    padding: '60px 20px',
    background: '#0a0e17',
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '50px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid #00d4ff',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    background: 'linear-gradient(135deg, #00d4ff 0%, #0096c7 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
  };

  const contentStyle = {
    padding: '20px',
  };

  const categoryStyle = {
    fontSize: '12px',
    color: '#00d4ff',
    textTransform: 'uppercase',
    marginBottom: '8px',
    fontWeight: 'bold',
  };

  const blogTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '8px',
  };

  const excerptStyle = {
    fontSize: '14px',
    color: '#cbd5e0',
    marginBottom: '12px',
    lineHeight: '1.5',
  };

  const dateStyle = {
    fontSize: '12px',
    color: '#a0aec0',
  };

  return (
    <section style={containerStyle}>
      <h2 style={titleStyle}>Latest Blog Posts</h2>
      <div style={gridStyle}>
        {blogs.map((blog, idx) => (
          <div
            key={idx}
            style={cardStyle}
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
            <div style={imageStyle}>📄</div>
            <div style={contentStyle}>
              <div style={categoryStyle}>{blog.category}</div>
              <h3 style={blogTitleStyle}>{blog.title}</h3>
              <p style={excerptStyle}>{blog.excerpt}</p>
              <div style={dateStyle}>{blog.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogCards;
