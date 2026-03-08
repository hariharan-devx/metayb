import React from "react";
import { Link } from "react-router-dom";

const OrderSuccessPage = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <div style={{ fontSize: "70px", color: "green" }}>✔</div>

        <h2 className="mt-3">Order Placed Successfully</h2>

        <p className="text-muted mt-2">Thank you for your purchase. Your order has been placed successfully.</p>

        <div className="mt-4">
          <Link to="/" className="btn btn-primary me-3">
            Continue Shopping
          </Link>

          <Link to="/my-orders" className="btn btn-outline-dark">
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
