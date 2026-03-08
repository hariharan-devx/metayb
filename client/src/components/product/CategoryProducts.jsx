import React from "react";
import ProductCard from "./ProductCard";

const CategoryProducts = ({ category, products }) => {
  return (
    <div className="mb-5">
      <h3 className="mb-4">{category}</h3>

      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
