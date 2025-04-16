import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
 
  const handleUpdateQuantity = (item, newQuantity) => {
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity })); // Dispatch updateQuantity action
    const { name, quantity } = action.payload;
    const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        }
  };
  

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, plant) => total + plant.quantity * parseFloat(plant.cost.substring(1)), 0).toFixed(2);
  };
  

  const handleContinueShopping = (e) => {
    e.preventDefault(); // Prevent default behavior
    onContinueShopping(); // Call the function passed from the parent component
  };


  const handleIncrement = (plant) => {
    dispatch(updateQuantity({ name: plant.name, quantity: plant.quantity + 1 })); // Increment quantity
  };
  
  const handleDecrement = (plant) => {
    if (plant.quantity > 1) {
      dispatch(updateQuantity({ name: plant.name, quantity: plant.quantity - 1 })); // Decrement quantity
    } else {
      dispatch(removeItem(plant.name)); // Remove item if quantity would drop to 0
    }
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleRemove = (item) =>{
    dispatch(removeItem(item.name)); // Remove item from the cart
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost.substring(1))).toFixed(2); // Extract numeric value and calculate subtotal
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
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
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
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


