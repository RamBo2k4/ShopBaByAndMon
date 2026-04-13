const normalizeText = (value = "") =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();

const sortByDiscount = (a, b) => {
  if (b.discount !== a.discount) return b.discount - a.discount;
  if (b.sold !== a.sold) return b.sold - a.sold;
  return a.newPrice - b.newPrice;
};

const sortByPriceAsc = (a, b) => {
  if (a.newPrice !== b.newPrice) return a.newPrice - b.newPrice;
  return b.sold - a.sold;
};

const sortBySold = (a, b) => {
  if (b.sold !== a.sold) return b.sold - a.sold;
  if ((b.rating || 0) !== (a.rating || 0)) return (b.rating || 0) - (a.rating || 0);
  return a.newPrice - b.newPrice;
};

const hasCategoryKeyword = (product, keyword) =>
  normalizeText(product.category).includes(keyword) ||
  normalizeText(product.description).includes(keyword);

export const collectionConfigs = {
  "flash-deals": {
    title: "Flash Deals",
    filter: (products) => [...products].filter((product) => product.discount >= 20).sort(sortByDiscount),
  },
  "san-qua-ta-sua": {
    title: "Săn quà tã sữa",
    filter: (products) =>
      [...products]
        .filter((product) => hasCategoryKeyword(product, "ta") || hasCategoryKeyword(product, "sua"))
        .sort(sortByDiscount),
  },
  "mua-nhanh-giam-ngay": {
    title: "Mua nhanh giảm ngay",
    filter: (products) => [...products].sort(sortByPriceAsc),
  },
  "uu-dai-thuong-hieu": {
    title: "Ưu đãi thương hiệu",
    filter: (products) => [...products].sort(sortByDiscount),
  },
  "top-ban-chay": {
    title: "Top bán chạy",
    filter: (products) => [...products].sort(sortBySold),
  },
};

export const getCollectionConfig = (type) =>
  collectionConfigs[type] || {
    title: "Tất cả sản phẩm",
    filter: (products) => [...products].sort(sortBySold),
  };

export const getCollectionProducts = (products, type, limit) => {
  const items = getCollectionConfig(type).filter(products);
  return typeof limit === "number" ? items.slice(0, limit) : items;
};

export const matchesAgeFilter = (productAge, activeAge) => {
  if (activeAge === "all") return true;

  const age = normalizeText(productAge);

  switch (activeAge) {
    case "0-6":
      return age === "0-6" || age === "0-1" || age === "0-2";
    case "6-12":
      return age === "6-12";
    case "1-2":
      return age === "1-2" || age === "1-3";
    case "2-6":
      return age === "2-6" || age === "3-6";
    case "6+":
      return age === "6+";
    default:
      return age === normalizeText(activeAge);
  }
};
