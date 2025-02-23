import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../../utils/cartSlice'; // Import the actions
import './CartItem.css'; // Import CSS for the CartItem component

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // Handle removing the item from the cart
  const handleRemove = () => {
    dispatch(removeItem(item.id)); // Dispatch remove action with item id
  };

  // Handle updating the item quantity
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity })); // Dispatch updateQuantity action
    }
  };

  return (
    <div className="cart-item">
      <img src={item.images} alt={item.title} className="cart-item-image" />
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">${item.price}</p>
        <div className="cart-item-quantity">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="quantity-btn"
          >
            -
          </button>
          <span className="cart-item-quantity-value">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="quantity-btn"
          >
            +
          </button>
        </div>
        <button onClick={handleRemove} className="remove-btn">
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
