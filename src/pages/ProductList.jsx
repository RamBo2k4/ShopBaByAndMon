import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../assets/css/ProductList.css";
import AgeFilterBar from "../components/AgeFilterBar";
import ProductGrid from "../components/ProductGrid";

function ProductList_nha() { 
   const { slug } = useParams(); 
   const [activeAge, setActiveAge] = useState("all");
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     const fetchProducts = async () => {
       setLoading(true);
       try {
         // Gọi API từ MongoDB (truyền slug để server lọc luôn cho nhẹ)
         const response = await fetch(`http://localhost:5000/api/products?category=${slug || "all"}`);
         if (response.ok) {
           const data = await response.json();
           setProducts(data);
         }
       } catch (err) {
         console.error("Lỗi khi kết nối MongoDB:", err);
       } finally {
         setLoading(false);
       }
     };

     fetchProducts();
   }, [slug]); // Load lại khi người dùng bấm vào danh mục khác (slug thay đổi)

   // Vẫn giữ logic lọc theo độ tuổi tại Client để trải nghiệm mượt mà (không cần load lại trang)
   const filteredProducts =
     activeAge === "all"
       ? products
       : products.filter((p) => p.age === activeAge);

   return (
     <main className="product-list">
       <h2 style={{ 
         color: "black", 
         textTransform: "uppercase", 
         padding: "20px 0", 
         fontWeight: "bold" 
       }}>
         📍 Danh mục: {slug || "Tất cả sản phẩm"}
       </h2>

       {loading ? (
         <div style={{ textAlign: "center", padding: "50px" }}>Đang lấy sản phẩm từ kho...</div>
       ) : (
         <>
           <AgeFilterBar activeAge={activeAge} setActiveAge={setActiveAge} />
           
           {filteredProducts.length > 0 ? (
             <ProductGrid products={filteredProducts} />
           ) : (
             <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
                Rất tiếc, hiện tại chưa có sản phẩm nào ở mục này!
             </div>
           )}
         </>
       )}
     </main>
   );
}

export default ProductList_nha;