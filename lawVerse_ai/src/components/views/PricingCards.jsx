import React from 'react';

const PricingCards = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      features: ['10 AI Queries/month', 'Basic Analytics', 'Email Support'],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$299',
      period: '/month',
      features: ['Unlimited Queries', 'Advanced Analytics', 'Priority Support', 'Custom Reports'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '$999',
      period: '/month',
      features: ['Unlimited Everything', 'Dedicated Manager', '24/7 Support', 'Custom Integration'],
      highlighted: false,
    },
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const cardStyle = (highlighted) => ({
    background: highlighted
      ? 'linear-gradient(135deg, #00d4ff 0%, #0096c7 100%)'
      : 'rgba(255, 255, 255, 0.05)',
    border: highlighted ? '1px solid #00d4ff' : '1px solid #00d4ff',
    borderRadius: '16px',
    padding: '40px 30px',
    textAlign: 'center',
    position: 'relative',
    transition: 'all 0.3s ease',
    transform: highlighted ? 'scale(1.05)' : 'scale(1)',
    cursor: 'pointer',
  });

  const planNameStyle = (highlighted) => ({
    fontSize: '24px',
    fontWeight: 'bold',
    color: highlighted ? '#0a0e17' : '#00d4ff',
    marginBottom: '15px',
  });

  const priceStyle = (highlighted) => ({
    fontSize: '48px',
    fontWeight: 'bold',
    color: highlighted ? '#0a0e17' : '#00d4ff',
    marginBottom: '5px',
  });

  const periodStyle = (highlighted) => ({
    fontSize: '14px',
    color: highlighted ? 'rgba(10, 14, 23, 0.8)' : '#cbd5e0',
    marginBottom: '30px',
  });

  const featureListStyle = {
    textAlign: 'left',
    marginBottom: '30px',
    minHeight: '150px',
  };

  const featureStyle = (highlighted) => ({
    fontSize: '14px',
    color: highlighted ? 'rgba(255,255,255,0.9)' : '#555555',
    padding: '10px 0',
    borderBottom: highlighted ? 'none' : '1px solid rgba(0, 102, 204, 0.1)',
  });

  const buttonStyle = (highlighted) => ({
    width: '100%',
    padding: '12px 20px',
    background: highlighted ? '#f8f9fa' : '#0066cc',
    color: highlighted ? '#0066cc' : '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  });

  return (
    <section style={containerStyle}>
      <h2 style={titleStyle}>Simple, Transparent Pricing</h2>
      <div style={gridStyle}>
        {plans.map((plan, idx) => (
          <div
            key={idx}
            style={cardStyle(plan.highlighted)}
            onMouseEnter={(e) => {
              if (!plan.highlighted) {
                e.currentTarget.style.borderColor = '#333333';
                e.currentTarget.style.background = 'rgba(0, 102, 204, 0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (!plan.highlighted) {
                e.currentTarget.style.borderColor = '#0066cc';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              }
            }}
          >
            <div style={planNameStyle(plan.highlighted)}>{plan.name}</div>
            <div style={priceStyle(plan.highlighted)}>{plan.price}</div>
            <div style={periodStyle(plan.highlighted)}>{plan.period}</div>
            <div style={featureListStyle}>
              {plan.features.map((feature, fidx) => (
                <div key={fidx} style={featureStyle(plan.highlighted)}>
                  ✓ {feature}
                </div>
              ))}
            </div>
            <button
              style={buttonStyle(plan.highlighted)}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
              }}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingCards;
