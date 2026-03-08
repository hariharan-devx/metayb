import React, { useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";
import { cartApi } from "../../api/cartApi";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, fetchCart } = useContext(CartContext);
  const increaseQty = async (item) => {
    try {
      const res = await cartApi.updateQuantity({
        cart_id: item.id,
        quantity: item.quantity + 1,
      });

      if (res.status === "success") {
        toast.success(res.message);
        fetchCart();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const decreaseQty = async (item) => {
    try {
      if (item.quantity === 1) return;

      const res = await cartApi.updateQuantity({
        cart_id: item.id,
        quantity: item.quantity - 1,
      });
      if (res.status === "success") {
        toast.success(res.message);
        fetchCart();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeItem = async (id) => {
    try {
      const res = await cartApi.removeItem(id);
      if (res.status === "success") {
        toast.success(res.message);
        fetchCart();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.total), 0);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Cart</h3>

      {cartItems.length === 0 ? (
        <div className="text-center mt-5">
          <h4>Your cart is empty 🛒</h4>
          <p>Add some products to your cart.</p>

          <Link to="/" className="btn btn-primary mt-2">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="d-flex align-items-center">
                    <img
                      src={`http://localhost:3000/uploads/${item.image}`}
                      width="60"
                      className="me-3"
                      alt={item.product}
                    />
                    {item.product}
                  </td>

                  <td>₹ {item.price}</td>

                  <td>
                    <button className="btn btn-sm btn-secondary" onClick={() => decreaseQty(item)}>
                      -
                    </button>

                    <span className="mx-2">{item.quantity}</span>

                    <button className="btn btn-sm btn-secondary" onClick={() => increaseQty(item)}>
                      +
                    </button>
                  </td>

                  <td>₹ {item.total}</td>

                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end">
            <h4>Total: ₹ {totalAmount}</h4>

            <Link to="/checkout" className="btn btn-success">
              Confirm Order
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
