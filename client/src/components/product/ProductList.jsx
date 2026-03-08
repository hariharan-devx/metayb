import React, { useEffect, useState } from "react";
import { productApi } from "../../api/productApi";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await productApi.getProducts();

      if (res.status === "success") {
        setProducts(res.data);
      }
    } catch (error) {
      console.error("Product fetch error", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
