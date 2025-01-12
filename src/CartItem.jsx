import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CartItem.css';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping, setShowCart }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
      .map(item => {
        const cost = parseFloat(item.cost.slice(1)); // Remove "$" and convert to number
        return item.quantity * cost; // Calculate total cost for the item
      })
      .reduce((total, itemCost) => total + itemCost, 0) // Sum up all item costs
      .toFixed(2); // Round to 2 decimal places
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);  // This will hide the cart and show the plant list
    if (onContinueShopping) onContinueShopping();  // Additional actions if passed
  };

  const handleIncrement = (item) => {
    // Increment the item quantity by 1
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Decrement the item quantity by 1
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity reaches 1, remove the item from the cart
      dispatch(removeItem(item.name)); 
    }
  };

  const handleRemove = (item) => {
    // Remove item directly from the cart
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.slice(1)); // Remove "$" and convert to number
    return (cost * item.quantity).toFixed(2); // Calculate total cost for the item
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button 
                  className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
