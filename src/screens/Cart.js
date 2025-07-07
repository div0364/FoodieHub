import React, { useState } from 'react'
import Delete from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  if (data.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <ShoppingCartIcon className="empty-cart-icon" />
          <h3>Your Cart is Empty!</h3>
          <p>Looks like you haven't added any delicious food to your cart yet.</p>
          <a href="/" className="btn btn-primary">
            Start Shopping
          </a>
        </div>
      </div>
    )
  }

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (orderData) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load');
      return;
    }

    const options = {
      key: 'rzp_test_51H1234567890', // Replace with your actual Razorpay key
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'FoodieHub',
      description: 'Food Delivery Order',
      image: 'https://via.placeholder.com/150x50?text=FoodieHub',
      order_id: orderData.id,
      handler: function (response) {
        handlePaymentSuccess(response, orderData);
      },
      prefill: {
        name: localStorage.getItem('userEmail')?.split('@')[0] || '',
        email: localStorage.getItem('userEmail') || '',
        contact: '9999999999'
      },
      theme: {
        color: '#ff6b35'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePaymentSuccess = async (paymentResponse, orderData) => {
    try {
      // Save order to backend
      const response = await fetch("http://localhost:4000/api/v1/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: localStorage.getItem("userEmail"),
          order_date: new Date().toDateString(),
          payment_id: paymentResponse.razorpay_payment_id,
          order_id: orderData.id
        })
      });

      if (response.status === 200) {
        setOrderDetails({
          orderId: orderData.id,
          paymentId: paymentResponse.razorpay_payment_id,
          amount: orderData.amount / 100,
          items: data.length
        });
        setOrderPlaced(true);
        dispatch({ type: "DROP" });
      }
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Order placed but there was an issue saving details.");
    }
  };

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    
    if (!userEmail) {
      alert("Please login to checkout");
      return;
    }

    setIsCheckingOut(true);
    
    try {
      // Create order on backend first
      const orderResponse = await fetch("http://localhost:4000/api/v1/createOrder", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: totalPrice * 100, // Razorpay expects amount in paise
          currency: 'INR',
          receipt: 'order_' + Date.now()
        })
      });

      if (orderResponse.ok) {
        const orderData = await orderResponse.json();
        await displayRazorpay(orderData);
      } else {
        alert("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleRemoveItem = (index) => {
    dispatch({ type: "REMOVE", index: index });
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  let totalItems = data.reduce((total, food) => total + food.qty, 0);

  // Order success screen
  if (orderPlaced && orderDetails) {
    return (
      <div className="order-success">
        <div className="order-success-content">
          <CheckCircleIcon className="success-icon" />
          <h2>Order Placed Successfully!</h2>
          <div className="order-details">
            <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
            <p><strong>Payment ID:</strong> {orderDetails.paymentId}</p>
            <p><strong>Amount:</strong> ₹{orderDetails.amount}/-</p>
            <p><strong>Items:</strong> {orderDetails.items}</p>
          </div>
          <p className="delivery-info">
            Your order will be delivered within 30-45 minutes. 
            You'll receive updates on your email.
          </p>
          <div className="success-actions">
            <a href="/" className="btn btn-primary">Continue Shopping</a>
            <a href="/myOrder" className="btn btn-outline-primary">View Orders</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <div className="cart-summary">
            <span className="cart-items-count">{totalItems} items</span>
            <span className="cart-total-price">Total: ₹{totalPrice}/-</span>
          </div>
        </div>

        <div className="cart-container">
          <div className="table-responsive">
            <table className='table cart-table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Item</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Size</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((food, index) => (
                  <tr key={index} className="cart-item-row">
                    <td>{index + 1}</td>
                    <td>
                      <div className="cart-item-details">
                        {food.img && (
                          <img 
                            src={food.img} 
                            alt={food.name} 
                            className="cart-item-image"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1504674900240-9c9c0c1d0b1a?w=50&h=50&fit=crop';
                            }}
                          />
                        )}
                        <span className="cart-item-name">{food.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="quantity-badge">{food.qty}</span>
                    </td>
                    <td>
                      <span className="size-badge">{food.size}</span>
                    </td>
                    <td>
                      <span className="price">₹{food.price}/-</span>
                    </td>
                    <td>
                      <button 
                        type="button" 
                        className="btn btn-danger btn-sm remove-btn"
                        onClick={() => handleRemoveItem(index)}
                        title="Remove item"
                      >
                        <Delete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-footer">
            <div className="cart-total-section">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>₹{totalPrice}/-</span>
              </div>
              <div className="total-row">
                <span>Delivery Fee:</span>
                <span>₹{totalPrice > 500 ? 0 : 50}/-</span>
              </div>
              <div className="total-row total-final">
                <span>Total:</span>
                <span>₹{totalPrice > 500 ? totalPrice : totalPrice + 50}/-</span>
              </div>
              {totalPrice < 500 && (
                <div className="delivery-note">
                  Add ₹{500 - totalPrice} more for free delivery!
                </div>
              )}
            </div>

            <div className="cart-actions">
              <button 
                className='btn btn-primary checkout-btn' 
                onClick={handleCheckOut}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <PaymentIcon className="me-2" />
                    Proceed to Payment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}