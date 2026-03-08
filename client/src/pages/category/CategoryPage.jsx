import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productApi } from "../../api/productApi";
import ProductCard from "../../components/product/ProductCard";

const CategoryPage = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      const res = await productApi.getProductsByCategory(id);

      if (res.status === "success") {
        setProducts(res.data);
      }
    } catch (error) {
      console.error("Category product error", error);
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

export default CategoryPage;
