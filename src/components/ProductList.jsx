import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import "../assets/css/ProductList.css";
import AgeFilterBar from "./AgeFilterBar";
import ProductGrid from "./ProductGrid";
import { getCollectionConfig, matchesAgeFilter } from "../utils/collectionConfig";

function ProductList() {
  const { type } = useParams(); // 'type' ở đây tương đương với 'slug' hoặc 'category'
  const [products, setProducts] = useState([]);
  const [activeAge, setActiveAge] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Gọi API lấy sản phẩm theo category (type)
        const response = await fetch(`http://localhost:5000/api/products?category=${type}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Lỗi tải danh sách sản phẩm từ MongoDB:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [type]); // Load lại khi đổi loại sản phẩm trên URL

  const currentCollection = getCollectionConfig(type);

  // Lọc theo độ tuổi (Dùng useMemo để tối ưu hiệu năng khi user bấm chuyển các nút Age)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => matchesAgeFilter(product.age, activeAge));
  }, [activeAge, products]);

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Đang tải...</div>;

  return (
    <main className="product-list">
      <div className="product-list-header">
        <h2 style={{ color: "black", fontWeight: "bold" }}>{currentCollection.title}</h2>
        <p style={{ color: "#666" }}>{filteredProducts.length} sản phẩm</p>
      </div>

      <AgeFilterBar activeAge={activeAge} setActiveAge={setActiveAge} />

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div style={{ textAlign: "center", padding: "50px", color: "#999" }}>
          Không có sản phẩm nào phù hợp với lứa tuổi này.
        </div>
      )}
    </main>
  );
}

export default ProductList;