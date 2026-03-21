// components/AgeFilterBar.jsx

function AgeFilterBar({ activeAge, setActiveAge }) {
  const ageOptions = [
    { id: "all", label: "Tất cả" },
    { id: "0-6", label: "Dưới 6 tháng" },
    { id: "6-12", label: "Từ 6 - 12 tháng" },
    { id: "1-2", label: "Từ 1 - 2 tuổi" },
    { id: "2-6", label: "Từ 2 - 6 tuổi" },
    { id: "6+", label: "Trên 6 tuổi" },
  ];

  return (
    <div className="age-filter">
      {ageOptions.map((item) => (
        <button
          key={item.id}
          className={activeAge === item.id ? "active" : ""}
          onClick={() => setActiveAge(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default AgeFilterBar;
