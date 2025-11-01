import { Link } from 'react-router-dom';

export default function PricingSection() {
  const cardStyle = {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    position: 'relative',
    transition: 'transform 0.3s, box-shadow 0.3s',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  };

  const featuredCardStyle = {
    ...cardStyle,
    border: '3px solid #00d4ff'
  };

  const planNameStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#1a1a2e'
  };

  const priceStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: '5px'
  };

  const priceSpanStyle = {
    fontSize: '18px',
    color: '#666'
  };

  const descriptionStyle = {
    color: '#666',
    marginBottom: '30px',
    minHeight: '50px'
  };

  const listStyle = {
    listStyle: 'none',
    marginBottom: '30px',
    flex: '1',
    padding: 0
  };

  const listItemStyle = {
    padding: '12px 0',
    color: '#333',
    borderBottom: '1px solid #f0f0f0'
  };

  const checkmarkStyle = {
    color: '#00d4ff',
    fontWeight: 'bold',
    marginRight: '10px'
  };

  const buttonStyle = {
    width: '100%',
    background: '#00d4ff',
    color: '#1a1a2e',
    padding: '12px 30px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'center',
    display: 'block'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#00d4ff',
    color: '#1a1a2e',
    padding: '6px 20px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '12px'
  };

  return (
    <section id="pricing" style={{ padding: '80px 0', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '38px', fontWeight: 'bold', marginBottom: '20px', color: '#1a1a2e' }}>
          Simple, Transparent Pricing
        </h2>
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#666', marginBottom: '60px' }}>
          Start with a 14-day free trial. No credit card required. Cancel anytime.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px', 
          maxWidth: '1000px', 
          margin: '0 auto' 
        }}>
          {/* Starter Plan */}
          <div style={cardStyle}>
            <div style={planNameStyle}>Starter</div>
            <div style={priceStyle}>
              $49<span style={priceSpanStyle}>/month</span>
            </div>
            <div style={descriptionStyle}>Perfect for testing the waters</div>
            <ul style={listStyle}>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Up to 50 calls/month</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Call recording & transcription</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Basic analytics</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Email support</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Custom greetings</li>
            </ul>
            <Link to="/signup?plan=starter" style={buttonStyle}>Get Started</Link>
          </div>

          {/* Professional Plan - Featured */}
          <div style={featuredCardStyle}>
            <div style={badgeStyle}>MOST POPULAR</div>
            <div style={planNameStyle}>Professional</div>
            <div style={priceStyle}>
              $79<span style={priceSpanStyle}>/month</span>
            </div>
            <div style={descriptionStyle}>For growing businesses</div>
            <ul style={listStyle}>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Up to 500 calls/month</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Advanced AI responses</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Calendar integration</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Full analytics dashboard</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Priority support</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Custom AI training</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>SMS notifications</li>
            </ul>
            <Link to="/signup?plan=professional" style={buttonStyle}>Get Started</Link>
          </div>

          {/* Enterprise Plan */}
          <div style={cardStyle}>
            <div style={planNameStyle}>Enterprise</div>
            <div style={priceStyle}>Custom</div>
            <div style={descriptionStyle}>For high-volume operations</div>
            <ul style={listStyle}>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Unlimited calls</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Dedicated account manager</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Custom integrations</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>24/7 phone support</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>SLA guarantee</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>Multi-location support</li>
              <li style={listItemStyle}><span style={checkmarkStyle}>✓</span>White-label options</li>
            </ul>
            <Link to="/signup?plan=enterprise" style={buttonStyle}>Contact Sales</Link>
          </div>
        </div>
        
        <p style={{ textAlign: 'center', marginTop: '30px', color: '#666' }}>
          <strong>Overage?</strong> Just $0.15 per additional call. No surprises.
        </p>
      </div>
    </section>
  );
}

