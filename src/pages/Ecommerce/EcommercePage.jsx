import React, { useState } from 'react';
import EcommerceLayout from './EcommerceLayout';
import ProductCatalog from './ProductCatalog';
import ProductDetail from './ProductDetail';
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout';
import Survey from './Survey';
import './Ecommerce.css';

function EcommercePage() {
  const [currentView, setCurrentView] = useState('catalog');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]);
  const [showSurvey, setShowSurvey] = useState(false);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const navigate = (view, productId = null) => {
    setCurrentView(view);
    if (productId) {
      setSelectedProductId(productId);
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'catalog':
        return (
          <ProductCatalog 
            addToCart={addToCart} 
            setShowSurvey={setShowSurvey}
            navigate={navigate}
          />
        );
      case 'product':
        return (
          <ProductDetail 
            productId={selectedProductId}
            addToCart={addToCart}
            navigate={navigate}
          />
        );
      case 'cart':
        return (
          <ShoppingCart 
            cart={cart}
            removeFromCart={removeFromCart}
            updateCartQuantity={updateCartQuantity}
            cartTotal={cartTotal}
            navigate={navigate}
          />
        );
      case 'checkout':
        return (
          <Checkout 
            cart={cart}
            cartTotal={cartTotal}
            clearCart={clearCart}
            setShowSurvey={setShowSurvey}
            navigate={navigate}
          />
        );
      default:
        return (
          <ProductCatalog 
            addToCart={addToCart} 
            setShowSurvey={setShowSurvey}
            navigate={navigate}
          />
        );
    }
  };

  return (
    <div className="ecommerce-app">
      <EcommerceLayout 
        cartItemCount={cartItemCount}
        currentView={currentView}
        navigate={navigate}
      >
        {renderCurrentView()}
        
        {showSurvey && (
          <Survey 
            onClose={() => setShowSurvey(false)} 
          />
        )}
      </EcommerceLayout>
    </div>
  );
}

export default EcommercePage;