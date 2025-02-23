import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../../utils/cartSlice";
import "./Cart.css"; // Import CSS
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Cart = () => {
  const items = useSelector((state) => state.cart.items); // Access cart items from Redux store
  const dispatch = useDispatch();

  // Handle removing an item from the cart
  const handleRemove = (id) => {
    dispatch(removeItem(id)); // Dispatch removeItem action to remove item by ID
  };

  // Handle updating the quantity of an item
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity })); // Dispatch updateQuantity action
    }
  };

  // Calculate total price of items in the cart
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {items.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.images} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="cart-summary">
              <div className="total-price">
                <h3>Total Price</h3>
                <p>${calculateTotal()}</p>
              </div>

              {/* Billing Section */}
              <div className="billing-section">
                <h3>Billing Information</h3>
                <form className="billing-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" placeholder="Enter your name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Shipping Address</label>
                    <input type="text" id="address" placeholder="Enter your address" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="payment">Payment Method</label>
                    <select id="payment" required>
                      <option value="">Select payment method</option>
                      <option value="credit-card">Credit Card</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>
                  <button type="submit" className="checkout-btn">Proceed to Checkout</button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
