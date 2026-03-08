import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categoryApi } from "../../api/categoryApi";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { authApi } from "../../api/authApi";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await categoryApi.getCategories();

      if (res.status === "success") {
        setCategories(res.data);
      }
    } catch (error) {
      console.error("Category fetch error", error);
    }
  };

  const handleLogout = async () => {
    await authApi.logout();

    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          LiquorShop
        </Link>

        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {categories.map((cat) => (
              <li className="nav-item px-2" key={cat.id}>
                <Link className="nav-link fw-semibold" to={`/category/${cat.id}`}>
                  {cat.category}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn btn-dark me-2">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-dark me-2">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link to="/my-orders" className="btn btn-primary me-2">
                  My Orders
                </Link>
                <Link to="/cart" className="btn btn-warning position-relative me-2">
                  Cart
                  {cartItems.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
