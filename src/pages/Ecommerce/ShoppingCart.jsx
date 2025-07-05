import React from 'react';

function ShoppingCart({ cart, removeFromCart, updateCartQuantity, cartTotal, navigate }) {
  if (cart.length === 0) {
    return (
      <div className="shopping-cart empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Discover amazing products and start shopping!</p>
        <button onClick={() => navigate('catalog')} className="continue-shopping">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        <p>Review your items and proceed to checkout when ready.</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-brand">{item.brand}</p>
                <p className="item-price">${item.price}</p>
              </div>
              <div className="item-quantity">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="item-total">
                <span className="total-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-content">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="summary-line">
              <span>Tax:</span>
              <span>${(cartTotal * 0.08).toFixed(2)}</span>
            </div>
            <hr />
            <div className="summary-line total">
              <span>Total:</span>
              <span>${(cartTotal * 1.08).toFixed(2)}</span>
            </div>
            
            <div className="cart-actions">
              <button 
                onClick={() => navigate('checkout')}
                className="checkout-button"
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
              <button onClick={() => navigate('catalog')} className="continue-shopping">
                Continue Shopping
              </button>
            </div>
          </div>

          <div className="cart-benefits">
            <h4>Why Shop with TechVibe?</h4>
            <ul>
              <li>✓ Free shipping on all orders</li>
              <li>✓ 30-day return policy</li>
              <li>✓ 2-year warranty included</li>
              <li>✓ 24/7 customer support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;