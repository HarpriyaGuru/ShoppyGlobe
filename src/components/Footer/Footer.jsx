import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.css";

const Footer = () => {
  return (
    <>
    <footer className="footer">
  <div className="footer-container">
    <div className="footer-section">
      <h4>About Us</h4>
      <p>ShoppyGlobe is your one-stop online shop for the best deals on a wide range of products. Shop with us for great prices and high-quality items!</p>
    </div>
    <div className="footer-section">
      <h4>Quick Links</h4>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </div>
    <div className="footer-section">
      <h4>Follow Us</h4>
      <div className="social-icons">
        <Link to="https://facebook.com" rel="noopener noreferrer">Facebook</Link>
        <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</Link>
        <Link to ="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</Link>
      </div>
    </div>
    <div className="footer-section">
      <h4>Contact</h4>
      <p>Email: support@shoppyglobe.com</p>
      <p>Phone: +1 234 567 890</p>
    </div>
  </div>

  <div className="footer-bottom">
    <p>&copy; 2025 ShoppyGlobe. All Rights Reserved.</p>
  </div>
</footer>
    </>
  )
}

export default Footer
