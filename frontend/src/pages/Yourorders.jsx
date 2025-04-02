import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Yourorders.css';

const YourOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if not logged in
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/orders/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch orders');
        }
      } catch (err) {
        setError('An error occurred while fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='page'>
      <Navbar />
      <div className="your-orders-page">
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <p>You have not placed any orders yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <h2>Order ID: {order._id}</h2>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Total Amount:</strong> £{order.totalAmount.toFixed(2)}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <div className="order-items">
                  <h3>Items:</h3>
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <p><strong>{item.name}</strong></p>
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YourOrders;