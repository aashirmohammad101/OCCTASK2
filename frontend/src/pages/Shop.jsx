import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import productsData from '../data/products.json';
import '../styles/Shop.css';
import { FaPlus, FaMinus, FaTrash, FaCheck, FaSort, FaFilter } from 'react-icons/fa';

const Shop = () => {
  const [products] = useState(productsData.products);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [notification, setNotification] = useState({ show: false, product: null });
  const [sortOrder, setSortOrder] = useState('default');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const navigate = useNavigate();

  // Extract unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return ['All', ...uniqueCategories];
  }, [products]);

  // Apply sorting and filtering
  const filteredAndSortedProducts = useMemo(() => {
    // First apply category filter
    let result = products;
    if (categoryFilter !== 'All') {
      result = products.filter(product => product.category === categoryFilter);
    }

    // Then apply sorting
    if (sortOrder === 'price-asc') {
      return [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      return [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, categoryFilter, sortOrder]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, product: null });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // If item already in cart, increase quantity
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      // Add new item to cart with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Show notification
    setNotification({ show: true, product });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setIsCheckingOut(true);

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cart,
          totalAmount: getTotalPrice()
        })
      });

      if (response.ok) {
        // Reset cart on successful order
        setCart([]);
        setShowCart(false);
        alert('Order placed successfully!');
      } else {
        const errorData = await response.json();
        alert(`Checkout failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process your order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="shop-page" style={{padding: '20px'}}>
      <Navbar cartItemCount={getTotalItems()} onCartClick={() => setShowCart(!showCart)} />
      
      <div className="shop-header">
        <h1 style={{color: 'black',fontFamily:"Eagle Lake, serif"}}>Rolsa Shop</h1>
        <p style={{color: 'black',fontFamily:"Eagle Lake, serif"}}>Find your perfect products to save on your energy bills</p>
      </div>

      {/* Add to Cart Notification Popup */}
      {notification.show && notification.product && (
        <div className="add-to-cart-notification">
          <div className="notification-content">
            <div className="notification-icon">
              <FaCheck />
            </div>
            <div className="notification-message">
              <p><strong>{notification.product.name}</strong> has been added to your cart</p>
            </div>
          </div>
        </div>
      )}

      <div className="shop-container">
        {/* Filter and Sort Controls */}
        <div className="filter-sort-container">
          <div className="filter-group">
            <label htmlFor="category-filter">
              <FaFilter /> Filter by:
            </label>
            <select 
              id="category-filter" 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="sort-group">
            <label htmlFor="sort-order">
              <FaSort /> Sort by:
            </label>
            <select 
              id="sort-order" 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="no-products-message">
              <p>No products found matching your criteria.</p>
            </div>
          ) : (
            filteredAndSortedProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">${product.price}</p>
                  <p className="product-description">{product.description}</p>
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Shopping Cart Sidebar */}
        <div className={`cart-sidebar ${showCart ? 'open' : ''}`}>
          <div className="cart-header">
            <h2>Your Cart ({getTotalItems()} items)</h2>
            <button className="close-cart-btn" onClick={() => setShowCart(false)}>×</button>
          </div>
          
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">£{item.price}</p>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <FaMinus />
                        </button>
                        <span className="item-quantity">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <button 
                      className="remove-item-btn" 
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="subtotal">
                  <span>Subtotal:</span>
                  <span>£{getTotalPrice().toFixed(2)}</span>
                </div>
                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
