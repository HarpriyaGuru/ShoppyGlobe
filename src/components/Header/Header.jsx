import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';  // FontAwesome shopping cart icon
import './Header.css';  // Importing the CSS file for styles
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);  // Get the items from the Redux store
  const [cartCount, setCartCount] = useState(0);  // State to track the total number of items in the cart
  const [animate, setAnimate] = useState(false);  // State to trigger animation when cart changes

  // Effect to track changes in the cart items and update the cart count accordingly
  useEffect(() => {
    const totalCount = cartItems.reduce((count, item) => count + item.quantity, 0);  // Sum of all item quantities
    if (totalCount !== cartCount) {
      setAnimate(true);
      setCartCount(totalCount);  // Update cart count
      setTimeout(() => setAnimate(false), 500); // Remove animation class after animation completes
    }
  }, [cartItems, cartCount]);  // Dependency on cartItems and cartCount

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-text">ShoppyGlobe</Link>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/home" className="link">Home</Link></li>
          <li className="nav-item"><Link to="/products" className="link">Products</Link></li>
          <li className="nav-item"><Link to="/cart" className="link">Cart</Link></li>
        </ul>
      </nav>
      <div className="cart">
        <Link to="/cart" className="cart-link">
          <FaShoppingCart size={30} />
          {/* Display the total cart count with animation if quantity changes */}
          <span className={`cart-item-count ${animate ? 'animate' : ''}`}>{cartCount}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
