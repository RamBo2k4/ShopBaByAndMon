// components/BrandGrid.jsx

import vinamilk from "../assets/img/vinamilk.png";
function BrandGrid() {
  const brands = [
    vinamilk,
    vinamilk,
    vinamilk,
    vinamilk,
    vinamilk,
    vinamilk,
    vinamilk,
    vinamilk,
    vinamilk,
    vinamilk,
  ];

  return (
    <div className="brand-grid">
      {brands.map((brand, index) => (
        <div key={index} className="brand-item">
          <img src={brand} alt="brand" />
        </div>
      ))}
    </div>
  );
}

export default BrandGrid;
