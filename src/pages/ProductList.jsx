// components/ProductList.jsx
import { useState } from "react";

import "../assets/css/ProductList.css";
import BrandGrid from "../components/BrandGrid";
import AgeFilterBar from "../components/AgeFilterBar";
import ProductGrid from "../components/ProductGrid";

import anhSP from "../assets/img/sanpham_card.jpg";

function ProductList() {
  const [activeAge, setActiveAge] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 50000000]);

  // Dữ liệu sản phẩm
  const products = [
    {
      id: 1,
      oldPrice: 36000000,
      newPrice: 18000000,
      discount: 50,
      description: "Sữa bột cao cấp, bổ sung DHA cho bé",
      sold: 36000,
      rating: 5,
      options: ["Hộp 300g", "Hộp 600g", "Combo 3 hộp"],
      image: anhSP,
      category: "milk",
      age: "0-6",
    },
    {
      id: 2,
      oldPrice: 450000,
      newPrice: 320000,
      discount: 28,
      description: "Bỉm siêu thấm, mềm mại cho bé",
      sold: 28500,
      rating: 5,
      options: ["Size S", "Size M", "Size L"],
      image: anhSP,
      category: "diaper",
      age: "0-6",
    },
    {
      id: 3,
      oldPrice: 890000,
      newPrice: 650000,
      discount: 27,
      description: "Đồ chơi thông minh, phát triển tư duy",
      sold: 15200,
      rating: 4,
      options: ["Màu xanh", "Màu hồng"],
      image: anhSP,
      category: "toy",
      age: "0-6",
    },
    {
      id: 4,
      oldPrice: 890000,
      newPrice: 650000,
      discount: 27,
      description: "Đồ chơi thông minh, phát triển tư duy",
      sold: 15200,
      rating: 4,
      options: ["Màu xanh", "Màu hồng"],
      image: anhSP,
      category: "toy",
      age: "0-6",
    },
    {
      id: 5,
      oldPrice: 890000,
      newPrice: 650000,
      discount: 27,
      description: "Đồ chơi thông minh, phát triển tư duy",
      sold: 15200,
      rating: 4,
      options: ["Màu xanh", "Màu hồng"],
      image: anhSP,
      category: "toy",
      age: "0-6",
    },
    {
      id: 6,
      oldPrice: 890000,
      newPrice: 650000,
      discount: 27,
      description: "Đồ chơi thông minh, phát triển tư duy",
      sold: 15200,
      rating: 4,
      options: ["Màu xanh", "Màu hồng"],
      image: anhSP,
      category: "toy",
      age: "0-6",
    },
    {
      id: 7,
      oldPrice: 890000,
      newPrice: 650000,
      discount: 27,
      description: "Đồ chơi thông minh, phát triển tư duy",
      sold: 15200,
      rating: 4,
      options: ["Màu xanh", "Màu hồng"],
      image: anhSP,
      category: "toy",
      age: "0-6",
    },
    {
      id: 8,
      oldPrice: 890000,
      newPrice: 650000,
      discount: 27,
      description: "Đồ chơi thông minh, phát triển tư duy",
      sold: 15200,
      rating: 4,
      options: ["Màu xanh", "Màu hồng"],
      image: anhSP,
      category: "toy",
      age: "0-6",
    },
    {
      id: 9,
      oldPrice: 890000,
      newPrice: 650000,
      discount: 27,
      description: "Đồ chơi thông minh, phát triển tư duy",
      sold: 15200,
      rating: 4,
      options: ["Màu xanh", "Màu hồng"],
      image: anhSP,
      category: "toy",
      age: "0-6",
    },
  ];

  // Lọc sản phẩm
  // let filteredProducts = products;

  // if (activeFilter !== "all") {
  //   filteredProducts = filteredProducts.filter(
  //     (p) => p.category === activeFilter,
  //   );
  // }

  // filteredProducts = filteredProducts.filter(
  //   (p) => p.newPrice >= priceRange[0] && p.newPrice <= priceRange[1],
  // );

  // // Sắp xếp
  // if (sortBy === "price-asc") {
  //   filteredProducts.sort((a, b) => a.newPrice - b.newPrice);
  // } else if (sortBy === "price-desc") {
  //   filteredProducts.sort((a, b) => b.newPrice - a.newPrice);
  // } else if (sortBy === "sold-desc") {
  //   filteredProducts.sort((a, b) => b.sold - a.sold);
  // }

  // return (
  //   <main className="product-list">
  //     <BannerSlider />
  //     <FilterBar
  //       activeFilter={activeFilter}
  //       setActiveFilter={setActiveFilter}
  //       sortBy={sortBy}
  //       setSortBy={setSortBy}
  //       priceRange={priceRange}
  //       setPriceRange={setPriceRange}
  //     />
  //     <ProductGrid products={filteredProducts} />
  //   </main>
  // );
  //lọc theo độ tuổi
  const filteredProducts =
    activeAge === "all"
      ? products
      : products.filter((p) => p.age === activeAge);

  return (
    <main className="product-list">
      <BrandGrid />

      <AgeFilterBar activeAge={activeAge} setActiveAge={setActiveAge} />

      <ProductGrid products={filteredProducts} />
    </main>
  );
}

export default ProductList;
