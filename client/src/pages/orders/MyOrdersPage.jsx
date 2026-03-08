import React, { useEffect, useState } from "react";
import { orderApi } from "../../api/orderApi";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderApi.getMyOrders();
        if (res.status === "success") {
          setOrders(res.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error(err);
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Orders</h3>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <div key={order.id} className="card mb-4 shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <h6>Order #{order.id}</h6>
              <p className="mb-0 text-muted">Date: {new Date(order.created_at).toLocaleString()}</p>
            </div>
            <div>
              <span className={`badge ${order.payment_status === "PAID" ? "bg-success" : "bg-warning text-dark"}`}>
                {order.payment_status}
              </span>
              <span className="badge bg-primary ms-2">₹ {order.total_amount}</span>
            </div>
          </div>

          <div className="card-body">
            {order.items.map((item) => (
              <div key={item.id} className="d-flex align-items-center mb-3 border-bottom pb-2">
                <img
                  src={`http://localhost:3000/uploads/${item.image}`}
                  alt={item.product}
                  width="60"
                  className="me-3"
                />
                <div className="flex-grow-1">
                  <h6 className="mb-1">{item.product}</h6>
                  <p className="mb-0">
                    Qty: {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrdersPage;
