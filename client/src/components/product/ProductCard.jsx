import React from "react";
import { toast } from "react-toastify";
import { cartApi } from "../../api/cartApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { fetchCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      const res = await cartApi.addToCart({
        product_id: product.id,
        quantity: 1,
      });
      toast.success(res.message);
      fetchCart();
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };
  const imageUrl = `http://localhost:3000/uploads/${product.image}`;

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={imageUrl}
          className="card-img-top"
          alt={product.product}
          style={{ height: "220px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.product}</h5>

          <p className="text-muted">{product.description}</p>

          <p className="fw-bold text-success">₹ {product.price}</p>

          <p className="text-danger">Stock Left: {product.stock}</p>

          <button className="btn btn-warning mt-auto" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
