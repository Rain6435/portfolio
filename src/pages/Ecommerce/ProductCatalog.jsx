import React, { useState, useEffect } from 'react';
import { productsData } from './data/products';

function ProductCatalog({ addToCart, setShowSurvey, navigate }) {
  const [products] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    brand: '',
    rating: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Extract unique values for filters
  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];
  const priceRanges = [
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: 'Over $200', value: '200+' }
  ];

  useEffect(() => {
    let result = products;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Apply brand filter
    if (filters.brand) {
      result = result.filter(product => product.brand === filters.brand);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(product => {
        if (filters.priceRange === '200+') {
          return product.price >= 200;
        }
        return product.price >= min && product.price <= max;
      });
    }

    // Apply rating filter
    if (filters.rating) {
      result = result.filter(product => product.rating >= parseFloat(filters.rating));
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(result);
  }, [products, filters, searchTerm, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      brand: '',
      rating: ''
    });
    setSearchTerm('');
    setSortBy('name');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    // Redirect to cart page after adding product
    navigate('cart');
  };

  return (
    <div className="product-catalog">
      <div className="catalog-header">
        <h1>Discover Amazing Tech</h1>
        <p className="hero-text">
          Explore our curated collection of premium tech accessories. 
          Find the perfect gadgets to enhance your digital lifestyle.
        </p>
        <div className="cta-banner">
          <span className="deal-badge">🔥 Flash Sale!</span>
          <span className="deal-text">Up to 30% off select items - Limited time only!</span>
        </div>
      </div>

      <div className="catalog-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-section">
          <h3>Refine Your Search</h3>
          <div className="filter-grid">
            <div className="filter-group">
              <label>Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Brand</label>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="">Any Price</option>
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Minimum Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button onClick={clearFilters} className="clear-filters">
              Clear All Filters
            </button>
          </div>
        </div>

        <div className="sort-section">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              {product.sale && <span className="sale-badge">SALE</span>}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-brand">{product.brand}</p>
              <div className="product-rating">
                <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}</span>
                <span className="rating-text">({product.rating})</span>
              </div>
              <div className="product-price">
                {product.originalPrice && (
                  <span className="original-price">${product.originalPrice}</span>
                )}
                <span className="current-price">${product.price}</span>
              </div>
              <div className="product-actions">
                <button 
                  onClick={() => navigate('product', product.id)} 
                  className="view-details"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="add-to-cart"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <h3>No products found</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}

      <div className="catalog-footer">
        <button 
          onClick={() => setShowSurvey(true)}
          className="survey-trigger"
        >
          Share Your Shopping Experience
        </button>
      </div>
    </div>
  );
}

export default ProductCatalog;