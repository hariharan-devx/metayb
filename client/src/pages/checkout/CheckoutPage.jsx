import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";
import { orderApi } from "../../api/orderApi";

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);

  const [shippingAddress, setShippingAddress] = useState("");

  const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.total), 0);

  const handlePayment = async () => {
    try {
      const res = await orderApi.createOrder({
        shipping_address: shippingAddress,
      });
      if (res.status === "success") {
        window.location.href = res.checkout_url;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Checkout</h3>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Shipping Address</h5>

              <textarea
                className="form-control mt-3"
                rows="5"
                placeholder="Enter address"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Order Summary</h5>

              {cartItems.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>
                    {item.product} x {item.quantity}
                  </span>

                  <span>₹ {item.total}</span>
                </div>
              ))}

              <hr />

              <h5 className="d-flex justify-content-between">
                <span>Total</span>

                <span>₹ {totalAmount}</span>
              </h5>

              <button className="btn btn-success w-100 mt-3" onClick={handlePayment}>
                Pay ₹ {totalAmount}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
