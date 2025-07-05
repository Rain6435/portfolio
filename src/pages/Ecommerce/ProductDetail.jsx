import React, { useState } from 'react';
import { productsData } from './data/products';

function ProductDetail({ addToCart, productId, navigate }) {
  const product = productsData.find(p => p.id === parseInt(productId));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');


  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('catalog')}>Back to Catalog</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="product-detail">
      <div className="breadcrumb">
        <button onClick={() => navigate('catalog')}>Catalog</button>
        <span> / </span>
        <span>{product.category}</span>
        <span> / </span>
        <span>{product.name}</span>
      </div>

      {/* Hero Section */}
      <div className="product-hero">
        <div className="hero-image-container">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
            {product.sale && <span className="sale-badge">SALE</span>}
          </div>
          <div className="image-gallery-nav">
            <div className="thumbnail-placeholder"></div>
            <div className="thumbnail-placeholder"></div>
            <div className="thumbnail-placeholder"></div>
          </div>
          
          <div className="product-description">
            <h3>About This Product</h3>
            {product.detailedDescription && (
              <p className="detailed-description">{product.detailedDescription}</p>
            )}
          </div>
        </div>
        
        <div className="hero-info">
          <div className="product-header">
            <p className="product-brand">{product.brand}</p>
            <h1>{product.name}</h1>
            <div className="product-rating">
              <span className="stars">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5-Math.floor(product.rating))}
              </span>
              <span className="rating-text">({product.rating} out of 5)</span>
            </div>
          </div>

          <div className="product-pricing">
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice}</span>
            )}
            <span className="current-price">${product.price}</span>
            {product.sale && (
              <span className="savings">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="add-to-cart-button"
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="product-benefits">
        <h3>Why Choose This Product?</h3>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">🚚</div>
            <div className="benefit-text">
              <h4>Free Shipping</h4>
              <p>On all orders over $50</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">💯</div>
            <div className="benefit-text">
              <h4>30-Day Guarantee</h4>
              <p>Money back if not satisfied</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🔒</div>
            <div className="benefit-text">
              <h4>2-Year Warranty</h4>
              <p>Manufacturer warranty included</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">📞</div>
            <div className="benefit-text">
              <h4>24/7 Support</h4>
              <p>Customer service available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="product-details-tabs">
        <div className="tab-navigation">
          <button 
            className={activeTab === 'description' ? 'active' : ''}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={activeTab === 'features' ? 'active' : ''}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button 
            className={activeTab === 'reviews' ? 'active' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="tab-panel">
              <h3>Product Description</h3>
              <p>{product.description}</p>
              {product.detailedDescription && (
                <p>{product.detailedDescription}</p>
              )}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="tab-panel">
              <h3>Key Features</h3>
              <ul className="features-list">
                {product.features && product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              {(!product.features || product.features.length === 0) && (
                <p>No features information available.</p>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-panel">
              <h3>Customer Reviews</h3>
              <div className="review-summary">
                <div className="rating-overview">
                  <span className="large-rating">{product.rating}</span>
                  <div className="rating-details">
                    <div className="stars">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5-Math.floor(product.rating))}
                    </div>
                    <span>Based on {product.reviews ? product.reviews.length : 0} verified reviews</span>
                  </div>
                </div>
              </div>
              
              <div className="sample-reviews">
                {product.reviews && product.reviews.map(review => (
                  <div key={review.id} className="review">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <span className="reviewer-name">{review.reviewer}</span>
                        {review.verified && <span className="verified-badge">✓ Verified Purchase</span>}
                      </div>
                      <span className="review-rating">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                      </span>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
                
                {(!product.reviews || product.reviews.length === 0) && (
                  <p>No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h3>You Might Also Like</h3>
          <div className="related-products-grid">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="related-product-card">
                <button onClick={() => navigate('product', relatedProduct.id)}>
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                  <h4>{relatedProduct.name}</h4>
                  <p className="price">${relatedProduct.price}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;