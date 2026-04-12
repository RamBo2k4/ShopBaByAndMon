import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import "../assets/css/ProductList.css";
import AgeFilterBar from "./AgeFilterBar";
import ProductGrid from "./ProductGrid";
import { getCollectionConfig, matchesAgeFilter } from "../utils/collectionConfig";

function ProductList() {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [activeAge, setActiveAge] = useState("all");

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi tải danh sách sản phẩm:", err));
  }, []);

  const currentCollection = getCollectionConfig(type);

  const collectionProducts = useMemo(
    () => currentCollection.filter(products),
    [currentCollection, products]
  );

  const filteredProducts = useMemo(
    () => collectionProducts.filter((product) => matchesAgeFilter(product.age, activeAge)),
    [activeAge, collectionProducts]
  );

  return (
    <main className="product-list">
      <div className="product-list-header">
        <h2>{currentCollection.title}</h2>
        <p>{filteredProducts.length} sản phẩm</p>
      </div>

      <AgeFilterBar activeAge={activeAge} setActiveAge={setActiveAge} />

      <ProductGrid products={filteredProducts} />
    </main>
  );
}

export default ProductList;
