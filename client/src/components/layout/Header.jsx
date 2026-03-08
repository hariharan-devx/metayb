import React from "react";
import "../../assets/styles/header.css";

const Header = () => {
  return (
    <div className="header bg-dark text-white py-2">
      <div className="container d-flex justify-content-between">
        <div>
          <strong>Liquor Store</strong>
        </div>

        <div>
          <span className="me-3">📞 +91 9876543210</span>
          <span>Delivery Available</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
