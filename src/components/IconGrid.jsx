function IconGrid({ icons, rows = 2, cols = 4, size = 45 }) {

  const maxIcons = rows * cols;
  const showIcons = icons.slice(0, maxIcons);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        justifyContent: "center",
        gap: "8px"
      }}
    >
      {showIcons.map((icon, i) => (
        <a
          key={i}
          href={icon.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={icon.src}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              objectFit: "contain"
            }}
          />
        </a>
      ))}
    </div>
  );
}
export default IconGrid;