import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import "../assets/css/ProductList.css";
import BrandGrid from "../components/BrandGrid";
import AgeFilterBar from "../components/AgeFilterBar";
import ProductGrid from "../components/ProductGrid";

const collectionConfigs = {
    "flash-deals": {
        title: "Flash Deals",
        filter: (products) => products.filter((product) => product.discount > 18),
    },
    "san-qua-ta-sua": {
        title: "San qua ta sua",
        filter: (products) =>
            products.filter(
                (product) =>
                    product.category === "Các loại tã" || product.category === "Các loại sữa"
            ),
    },
    "top-ban-chay": {
        title: "Top ban chay",
        filter: (products) => [...products].sort((a, b) => b.sold - a.sold),
    },
};

function ProductList() {
    const { type } = useParams();
    const [products, setProducts] = useState([]);
    const [activeAge, setActiveAge] = useState("all");

    useEffect(() => {
        fetch("/product.json")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Loi tai danh sach san pham:", err));
    }, []);

    const currentCollection = collectionConfigs[type] || {
        title: "Tat ca san pham",
        filter: (items) => items,
    };

    const collectionProducts = useMemo(
        () => currentCollection.filter(products),
        [currentCollection, products]
    );

    const filteredProducts = useMemo(() => {
        if (activeAge === "all") return collectionProducts;
        return collectionProducts.filter((product) => product.age === activeAge);
    }, [activeAge, collectionProducts]);

    return (
        <main className="product-list">
            <BrandGrid />

            <div className="product-list-header">
                <h2>{currentCollection.title}</h2>
                <p>{filteredProducts.length} san pham</p>
            </div>

            <AgeFilterBar activeAge={activeAge} setActiveAge={setActiveAge} />

            <ProductGrid products={filteredProducts} />
        </main>
    );
}

export default ProductList;