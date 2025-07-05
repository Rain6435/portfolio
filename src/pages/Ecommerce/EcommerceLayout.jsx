import React from 'react';

function EcommerceLayout({ children, cartItemCount, currentView, navigate }) {
  return (
    <div className="ecommerce-layout">
      <header className="ecommerce-header">
        <div className="container">
          <div className="header-content">
            <button 
              onClick={() => navigate('catalog')} 
              className="logo"
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              <h1>TechVibe</h1>
              <span className="tagline">Premium Tech Accessories</span>
            </button>
            
            <nav className="main-nav">
              <button 
                onClick={() => navigate('catalog')}
                className={currentView === 'catalog' ? 'active' : ''}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
              >
                Shop Now
              </button>
              <button 
                onClick={() => navigate('cart')}
                className={`cart-link ${currentView === 'cart' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
              >
                Cart ({cartItemCount})
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="ecommerce-main">
        <div className="container">
          {children}
        </div>
      </main>

      <footer className="ecommerce-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>TechVibe</h3>
              <p>Your trusted source for premium tech accessories. Quality products at unbeatable prices.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => navigate('catalog')} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', textDecoration: 'none' }}>Shop</button></li>
                <li><button onClick={() => navigate('cart')} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', textDecoration: 'none' }}>Cart</button></li>
                <li><a href="#support">Support</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#facebook" aria-label="Facebook">📘</a>
                <a href="#twitter" aria-label="Twitter">🐦</a>
                <a href="#instagram" aria-label="Instagram">📷</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 TechVibe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default EcommerceLayout;