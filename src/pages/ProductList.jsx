// components/ProductList.jsx
import { useEffect, useState } from "react";

import "../assets/css/ProductList.css";
import AgeFilterBar from "../components/AgeFilterBar";
import ProductGrid from "../components/ProductGrid";

//nhận category từ App
function ProductList({ category }) {
  const [activeAge, setActiveAge] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi load JSON:", err));
  }, []);

  //lọc theo category (giữ nguyên logic cũ của bạn)
  const categoryFiltered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  //  lọc theo độ tuổi trên danh sách đã lọc category
  const filteredProducts =
    activeAge === "all"
      ? categoryFiltered
      : categoryFiltered.filter((p) => p.age === activeAge);

  return (
    <main className="product-list">
      <AgeFilterBar activeAge={activeAge} setActiveAge={setActiveAge} />

      <ProductGrid products={filteredProducts} />
    </main>
  );
}

export default ProductList;
