import React, { useState } from 'react';

function Checkout({ cart, cartTotal, clearCart, setShowSurvey, navigate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Shipping Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    // Order Notes
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, title: 'Personal Info', description: 'Enter your contact details' },
    { id: 2, title: 'Shipping', description: 'Where should we send your order?' },
    { id: 3, title: 'Payment', description: 'Complete your purchase' },
    { id: 4, title: 'Confirmation', description: 'Review and confirm your order' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    }
    
    if (step === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    }
    
    if (step === 3) {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
      if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and show success
    clearCart();
    setCurrentStep(5); // Success step
    setIsSubmitting(false);
    
    // Show survey after a delay
    setTimeout(() => {
      setShowSurvey(true);
    }, 3000);
  };

  const renderProgressBar = () => (
    <div className="progress-bar">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div key={step.id} className={`progress-step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
            <div className="step-number">{step.id}</div>
            <div className="step-info">
              <div className="step-title">{step.title}</div>
              <div className="step-description">{step.description}</div>
            </div>
            {index < steps.length - 1 && <div className="step-connector"></div>}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="checkout-step">
      <h3>Personal Information</h3>
      <p className="step-description">We'll use this information to contact you about your order.</p>
      
      <div className="form-grid">
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>
        
        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
        
        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
      </div>
    </div>
  );

  const renderShippingInfo = () => (
    <div className="checkout-step">
      <h3>Shipping Address</h3>
      <p className="step-description">Enter the address where you'd like your order delivered.</p>
      
      <div className="form-grid">
        <div className="form-group full-width">
          <label>Street Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={errors.address ? 'error' : ''}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>
        
        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={errors.city ? 'error' : ''}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>
        
        <div className="form-group">
          <label>State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={errors.state ? 'error' : ''}
          />
          {errors.state && <span className="error-message">{errors.state}</span>}
        </div>
        
        <div className="form-group">
          <label>ZIP Code *</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            className={errors.zipCode ? 'error' : ''}
          />
          {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
        </div>
        
        <div className="form-group">
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPaymentInfo = () => (
    <div className="checkout-step">
      <h3>Payment Information</h3>
      <p className="step-description">Your payment information is secure and encrypted.</p>
      
      <div className="payment-security">
        <span className="security-badge">🔒 Secure Payment</span>
        <span className="security-text">SSL encrypted checkout</span>
      </div>
      
      <div className="form-grid">
        <div className="form-group full-width">
          <label>Card Number *</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
            className={errors.cardNumber ? 'error' : ''}
          />
          {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
        </div>
        
        <div className="form-group">
          <label>Expiry Date *</label>
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            placeholder="MM/YY"
            className={errors.expiryDate ? 'error' : ''}
          />
          {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
        </div>
        
        <div className="form-group">
          <label>CVV *</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            placeholder="123"
            className={errors.cvv ? 'error' : ''}
          />
          {errors.cvv && <span className="error-message">{errors.cvv}</span>}
        </div>
        
        <div className="form-group full-width">
          <label>Cardholder Name *</label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleInputChange}
            className={errors.cardName ? 'error' : ''}
          />
          {errors.cardName && <span className="error-message">{errors.cardName}</span>}
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="checkout-step">
      <h3>Order Confirmation</h3>
      <p className="step-description">Please review your order details before completing your purchase.</p>
      
      <div className="order-summary">
        <div className="summary-section">
          <h4>Contact Information</h4>
          <p>{formData.firstName} {formData.lastName}</p>
          <p>{formData.email}</p>
          <p>{formData.phone}</p>
        </div>
        
        <div className="summary-section">
          <h4>Shipping Address</h4>
          <p>{formData.address}</p>
          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
          <p>{formData.country}</p>
        </div>
        
        <div className="summary-section">
          <h4>Payment Method</h4>
          <p>Card ending in {formData.cardNumber.slice(-4)}</p>
        </div>
        
        <div className="summary-section">
          <h4>Order Items</h4>
          {cart.map(item => (
            <div key={item.id} className="order-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="order-total">
          <div className="total-line">
            <span>Subtotal: ${cartTotal.toFixed(2)}</span>
          </div>
          <div className="total-line">
            <span>Tax: ${(cartTotal * 0.08).toFixed(2)}</span>
          </div>
          <div className="total-line">
            <span>Shipping: FREE</span>
          </div>
          <div className="total-line final-total">
            <span>Total: ${(cartTotal * 1.08).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="checkout-success">
      <div className="success-icon">✅</div>
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase. Your order has been successfully placed.</p>
      <div className="success-details">
        <p>Order confirmation has been sent to {formData.email}</p>
        <p>You'll receive shipping updates as your order is processed.</p>
      </div>
      <button onClick={() => navigate('catalog')} className="continue-shopping">
        Continue Shopping
      </button>
    </div>
  );

  if (currentStep === 5) {
    return renderSuccess();
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h2>Secure Checkout</h2>
        <p>Complete your purchase in just a few steps</p>
      </div>
      
      {renderProgressBar()}
      
      <div className="checkout-content">
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderPersonalInfo()}
            {currentStep === 2 && renderShippingInfo()}
            {currentStep === 3 && renderPaymentInfo()}
            {currentStep === 4 && renderConfirmation()}
            
            <div className="checkout-actions">
              {currentStep > 1 && (
                <button type="button" onClick={handleBack} className="back-button">
                  Back
                </button>
              )}
              
              {currentStep < 4 && (
                <button type="button" onClick={handleNext} className="next-button">
                  Continue
                </button>
              )}
              
              {currentStep === 4 && (
                <button type="submit" disabled={isSubmitting} className="submit-button">
                  {isSubmitting ? 'Processing...' : 'Complete Order'}
                </button>
              )}
            </div>
          </form>
        </div>
        
        <div className="checkout-sidebar">
          <div className="order-summary-sidebar">
            <h3>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} className="sidebar-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">Qty: {item.quantity}</span>
                </div>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="sidebar-total">
              <div className="total-line">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="total-line">
                <span>Tax:</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="total-line">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div className="total-line final">
                <span>Total:</span>
                <span>${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;